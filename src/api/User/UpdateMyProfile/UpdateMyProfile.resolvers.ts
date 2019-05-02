import { Resolvers } from "../../../resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        //null이 넘어올수 있으니 null값을 제외하고 새로운 Object에 추가
        const checkNull: any = cleanNullArgs(args);

        if (checkNull.password !== null) {
          user.password = checkNull.password;
          user.save();
          delete checkNull.password;
        }
        //아래 User.udpate메서드는 user entity에 정의된 @beforeUpate를 실행시키지 않아서
        //encoding되지 않은 패스워드가 저장되므로 위에서 user instance를 직접 변화시켜서 저장 후 밑으로 전달해야한다.
        try {
          await User.update({ id: user.id }, { ...checkNull });
          return {
            ok: true,
            error: null
          };
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
