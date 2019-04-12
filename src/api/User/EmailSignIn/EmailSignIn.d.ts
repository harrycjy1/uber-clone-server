import { Resolvers } from "src/resolvers";
import { EmailSignInMutationArgs, EmailSignInResponse } from "src/types/graph";
import User from "src/entities/User";

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
        if (checkpassword) {
          return {
            ok: true,
            error: null,
            token: "coming soon"
          };
        } else {
          return {
            ok: true,
            error: "Wrong Password",
            token: "coming soon"
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
