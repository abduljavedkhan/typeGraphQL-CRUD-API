import { Pool } from "pg";
import { databases } from "./db";

export let connectionPool: any;
export const dbConfigPool = (configId: number) => {
  const conObj = databases.find((d) => d.id && +d.id === configId);
  connectionPool = new Pool({
    host: conObj?.host,
    port: +(conObj?.port || 5432),
    user: conObj?.username,
    password: conObj?.password,
    database: conObj?.database,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000,
    ssl: {
      rejectUnauthorized: false,
    },
  });
};
