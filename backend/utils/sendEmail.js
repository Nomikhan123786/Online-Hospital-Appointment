const sendEmail = async (email, subject, text, isOtp = false) => {
  // Only style as an OTP box when caller explicitly says it's an OTP email
  const otpMatch = isOtp ? text.match(/(\d{4,8})/) : null;
  const otp = otpMatch ? otpMatch[1] : null;
  const introText = otp ? text.split(otp)[0].trim() : text;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 12px;">
      <h2 style="color: #1e293b; margin-bottom: 8px;">Online Hospital Appointment+</h2>
      <p style="color: #475569; font-size: 15px;">${introText}</p>
      ${
        otp
          ? `<div style="text-align: center; margin: 28px 0;">
              <span style="display: inline-block; font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #1e3a8a; background: #ffffff; padding: 16px 28px; border-radius: 10px; border: 1px solid #cbd5e1;">
                ${otp}
              </span>
            </div>
            <p style="color: #94a3b8; font-size: 13px; text-align: center;">This code expires in 10 minutes.</p>`
          : ""
      }
    </div>
  `;

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: process.env.EMAIL_USER, name: "Online Hospital Appointment+" },
      to: [{ email }],
      subject,
      htmlContent,
      textContent: text,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Brevo API error: ${res.status}`);
  }
};

export default sendEmail;