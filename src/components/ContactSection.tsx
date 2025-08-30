import React, { forwardRef, useRef, useState } from 'react';
import { Section } from './Section';
import { Container } from './Container';
import { Card } from './Card';
import { Heading } from './Heading';
import { Text } from './Text';
import './ContactSection.css';
import { sendContactEmail } from '../services/email';
import linkedinIcon from '../assets/images/icons/linkedin.png';
import githubIcon from '../assets/images/icons/github.png';
import emailIcon from '../assets/images/icons/email.png';
import whatsappIcon from '../assets/images/icons/whatsapp.jpg';
import gustavoImg from '../assets/images/pessoal/gustavo.JPG';
import newtonImg from '../assets/images/pessoal/newton.jfif';

interface ContactSectionProps {
  id?: string;
  className?: string;
}

export const ContactSection = forwardRef<HTMLElement, ContactSectionProps>(({ id, className = '' }, ref) => {
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSend = async () => {
    const form = formRef.current;
    if (!form) return;
    const nameInput = form.querySelector('[name="nome"]') as HTMLInputElement | null;
    const emailInput = form.querySelector('[name="email"]') as HTMLInputElement | null;
    const phoneInput = form.querySelector('[name="telefone"]') as HTMLInputElement | null;
    const messageInput = form.querySelector('[name="mensagem"]') as HTMLTextAreaElement | null;
    const name = nameInput?.value?.trim() ?? '';
    const email = emailInput?.value?.trim() ?? '';
    const phone = phoneInput?.value?.trim() ?? '';
    const message = messageInput?.value?.trim() ?? '';
    if (!email || !message) {
      setFeedback({ type: 'error', message: 'Por favor, preencha seu e-mail e a mensagem.' });
      return;
    }
    try {
      setIsSending(true);
      setFeedback(null);
      await sendContactEmail({ name, email, phone, message, sentAt: new Date(), type: 'Contato - Portfólio' });
      setFeedback({ type: 'success', message: 'Mensagem enviada com sucesso!' });
      form.reset();
    } catch (err) {
      console.error(err);
      if ((err as Error)?.message === 'monthly_limit') {
        setFeedback({ type: 'error', message: 'Limite mensal de envios atingido. Tente novamente no próximo mês.' });
      } else {
        setFeedback({ type: 'error', message: 'Não foi possível enviar a mensagem. Tente novamente mais tarde.' });
      }
    } finally {
      setIsSending(false);
    }
  };
  return (
    <Section variant="contact" id={id} ref={ref} className={className}>
      <div className="contact-title-container">
        <Text variant="small" as="span" className="contact-subtitle">Entre em</Text>
        <Heading level={2} variant="section" className="contact-main-title">Contato</Heading>
      </div>
      <Container maxWidth="lg">
        <div className="contact-content">
          <div className="contact-form-section">
            <Card variant="elevated" className="contact-form-card">
              <Heading level={3} variant="card">Envie uma mensagem</Heading>
              <form ref={formRef} className="contact-form" noValidate autoComplete="off" onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input type="text" id="nome" name="nome" placeholder="Seu nome" disabled={isSending} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input type="email" id="email" name="email" placeholder="Seu e-mail" required disabled={isSending} />
                </div>
                <div className="form-group">
                  <label htmlFor="telefone">Telefone</label>
                  <input type="tel" id="telefone" name="telefone" placeholder="Seu telefone" disabled={isSending} />
                </div>
                <div className="form-group">
                  <label htmlFor="mensagem">Descrição</label>
                  <textarea id="mensagem" name="mensagem" placeholder="Sua mensagem" rows={5} required disabled={isSending}></textarea>
                </div>
                <button type="button" className="submit-btn" onClick={handleSend} disabled={isSending}>{isSending ? 'Enviando…' : 'Enviar Mensagem'}</button>
                {feedback && (
                  <div className={`contact-alert ${feedback.type}`}>{feedback.message}</div>
                )}
              </form>
            </Card>
          </div>

          <div className="contact-social-section">
            <div className="social-title-container">
              <Text variant="small" as="span" className="social-subtitle">Redes</Text>
              <Heading level={3} variant="card" className="social-main-title">Sociais</Heading>
            </div>
            <div className="social-contacts-list">
              <div className="person-social-group">
                <img src={gustavoImg} alt="Foto de Gustavo" className="person-avatar" />
                <h4 className="person-name">Gustavo</h4>
                <div className="social-links">
                  <a href="#" className="social-link">
                    <img src={linkedinIcon} alt="LinkedIn" className="social-link-icon" />
                    <span className="social-link-text">LinkedIn</span>
                  </a>
                  <a href="#" className="social-link">
                    <img src={emailIcon} alt="Email" className="social-link-icon" />
                    <span className="social-link-text">Email</span>
                  </a>
                  <a href="#" className="social-link">
                    <img src={whatsappIcon} alt="WhatsApp" className="social-link-icon" />
                    <span className="social-link-text">WhatsApp</span>
                  </a>
                  <a href="#" className="social-link">
                    <img src={githubIcon} alt="GitHub" className="social-link-icon" />
                    <span className="social-link-text">GitHub</span>
                  </a>
                </div>
              </div>

              <div className="person-social-group">
                <img src={newtonImg} alt="Foto de Newton" className="person-avatar" />
                <h4 className="person-name">Newton</h4>
                <div className="social-links">
                  <a href="#" className="social-link">
                    <img src={linkedinIcon} alt="LinkedIn" className="social-link-icon" />
                    <span className="social-link-text">LinkedIn</span>
                  </a>
                  <a href="#" className="social-link">
                    <img src={emailIcon} alt="Email" className="social-link-icon" />
                    <span className="social-link-text">Email</span>
                  </a>
                  <a href="#" className="social-link">
                    <img src={whatsappIcon} alt="WhatsApp" className="social-link-icon" />
                    <span className="social-link-text">WhatsApp</span>
                  </a>
                  <a href="#" className="social-link">
                    <img src={githubIcon} alt="GitHub" className="social-link-icon" />
                    <span className="social-link-text">GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
});


