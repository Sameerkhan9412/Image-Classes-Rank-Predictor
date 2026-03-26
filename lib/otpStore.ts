const otpStore = new Map();
const verifiedStore = new Set(); // 🔥 NEW

export function saveOtp(email: string, otp: string) {
  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });
}

export function verifyOtp(email: string, otp: string) {
  const record = otpStore.get(email);

  if (!record) return false;

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return false;
  }

  if (record.otp !== otp) return false;

  otpStore.delete(email);

  // 🔥 mark verified
  verifiedStore.add(email);

  return true;
}

// 🔥 check verification
export function isVerified(email: string) {
  return verifiedStore.has(email);
}

// 🔥 clear after use
export function clearVerified(email: string) {
  verifiedStore.delete(email);
}