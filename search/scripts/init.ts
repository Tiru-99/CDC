import fs from "fs";
import path from "path";
import { db } from "../services/db";

async function runSchema() {
  const schemaSql = fs.readFileSync(
    path.join(process.cwd(), "scripts/schema_init.sql"),
    "utf8"
  );

  await db.query(schemaSql);
  await db.end();

  console.log("Schema executed successfully");
}

runSchema().catch(err => {
  console.error(err);
  process.exit(1);
});
