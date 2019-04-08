export const typeDefs = ["type HelloResponse {\n  text: String!\n  error: Boolean!\n}\n\ntype Query {\n  sayHello(name: String!): HelloResponse!\n}\n"];
/* tslint:disable */

export interface Query {
  sayHello: HelloResponse;
}

export interface SayHelloQueryArgs {
  name: string;
}

export interface HelloResponse {
  text: string;
  error: boolean;
}
