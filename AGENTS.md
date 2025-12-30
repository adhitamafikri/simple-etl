---
description: KJo Academy ETL - Simple Project to Help Extracting Data from GSheet, Transform, and Store into Our PostgreSQL
alwaysApply: true
---

# KJo Academy ETL

**Simple ETL Project for synchronizing member data from Google Sheets to PostgreSQL**

Repo: https://github.com/kjonexa/kjoacademy-etl (private)
Related Repo:
- https://github.com/kjonexa/kjoacademy-be (private)

---

## Tech Stacks
- **proto**: toolchain management
- **bun v1.2.23**: runtime, package manager, and test runner
- **biomejs**: linter and formatter
- **@googleapis/sheets**: helps us on accessing, reading, and retrieving data from our Google Sheet
- **dayjs**: make it easier for us to deal with date and time manipulations
- **postgres:17-alpine**: our primary database. Used for testing our ETL job behaviors locally
- **pino v10**: for logging purposes
- **supabase**: the BaaS (backend as a service) that manages our development and production PostgreSQL. If the ETL job is successful in local environment, the job should also be tested in development PostgreSQL, before finally doing it to the production PostgreSQL.

## Reason this Project is Created
It is so hard to manage members data, especially when the Google Sheet acts as our oracle. We also have **5 Different** sheets that should be read in order to find the correct member data. *1 sheet* containing admin data and *4 sheets* containing member data.

If the login payload has the purpose of `admin-login` then only one sheet would be read.
If the login payload has the purpose of `student-login` then we have to read 4 sheets, which are the Old VIP member sheet, V1 VIP member sheet, V2 VIP member sheet, and VVIP member sheet. 

Our current OTP Request Flow in the backend service is really complex and has a really high latency, because we basically do literal ETL when looking up member data before making OTP request. The flow is like this:

```txt
Lookup member data in sheet -> insert/update the data into PostgreSQL if found -> sync to Supabase -> Call Supabase endpoint to generate and send OTP code to the member's email
```

## The Objective of this Project
The objective is to defer the ETL process so the backend service would not do this every time the request OTP endpoint is called.

```txt
Lookup member data in PostgreSQL -> if found call the Supabase endpoint to generate and send OTP code to the member's email
```

## Project Structure
### All the primary source codes are located within the **src** directory
- **config**
    - Configuration files like column mappings and sheet mappings based on the user type
- **artifacts**
    - This directory contains JSON files produced by the *transformers*, containing data that has been transformed properly to the JSON format
- **extractors**
    - This directory contains the *extractor* functions which are responsible for retrieving data from the particular Google Sheet range
    - The *extractor* functions' duty is purely for retrieving data from Google Sheet as is. it could not be tied to specific *transformers*
- **transformers**
    - This directory contains the *transformers* functions which are responsible for transforming data and write the transformation result into a json 
- **loaders**
    - This directory contains the *loaders* functions which are responsible for loading the data that has been transformed by the particular *transformer* to our data store
    - The key behaviors of these *loaders* are
      - pick up the particular JSON file from the *artifacts* directory
      - iterate on each item from the picked up JSON file and do these things on each item:
          - retrieve the particular data
          - insert the data into the data store if it does not exist
          - update the existing data in the data store if it exist
- **jobs**
    - There will be 2 kind of jobs in this ETL pipeline -> *ingestion* and *maintenance*
    - **ingestion**
        - This directory contains the *jobs* functions that orchestrate these processes *extraction* -> *transformation* -> *loading*.
        - The *jobs* duty is purely for orchestrating the particular ETL process, no direct mutations or manipulations to any result of extraction, transformation, and loading that is being done.
    - **maintenance**
        - This directory contains the *jobs* functions that acts as maintenance jobs for our PostgreSQL.
        - For example, we would have a job that de-duplicates member data by email

### The unit tests are located within the **tests** directory in this project
- The sub-directory mirrors the **src** directory structure

## Related Documents
Here are the supporting documents that you can refer to:
- [System Design Doc](./docs/system-design.md)
