import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Recuperação de Senha",
    html: `<p>Para redefinir sua senha, clique no link abaixo:</p>
           <a href="${resetLink}">Redefinir Senha</a>
           <p>O link expira em 1 hora.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
