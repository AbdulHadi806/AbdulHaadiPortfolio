import nodemailer from 'nodemailer';
const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shirazraziq84@gmail.com",
    pass:"zglgazoqhrzeecke",
  },
});
export const mailOptions = {
  from: email,
  to: email,
};