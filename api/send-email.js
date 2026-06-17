
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { captcha, name, email, phone, message } = req.body;

  // 1. Validar el captcha con Google
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;
  const verifyRes = await fetch(verifyUrl, { method: 'POST' });
  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    return res.status(400).json({ error: "Fallo en la validación del robot." });
  }
  
  // 2. Si el captcha es correcto, enviamos el correo con Resend
  try {
    const data = await resend.emails.send({
      from: 'Academia <onboarding@resend.dev>', // Más adelante lo cambiaremos por tu dominio
      to: 'alvaro.becerril.robles@gmail.com',     // <-- TU CORREO AQUÍ
      subject: 'Nueva consulta desde la web',
      html: `
        <h2>¡Tienes un nuevo mensaje de contacto!</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `
    });

    return res.status(200).json({ success: true, message: "Correo enviado correctamente", data });
    
  } catch (error) {
    console.error("Error al enviar el email:", error);
    return res.status(500).json({ error: "Error al enviar el correo, intenta de nuevo más tarde." });
  }
}