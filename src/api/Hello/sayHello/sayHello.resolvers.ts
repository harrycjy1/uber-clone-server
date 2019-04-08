import { Greeting } from "src/types/graph";

const resolvers = {
  Query: {
    sayHello: (): Greeting => {
      return {
        text: "hey",
        error: false
      };
    }
  }
};

export default resolvers;
