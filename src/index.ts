import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import connectionOptions from "./ormConfig";

const PORT: string | number = process.env.port || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const Options: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT
};

const handleAppStart = (): void => {
  console.log(`server started at ${PORT} port`);
};

createConnection(connectionOptions).then(() => {
  app.start(Options, handleAppStart);
});
