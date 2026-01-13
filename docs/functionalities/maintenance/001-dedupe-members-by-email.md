# Dedupe Members by Email
This pipeline will do the cleanup on the duplicated user data. It will do operations on `users` table in our PostgreSQL.

## How to Tell If Member Data is Duplicated
- The member has more than one data with same email.
  - One with normalized/lowercased `email`. Typically
  - One with non-normalized `email`. Example: the member has email 'Rakatrack@gmail.com' instead of 'rakatrack@gmail.com'
- The duplicated data is guaranteed not to have its `supabase_id` being populated, despite having same email.

## Pipeline Details
- Queries the users having the same email.
  - Select the normalized email (lowercased email) and the COUNT of email each users
  - Write the result into *artifacts/queries/duplicated-user-emails.json*.
  - Make sure to convert the data into
  ```typescript
  type DuplicatedUserEmails = {
    email: string,  // normalized/lowercased email
    count: number,  //
  }
  ```
-