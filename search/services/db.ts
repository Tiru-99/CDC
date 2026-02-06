import { Pool } from "pg";

const db = new Pool({
  user: "debezium",
  password: "debezium",
  host: "localhost",
  port: 5432,
  database: "mydb",
  max: 10,
});


export { db }; 
