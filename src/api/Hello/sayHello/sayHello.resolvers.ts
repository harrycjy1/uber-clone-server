import { HelloResponse, SayHelloQueryArgs } from "src/types/graph";

const resolvers = {
  Query: {
    sayHello: (_, args: SayHelloQueryArgs): HelloResponse => {
      return {
        text: `hey ${args.name} how are you`,
        error: false
      };
    }
  }
};

export default resolvers;
