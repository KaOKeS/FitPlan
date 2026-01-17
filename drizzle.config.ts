import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
    schema: './db/index.ts',
    out: './drizzle',
    dialect: 'sqlite',
    driver: 'expo',
    dbCredentials: {
        url: process.env.DB_FILE_NAME!,
    },
} satisfies Config;