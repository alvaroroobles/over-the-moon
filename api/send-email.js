export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { captcha, name, email, message } = req.body;

  // 1. Validar el captcha con Google
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;
  const verifyRes = await fetch(verifyUrl, { method: 'POST' });
  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    return res.status(400).json({ error: "Fallo en la validación del robot." });
  }
  
  return res.status(200).json({ success: true });
}