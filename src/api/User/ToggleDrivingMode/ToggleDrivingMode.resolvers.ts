import { Resolvers } from "../../../resolvers";
import privateResolver from "../../../utils/privateResolver";
import { ToggleDrivingModeResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privateResolver(
      async (_, __, { req }): Promise<ToggleDrivingModeResponse> => {
        const user: User = req.user;
        user.isDriving = !user.isDriving;
        return {
          ok: true,
          error: null
        };
      }
    )
  }
};

export default resolvers;
