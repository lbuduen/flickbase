require("dotenv").config();
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const registerEmail = async (userEmail, user) => {
  try {
    const verificationToken = user.generateVerificationToken();

    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Flickbase",
        link: process.env.SITE_DOMAIN,
      },
    });
    const email = {
      body: {
        name: userEmail,
        intro: "Welcome to Flickbase! We're very excited to have you on board.",
        action: {
          instructions: "To confirm your account please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${process.env.SITE_DOMAIN}verification?t=${verificationToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    const emailBody = mailGenerator.generate(email);

    const message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Welcome to Flickbase",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = { registerEmail };
