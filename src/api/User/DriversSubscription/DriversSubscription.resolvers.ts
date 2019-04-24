const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: async (_, __, { pubSub }) => {
        return pubSub.asyncIterator("driverUpdate");
      }
    }
  }
};

export default resolvers;
