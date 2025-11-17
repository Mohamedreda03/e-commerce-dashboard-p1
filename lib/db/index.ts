import env from "../env";
import { drizzle } from "drizzle-orm/neon-http";

const db = drizzle(env.database.DATABASE_URL);

export default db;
