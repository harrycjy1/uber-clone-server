import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  SendChatMessagesMutationArgs,
  SendChatMessagesResponse
} from "../../../types/graph";
import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";

const resolvers: Resolvers = {
  Mutation: {
    SendChatMessages: privateResolver(
      async (
        _,
        args: SendChatMessagesMutationArgs,
        { req, pubSub }
      ): Promise<SendChatMessagesResponse> => {
        const user = req.user;
        try {
          const chat = await Chat.findOne({ id: args.chatId });
          if (chat) {
            if (chat.passengerId === user.id || chat.driverId === user.id) {
              const message = await Message.create({
                text: args.text,
                chat,
                user
              }).save();
              pubSub.publish("newChatMessage", {
                MessageSubscription: message
              });

              return {
                ok: true,
                error: null,
                message
              };
            } else {
              return {
                ok: false,
                error: "not authorized",
                message: null
              };
            }
          } else {
            return {
              ok: false,
              error: "Chat not found",
              message: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            message: null
          };
        }
      }
    )
  }
};

export default resolvers;
