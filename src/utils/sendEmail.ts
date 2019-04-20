import mailGun from "mailgun-js";

const mailGunClient = new mailGun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandbox2013061a5b374874b198f17877d418ef.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "harrycjy123@gmail.com",
    to: "harrycjy123@gmail.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `hey ${fullName} please verify your email`;
  const emailHtml = `Verify your email by clicking <a href="http://uber.server.com/verification/${key}/">here</a>`;

  return sendEmail(emailSubject, emailHtml);
};
