"use server"

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  try {
    await resend.emails.send({
      from: 'Seu Portfolio <onboarding@resend.dev>', // Inicialmente use este email
      to: 'contatomateusmoraes6@gmail.com', // Substitua pelo seu email onde quer receber as mensagens
      subject: `Nova mensagem de contato de ${name}`,
      text: `
        Nome: ${name}
        Email: ${email}
        Mensagem: ${message}
      `,
    });

    return {
      message: "Obrigado pela sua mensagem! Entrarei em contato em breve.",
    };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw new Error('Falha ao enviar a mensagem. Por favor, tente novamente.');
  }
}