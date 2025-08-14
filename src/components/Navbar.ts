import type { MenuItem } from '../types';
import { DOMUtils } from '../utils/dom';

export class Navbar {
  private element: HTMLElement;
  private menuItems: MenuItem[] = [
    { id: 1, text: 'Sobre', href: '#about' },
    { id: 2, text: 'Experiências', href: '#experiencias' },
    { id: 3, text: 'Projetos', href: '#projects' },
    { id: 4, text: 'Contato', href: '#contact' }
  ];

  constructor() {
    this.element = this.createNavbar();
  }

  private createNavbar(): HTMLElement {
    const nav = DOMUtils.createElement('nav', 'navbar');
    const ul = DOMUtils.createElement('ul');

    // Criar itens do menu
    this.menuItems.forEach(item => {
      const li = DOMUtils.createElement('li');
      const link = DOMUtils.createLink(item.href, item.text);
      
      // Adicionar event listener para navegação suave
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.scrollToSection(item.href);
      });
      
      li.appendChild(link);
      ul.appendChild(li);
    });

    nav.appendChild(ul);
    return nav;
  }

  private scrollToSection(href: string): void {
    const targetId = href.substring(1); // Remove o #
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      
      // Disparar animação específica para Experiências
      if (targetId === 'experiencias') {
        setTimeout(() => {
          const skillsContainer = targetSection.querySelector('.skills-container');
          if (skillsContainer) {
            // Remove a classe para resetar a animação
            skillsContainer.classList.remove('animate');
            
            // Remove a classe de todos os skill-items para resetar
            const skillItems = skillsContainer.querySelectorAll('.skill-item');
            skillItems.forEach(item => {
              item.classList.remove('animate');
            });
            
            // Força um reflow para garantir que a remoção seja aplicada
            (skillsContainer as HTMLElement).offsetHeight;
            
            // Adiciona a classe novamente para executar a animação
            skillsContainer.classList.add('animate');
            
            // Adiciona a classe aos skill-items com delay
            skillItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate');
              }, 100 + (index * 100)); // Delay progressivo
            });
          }
        }, 500); // Aguardar o scroll terminar
      }
    }
  }

  public render(): HTMLElement {
    return this.element;
  }

  public mount(container: HTMLElement): void {
    container.appendChild(this.element);
  }
}
