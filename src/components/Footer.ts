import type { FooterData } from '../types';
import { DOMUtils } from '../utils/dom';
import linkedinIcon from '../assets/images/icons/linkedin.png';
import githubIcon from '../assets/images/icons/github.png';
import emailIcon from '../assets/images/icons/email.png';
import whatsappIcon from '../assets/images/icons/whatsapp.jpg';

export class Footer {
  private element: HTMLElement;

  constructor() {
    this.element = this.createFooter();
  }

  private getFooterData(): FooterData {
    return {
      copyrightText: `© ${new Date().getFullYear()} Gustavo & Newton. Todos os direitos reservados.`
    };
  }

  private createFooter(): HTMLElement {
    const footer = DOMUtils.createElement('footer', 'footer');
    
    // Container principal do footer
    const footerContainer = DOMUtils.createElement('div', 'footer-container');
    
    // Copyright
    const copyright = DOMUtils.createElement('p', 'copyright', this.getFooterData().copyrightText);
    
    // Ícones de redes sociais
    const socialIcons = this.createSocialIcons();
    
    DOMUtils.appendChildren(footerContainer, copyright, socialIcons);
    footer.appendChild(footerContainer);
    return footer;
  }

  private createSocialIcons(): HTMLElement {
    const socialIcons = DOMUtils.createElement('div', 'footer-social-icons');
    
    // LinkedIn
    const linkedinLink = DOMUtils.createElement('a', 'footer-social-icon', '');
    linkedinLink.setAttribute('href', '#');
    const linkedinImg = document.createElement('img');
    linkedinImg.src = linkedinIcon;
    linkedinImg.alt = 'LinkedIn';
    linkedinLink.appendChild(linkedinImg);
    
    // GitHub
    const githubLink = DOMUtils.createElement('a', 'footer-social-icon', '');
    githubLink.setAttribute('href', '#');
    const githubImg = document.createElement('img');
    githubImg.src = githubIcon;
    githubImg.alt = 'GitHub';
    githubLink.appendChild(githubImg);
    
    // Email
    const emailLink = DOMUtils.createElement('a', 'footer-social-icon', '');
    emailLink.setAttribute('href', '#');
    const emailImg = document.createElement('img');
    emailImg.src = emailIcon;
    emailImg.alt = 'Email';
    emailLink.appendChild(emailImg);
    
    // WhatsApp
    const whatsappLink = DOMUtils.createElement('a', 'footer-social-icon', '');
    whatsappLink.setAttribute('href', '#');
    const whatsappImg = document.createElement('img');
    whatsappImg.src = whatsappIcon;
    whatsappImg.alt = 'WhatsApp';
    whatsappLink.appendChild(whatsappImg);
    
    DOMUtils.appendChildren(socialIcons, linkedinLink, githubLink, emailLink, whatsappLink);
    return socialIcons;
  }

  public render(): HTMLElement {
    return this.element;
  }

  public mount(container: HTMLElement): void {
    container.appendChild(this.element);
  }
}
