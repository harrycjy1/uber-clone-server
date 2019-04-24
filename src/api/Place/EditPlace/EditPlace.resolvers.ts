import { Resolvers } from "../../../resolvers";

import privateResolver from "../../../utils/privateResolver";
import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Place from "../../../entities/Place";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(
      async (
        _,
        args: EditPlaceMutationArgs,
        { req }
      ): Promise<EditPlaceResponse> => {
        const user: User = req.user;
        try {
          // const place = await Place.findOne({id:args.placeId},{relations:["user"]}) -> relations를 이용할 경우 userid만 필요함에도 user의 모든 정보를 가져옴
          const place = await Place.findOne({ id: args.placeId });
          if (place) {
            if (place.userId === user.id) {
              const checkedArgs: any = cleanNullArgs(args);
              if (checkedArgs.placeId !== null) {
                delete checkedArgs.placeId;
              }
              await Place.update({ id: args.placeId }, { ...checkedArgs });

              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Not Authorized"
              };
            }
          } else {
            return {
              ok: false,
              error: "Place not found"
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
