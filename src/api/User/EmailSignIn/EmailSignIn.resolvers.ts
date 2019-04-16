import { Resolvers } from "src/resolvers";
import { EmailSignInMutationArgs, EmailSignInResponse } from "src/types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            error: "There's no user with this email",
            token: null
          };
        }
        const checkpassword = await user.comparePassword(password);
        const token = createJWT(user.id);
        if (checkpassword) {
          return {
            ok: true,
            error: null,
            token
          };
        } else {
          return {
            ok: false,
            error: "Wrong Password",
            token: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
