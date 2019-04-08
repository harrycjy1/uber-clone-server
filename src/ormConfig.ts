import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: "nuber",
  synchronize: true,
  logging: true,
  entities: ["./entities/**/*.*"],
  host: process.env.PORT || "localhost",
  port: 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "admin"
};

export default connectionOptions;
