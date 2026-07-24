const sendEmail = async (email, subject, text) => {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: process.env.EMAIL_USER, name: "MediCare+" },
      to: [{ email }],
      subject,
      textContent: text,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Brevo API error: ${res.status}`);
  }
};

export default sendEmail;