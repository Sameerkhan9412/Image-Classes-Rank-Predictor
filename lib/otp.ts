import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

export const sendOtp = async (mobile: string) => {
  const phoneNumber = "+91" + mobile;

  // setup recaptcha
  const recaptcha = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "invisible",
    }
  );

  return signInWithPhoneNumber(auth, phoneNumber, recaptcha);
};

export const verifyOtp = async (
  confirmationResult: any,
  otp: string
) => {
  return confirmationResult.confirm(otp);
};