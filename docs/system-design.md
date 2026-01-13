# System Design
This is the system design decision document for this simple ETL project

## Primary Objective
Defer the user data lookup, saving and syncrhonization processes to this project. Enabling our Request OTP endpoint in `https://github.com/kjonexa/kjoacademy-be` to have logic that is much simpler and much lower latency

## Functional Requirements
1. The system should be able to read and retrieve data from the member sheets. See [sheetMapping](../src/config/sheetMapping.ts)
2. The system should be able to transform the member data from that has been retrieved from the sheets, into a unified shape. See type `User` in [User Types](../src/types/users.ts)
3. The system should be able to temporarily store the transformed member data into JSON files as artifacts.
4. The system should be able to load the data into our PostgreSQL and synchronize them to the Supabase

## Non-Functional Requirements
### Performance
- Standard performance is expected. Nothing too fancy

### Scalability
- Should be able to read 4500+ member data from GSheet
- Should be able to run bulk job, covering all type of members at once
- Should be able to run tailored job, covering one type of member at a time

### Availability
- Deployment with downtime is acceptable

### Reliability
- ETL job can be retried if the system fails

### Security
- Readonly access to the Google Sheet, making sure there is no accidental data mutation happens to the member sheets

### Maintainability
- At this moment, using Typescript is enough for maintainability

