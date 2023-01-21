const nodeMailer = require("nodemailer");

// ========== Mail to user /// Middleware ========== \\
exports.toMail = async (subject, message, to) => {
  const transporter = await nodeMailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const sendForm = await {
    from: process.env.MAIL_USER,
    to: to,
    subject: subject,
    text: message,
  };

  await transporter
    .sendMail(sendForm)
    .then(() => {
      return console.log("message is sent");
    })
    .catch((err) => console.log(err));
};
