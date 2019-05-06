import { Resolvers } from "../../../types/resolvers";
import {
  RequestRideMutationArgs,
  RequestRideResponse
} from "../../../types/graph";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: async (
      _,
      args: RequestRideMutationArgs,
      { req, pubSub }
    ): Promise<RequestRideResponse> => {
      const user: User = req.user;
      if (!user.isRiding && !user.isDriving) {
        try {
          const ride = await Ride.create({
            ...args,
            passenger: user
          }).save();
          pubSub.publish("rideRequest", { NearbyRideSubscription: ride });
          user.isRiding = true;
          user.save();
          return {
            ok: true,
            error: null,
            ride
          };
        } catch (error) {
          return {
            ok: true,
            error: error.message,
            ride: null
          };
        }
      } else {
        return {
          ok: true,
          error: "you can't request two rides",
          ride: null
        };
      }
    }
  }
};

export default resolvers;
