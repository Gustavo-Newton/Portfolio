import React from 'react';
import type { MenuItem } from '../types';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const menuItems: MenuItem[] = [
    { id: 1, text: 'Sobre', href: '#about' },
    { id: 2, text: 'Experiências', href: '#experiencias' },
    { id: 3, text: 'Projetos', href: '#projects' },
    { id: 4, text: 'Contato', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
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
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <nav className="navbar">
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            <a href={item.href} onClick={(e) => handleClick(e, item.href)}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
