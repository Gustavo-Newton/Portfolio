import React from 'react';
import type { FooterData } from '../types';
import linkedinIcon from '../assets/images/icons/linkedin.png';
import githubIcon from '../assets/images/icons/github.png';
import emailIcon from '../assets/images/icons/email.png';
import whatsappIcon from '../assets/images/icons/whatsapp.jpg';
import './Footer.css';

export const Footer: React.FC = () => {
  const getFooterData = (): FooterData => {
    return {
      copyrightText: `© ${new Date().getFullYear()} Gustavo & Newton. Todos os direitos reservados.`
    };
  };

  const createSocialIcons = () => {
    const socialIcons = [
      { href: '#', icon: linkedinIcon, alt: 'LinkedIn' },
      { href: '#', icon: githubIcon, alt: 'GitHub' },
      { href: '#', icon: emailIcon, alt: 'Email' },
      { href: '#', icon: whatsappIcon, alt: 'WhatsApp' }
    ];

    return (
      <div className="footer-social-icons">
        {socialIcons.map((social, index) => (
          <a key={index} href={social.href} className="footer-social-icon">
            <img src={social.icon} alt={social.alt} />
          </a>
        ))}
      </div>
    );
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="copyright">{getFooterData().copyrightText}</p>
        {createSocialIcons()}
      </div>
    </footer>
  );
};
