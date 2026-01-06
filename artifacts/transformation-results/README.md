# Transformation Results
In this directory we will have the `.json` files containing the transformation results of each member type. The data in this directory would not be tracked with git as it might contain very long list of data

## Content Model
Each `.json` files would contain array of objects with the shape of `User`, refer to [types/users.ts](../../src/types/users.ts)

```typescript
type User = {
  name: string
  phone: string | null
  email: string | null
  telegram_username: string | null
  membership_tier: string | null
  membership_expiry_date: Date | null
}
```

## Using the Data
The data in the `.json` files would be used to do *loading* operations to synchronize data in the PostgreSQL and Supabase users
