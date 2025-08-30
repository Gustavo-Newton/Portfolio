import React from 'react';
import './EmailModal.css';

// Ícone de copiar em SVG
const CopyIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, email }) => {
  const [showSuccess, setShowSuccess] = React.useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Erro ao copiar email:', err);
    }
  };



  return (
    <div className="email-modal-backdrop" onClick={handleBackdropClick}>
      <div className="email-modal">
        <div className="email-modal-header">
          <h3>Email para contato</h3>
          <button className="email-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="email-modal-content">
          <p className="contact-text">Entre em contato pelo email:</p>
          <div className="email-text">
            <span>{email}</span>
            <button 
              className="copy-icon" 
              onClick={handleCopyEmail}
              title="Copiar email"
              aria-label="Copiar email"
            >
              <CopyIcon />
            </button>
          </div>
          <div className={`success-message ${showSuccess ? 'show' : ''}`}>
            Email copiado com sucesso!
          </div>
        </div>
      </div>
    </div>
  );
};
