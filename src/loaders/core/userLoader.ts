import { eq, or } from 'drizzle-orm'
import { db } from '~/config/db/postgres'
import { users } from '~/config/db/schema/users'
import type { User } from '~/types/users'

export async function upsertUser(user: User): Promise<void> {
  // Check if user exists by email or phone
  const existingUser = await db
    .select()
    .from(users)
    .where(
      or(
        user.email ? eq(users.email, user.email) : undefined,
        user.phone ? eq(users.phone, user.phone) : undefined,
      ),
    )
    .limit(1)

  const now = new Date()

  if (existingUser.length > 0) {
    // Update existing user
    await db
      .update(users)
      .set({
        name: user.name,
        phone: user.phone,
        email: user.email,
        membership_tier: user.membership_tier,
        membership_expiry_date: user.membership_expiry_date,
        updated_at: now,
      })
      .where(eq(users.id, existingUser[0].id))
  } else {
    // Insert new user
    await db.insert(users).values({
      name: user.name,
      phone: user.phone,
      email: user.email,
      membership_tier: user.membership_tier,
      membership_expiry_date: user.membership_expiry_date,
      created_at: now,
      updated_at: now,
    })
  }
}

export async function upsertUsers(userList: User[]): Promise<void> {
  for (const user of userList) {
    await upsertUser(user)
  }
}
