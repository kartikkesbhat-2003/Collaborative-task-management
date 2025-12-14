import nodemailer from 'nodemailer';
import { config } from '../config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

export const sendResetEmail = async (email: string, resetToken: string) => {
  const resetUrl = `${config.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: config.EMAIL_USER,
    to: email,
    subject: 'Password Reset',
    html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  };

  await transporter.sendMail(mailOptions);
};