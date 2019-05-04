import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetNearbyDriversResponse } from "../../../types/graph";
import User from "../../../entities/User";
import { Between } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    GetNearbyDrivers: privateResolver(
      async (_, __, { req }): Promise<GetNearbyDriversResponse> => {
        const user: User = req.user;
        const { lastLat, lastLng } = user;

        try {
          //Active Record 방식
          const drivers = await User.find({
            isDriving: true,
            lastLat: Between(lastLat - 0.05, lastLat + 0.05),
            lastLng: Between(lastLng - 0.05, lastLng + 0.05)
          });

          return {
            ok: true,
            drivers,
            error: null
          };

          //Data Mapper 방식
          //   const drivers2 = await getRepository(User).find({
          //     isDriving: true,
          //     lastLat: Between(lastLat - 0.05, lastLat + 0.05),
          //     lastLng: Between(lastLng - 0.05, lastLng + 0.05)
          //   });
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            drivers: null
          };
        }
      }
    )
  }
};

export default resolvers;
