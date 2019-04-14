import Twilio from "twilio";

// const TWILIO_ACCOUNT_SID = "AC7cdc74b135411a9840739d9107fe7715";
// const TWILIO_PHONE = "+12403770967";
// const TWILIO_TOKEN = "17d66a6ccdab53d60252df5c6b823290";

const TwilioClient = Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_TOKEN
);

export const sendSMS = (to: string, body: string) => {
  return TwilioClient.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE
  });
};

export const sendVerificationSMS = (to: string, key: string) =>
  sendSMS(to, `Your verification key is: ${key}`);
