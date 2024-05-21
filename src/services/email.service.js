const nodemailer = require('nodemailer');
const pssw = process.env.EMAIL_PASSWORD;


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 465,
  secure: true,
  auth: {
    user: 'botnotreply@gmail.com',
    pass: `${pssw}`,
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: '"MyTimeTracker" <botnotreply@gmail.com>',
      to,
      subject,
      text,
      html,
    });
    console.log('Email enviado correctamente');
  } catch (error) {
    console.error('Error enviando email:', error);
  }
};

module.exports = {
  sendEmail,
};
