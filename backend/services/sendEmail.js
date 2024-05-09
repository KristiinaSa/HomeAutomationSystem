const transporter = require("../config/mailer");
const loadTemplate = require("./loadTemplate");

const sendEmail = (to, subject, templateNames, data) => {
  let html = "";
  templateNames.forEach((templateName) => {
    html += loadTemplate(templateName, data);
  });

  const mailOptions = {
    from: process.env.MAILER_USER,
    to,
    subject,
    html,
  };

  if (process.env.MAILER_USER) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  } else {
    console.log("MAILER_USER environment variable is not set. Email not sent.");
  }
};

module.exports = sendEmail;
