declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: string
      PG_USER: string
      PG_PASSWORD: string
      PG_DATABASE: string
      PG_SSL_ENABLE: string
      SPREADSHEET_ID: string
      GOOGLE_APPLICATION_CREDENTIALS: string
    }
  }
}

export {}
