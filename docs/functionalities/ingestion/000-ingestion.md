# Ingestion Functionalities
The ingestion functionalities/pipelines main duty is to synchronize the data from Google Sheet, PostgreSQL and Supabase. This is done to make sure that all users have valid data in our PostgreSQL and Supabase, allowing them to login to our platform properly.

## Extraction
The pipeline would retrieve the data as is from several sources without modifying it. Here are the spreadsheets that should be read by the extraction pipeline:

- **Database Admin!A3:C**: contains the Admin members data
- **Old Database (Devy)!A2:O**: contains the Old VIP members data
- **Database v1 (Cut Off Jul 2025)!A2:O**: contains the VIP members data
- **Database v2!A3:O**: contains the VIP members data
- **Database Member VVIP!A3:E**: contains the VVIP members data

## Transformation
After extracting the data from the particular spreadsheet, the extracted data would then be transformed into an array of unified shape `User` defined in [src/types/users.ts](../../../src/types/users.ts). The extraction result would be written into a `.json` file in [artifacts/transformation-results/](../../../artifacts/transformation-results/)

## Loading
The system would use the `.json` file to process to
- Insert/Update user data in PostgreSQL
- Synchronize the user data in PostgreSQL to Supabase
