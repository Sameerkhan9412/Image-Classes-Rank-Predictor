
// import nodemailer from "nodemailer";
// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendOTPEmail = async (email: string, otp: string) => {
//   await transporter.sendMail({
//     from: `"Image Classes" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Your OTP Code",
//     html: `<h2>Your OTP is: ${otp}</h2>`,
//   });
// };