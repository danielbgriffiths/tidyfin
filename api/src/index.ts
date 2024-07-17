require("dotenv").config();

import { pool } from "./database/pool";
import { createDatabaseIfNotExists } from "./database/create-database-if-not-exists";
import { seedDatabaseIfEmpty } from "./database/seed-database-if-empty";
import { createExpressApplication } from "./app";

pool
  .connect()
  .then(createDatabaseIfNotExists)
  .then(seedDatabaseIfEmpty)
  .then((client) => client.release())
  .then(createExpressApplication)
  .catch(console.error);
