import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import connectionOptions from "./ormConfig";
import decodeJWT from "./utils/decodeJWT";

const PORT: string | number = process.env.port || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTION_ENDPOINT: string = "/subscription";

const Options: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    onConnect: async connectionParams => {
      const token = connectionParams["X-JWT"];
      if (token) {
        const user = await decodeJWT(token);
        if (user) {
          return {
            //currentUser로 보내면 subscription resolver에서 user를 받음
            currentUser: user
          };
        }
      }

      throw new Error("Sorry there is no JWT");
    }
  }
};

const handleAppStart = (): void => {
  console.log(`server started at ${PORT} port`);
};

createConnection(connectionOptions).then(() => {
  app.start(Options, handleAppStart);
});
