import type { HeroData, AboutData, ProjectsData, ContactData, Project, SkillsData, Skill } from '../types';
import { DOMUtils } from '../utils/dom';
import './Home.css';

export class Home {
  private element: HTMLElement;
  private heroData: HeroData = {
    title: 'Gustavo & Newton',
    subtitle: 'Desenvolvedores Web focados em soluções modernas e eficientes.'
  };

  private aboutData: AboutData = {
    title: 'Sobre Nós',
    description: 'Somos Gustavo Seberino da Silva e Newton Marques Coelho Neto, apaixonados por tecnologia.'
  };

  private skillsData: SkillsData = {
    title: 'Experiências',
    skills: [
      { id: 1, name: 'HTML', level: 'Avançado' },
      { id: 2, name: 'CSS', level: 'Avançado' },
      { id: 3, name: 'JAVA', level: 'Intermediário' },
      { id: 4, name: 'JAVASCRIPT', level: 'Intermediário' },
      { id: 5, name: 'TYPESCRIPT', level: 'Intermediário' },
      { id: 6, name: 'React', level: 'Intermediário' },
      { id: 7, name: 'NODE JS', level: 'Intermediário' },
      { id: 8, name: 'Git', level: 'Intermediário' },
      { id: 9, name: 'Sourcetree', level: 'Avançado' }
    ]
  };

  private projectsData: ProjectsData = {
    title: 'Projetos',
    subtitle: 'Nossos',
    projects: [
      {
        id: 1,
        title: 'MSM Group',
        description: 'Projeto em andamento - Desenvolvimento de sistema web para a MSM Group.',
        icon: '🚀',
        image: '/src/assets/images/pessoal/connect.png'
      }
    ]
  };

  private contactData: ContactData = {
    title: 'Contato',
    contacts: [
      {
        id: 1,
        label: 'Gustavo',
        value: 'gustavoseberino@gmail.com'
      },
      {
        id: 2,
        label: 'Newton',
        value: 'newtoncoelho.neto@gmail.com'
      }
    ]
  };

  constructor() {
    this.element = this.createHome();
  }

  private createHome(): HTMLElement {
    const main = DOMUtils.createElement('main', 'home');
    
    // Hero Section
    const hero = this.createHeroSection();
    main.appendChild(hero);

    // About Section
    const about = this.createAboutSection();
    main.appendChild(about);

    // Skills Section
    const skills = this.createSkillsSection();
    main.appendChild(skills);

    // Projects Section
    const projects = this.createProjectsSection();
    main.appendChild(projects);

    // Contact Section
    const contact = this.createContactSection();
    main.appendChild(contact);

    return main;
  }

  private createHeroSection(): HTMLElement {
    const section = DOMUtils.createElement('section', 'hero');
    const h1 = DOMUtils.createElement('h1', '', this.heroData.title);
    const p = DOMUtils.createElement('p', '', this.heroData.subtitle);
    
    DOMUtils.appendChildren(section, h1, p);
    return section;
  }

  private createAboutSection(): HTMLElement {
    const section = DOMUtils.createElement('section', 'about');
    section.id = 'about';
    
    const h2 = DOMUtils.createElement('h2', '', this.aboutData.title);
    
    // Container para as fotos e descrições
    const aboutContainer = DOMUtils.createElement('div', 'about-container');
    
    // Gustavo
    const gustavoCard = this.createPersonCard(
      'Gustavo Seberino da Silva',
      '32 anos, nascido em Florianópolis. Cursa Análise e Desenvolvimento de Sistemas (ADS) e é desenvolvedor front-end com foco em criar interfaces modernas e experiências digitais excepcionais.',
      '/src/assets/images/pessoal/gustavo.JPG'
    );
    
    // Newton
    const newtonCard = this.createPersonCard(
      'Newton Marques Coelho Neto',
      '31 anos, nascido no Rio de Janeiro. Desenvolvedor Full-Stack e analista de sistemas com especialização em C# e segurança da informação, com 6 anos de experiência em TI. Especialista em validação de identidade, análise antifraude e Big Data, com vasto conhecimento em C#, Java, JavaScript, Python e frameworks como MVC, AWS e Django.',
      '/src/assets/images/pessoal/newton.jfif'
    );
    
    DOMUtils.appendChildren(aboutContainer, gustavoCard, newtonCard);
    DOMUtils.appendChildren(section, h2, aboutContainer);
    return section;
  }

  private createSkillsSection(): HTMLElement {
    const section = DOMUtils.createElement('section', 'skills');
    section.id = 'experiencias';
    
    // Criar título composto
    const titleContainer = DOMUtils.createElement('div', 'skills-title-container');
    const subtitle = DOMUtils.createElement('span', 'skills-subtitle', 'Explore Nossas');
    const title = DOMUtils.createElement('h2', 'skills-main-title', 'Experiências');
    
    DOMUtils.appendChildren(titleContainer, subtitle, title);
    
    // Container para as skills
    const skillsContainer = DOMUtils.createElement('div', 'skills-container');
    
    // Criar duas colunas (uma para cada pessoa)
    const gustavoSkills = this.createPersonSkills('Gustavo', this.skillsData.skills);
    const newtonSkills = this.createPersonSkills('Newton', this.skillsData.skills);
    
    DOMUtils.appendChildren(skillsContainer, gustavoSkills, newtonSkills);
    DOMUtils.appendChildren(section, titleContainer, skillsContainer);
    
    // Adicionar Intersection Observer para animação automática
    this.setupSkillsAnimation(skillsContainer);
    
    return section;
  }

  private setupSkillsAnimation(skillsContainer: HTMLElement): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Verifica se a animação já foi executada para evitar conflito
          if (!entry.target.classList.contains('animate')) {
            entry.target.classList.add('animate');
          }
        } else {
          // Remove a classe quando a seção sai da tela para permitir nova animação
          entry.target.classList.remove('animate');
        }
      });
    }, {
      threshold: 0.3, // Animar quando 30% da seção estiver visível
      rootMargin: '0px 0px -50px 0px'
    });
    
    observer.observe(skillsContainer);
  }

  private createPersonSkills(personName: string, skills: Skill[]): HTMLElement {
    const personSkills = DOMUtils.createElement('div', 'person-skills');
    
    const h3 = DOMUtils.createElement('h3', '', personName);
    personSkills.appendChild(h3);
    
    // Lista de skills
    const skillsList = DOMUtils.createElement('div', 'skills-list');
    
    skills.forEach(skill => {
      const skillItem = this.createSkillItem(skill);
      skillsList.appendChild(skillItem);
    });
    
    personSkills.appendChild(skillsList);
    return personSkills;
  }

  private createSkillItem(skill: Skill): HTMLElement {
    const skillItem = DOMUtils.createElement('div', 'skill-item');
    
    // Ícone checkmark
    const checkmarkIcon = document.createElement('img') as HTMLImageElement;
    checkmarkIcon.src = '/src/assets/images/icons/checkmark.png';
    checkmarkIcon.alt = 'Checkmark';
    checkmarkIcon.className = 'skill-icon';
    
    // Nome da skill
    const skillName = DOMUtils.createElement('span', 'skill-name', skill.name);
    
    // Nível da skill
    const skillLevel = DOMUtils.createElement('span', 'skill-level', `(${skill.level})`);
    
    DOMUtils.appendChildren(skillItem, checkmarkIcon, skillName, skillLevel);
    return skillItem;
  }

  private createPersonCard(name: string, description: string, imagePath?: string): HTMLElement {
    const card = DOMUtils.createElement('div', 'person-card');
    
    const photoContainer = DOMUtils.createElement('div', 'photo-container');
    const photo = DOMUtils.createElement('div', 'photo-placeholder');
    
    if (imagePath) {
      // Usar imagem real
      const img = document.createElement('img') as HTMLImageElement;
      img.src = imagePath;
      img.alt = `Foto de ${name}`;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '50%';
      photo.appendChild(img);
    } else {
      // Fallback para emoji se não houver imagem
      const photoIcon = DOMUtils.createElement('span', '', '👨‍💻');
      photo.appendChild(photoIcon);
    }
    
    photoContainer.appendChild(photo);
    
    const content = DOMUtils.createElement('div', 'person-content');
    const h2 = DOMUtils.createElement('h2', '', name);
    const p = DOMUtils.createElement('p', '', description);
    
    // Criar seção de ícones de redes sociais
    const socialIcons = this.createSocialIcons();
    
    DOMUtils.appendChildren(content, h2, p, socialIcons);
    DOMUtils.appendChildren(card, photoContainer, content);
    
    return card;
  }

  private createSocialIcons(): HTMLElement {
    const socialIcons = DOMUtils.createElement('div', 'social-icons');
    
    // LinkedIn
    const linkedinLink = DOMUtils.createElement('a', 'social-icon', '');
    linkedinLink.setAttribute('href', '#');
    const linkedinImg = document.createElement('img') as HTMLImageElement;
    linkedinImg.src = '/src/assets/images/icons/linkedin.png';
    linkedinImg.alt = 'LinkedIn';
    linkedinLink.appendChild(linkedinImg);
    
    // GitHub
    const githubLink = DOMUtils.createElement('a', 'social-icon', '');
    githubLink.setAttribute('href', '#');
    const githubImg = document.createElement('img') as HTMLImageElement;
    githubImg.src = '/src/assets/images/icons/github.png';
    githubImg.alt = 'GitHub';
    githubLink.appendChild(githubImg);
    
    // Email
    const emailLink = DOMUtils.createElement('a', 'social-icon', '');
    emailLink.setAttribute('href', '#');
    const emailImg = document.createElement('img') as HTMLImageElement;
    emailImg.src = '/src/assets/images/icons/email.png';
    emailImg.alt = 'Email';
    emailLink.appendChild(emailImg);
    
    // WhatsApp
    const whatsappLink = DOMUtils.createElement('a', 'social-icon', '');
    whatsappLink.setAttribute('href', '#');
    const whatsappImg = document.createElement('img') as HTMLImageElement;
    whatsappImg.src = '/src/assets/images/icons/whatsapp.jpg';
    whatsappImg.alt = 'WhatsApp';
    whatsappLink.appendChild(whatsappImg);
    
    DOMUtils.appendChildren(socialIcons, linkedinLink, githubLink, emailLink, whatsappLink);
    return socialIcons;
  }

  private createProjectsSection(): HTMLElement {
    const section = DOMUtils.createElement('section', 'projects');
    section.id = 'projects';
    
    // Criar título composto (como na seção de skills)
    const titleContainer = DOMUtils.createElement('div', 'projects-title-container');
    const subtitle = DOMUtils.createElement('span', 'projects-subtitle', this.projectsData.subtitle || 'Explore Nossos');
    const title = DOMUtils.createElement('h2', 'projects-main-title', this.projectsData.title);
    
    DOMUtils.appendChildren(titleContainer, subtitle, title);
    
    const projectList = DOMUtils.createElement('div', 'project-list');
    
    // Criar cards dos projetos
    this.projectsData.projects.forEach(project => {
      const projectCard = this.createProjectCard(project);
      projectList.appendChild(projectCard);
    });
    
    DOMUtils.appendChildren(section, titleContainer, projectList);
    return section;
  }

  private createProjectCard(project: Project): HTMLElement {
    const card = DOMUtils.createElement('div', 'project-card');
    
    // Criar container para imagem ou placeholder
    let imageContainer: HTMLElement | HTMLImageElement;
    
    if (project.image) {
      // Usar imagem real
      imageContainer = document.createElement('img') as HTMLImageElement;
      (imageContainer as HTMLImageElement).src = project.image;
      (imageContainer as HTMLImageElement).alt = `Imagem do projeto ${project.title}`;
      imageContainer.className = 'project-image';
    } else {
      // Fallback para placeholder com ícone
      imageContainer = DOMUtils.createElement('div', 'project-placeholder');
      const icon = DOMUtils.createElement('span', '', project.icon);
      imageContainer.appendChild(icon);
    }
    
    // Criar título do projeto com ícone de experiência (como na lista de skills)
    const h3 = DOMUtils.createElement('h3', 'project-title-with-icon', '');
    
    // Ícone de experiência
    const experienceIcon = document.createElement('img') as HTMLImageElement;
    experienceIcon.src = '/src/assets/images/icons/experience.png';
    experienceIcon.alt = 'Projeto Validado';
    experienceIcon.className = 'project-experience-icon';
    
    // Texto do título
    const titleText = DOMUtils.createElement('span', '', project.title);
    
    DOMUtils.appendChildren(h3, experienceIcon, titleText);
    
    const p = DOMUtils.createElement('p', '', project.description);
    
    DOMUtils.appendChildren(card, imageContainer, h3, p);
    return card;
  }

  private createContactSection(): HTMLElement {
    const section = DOMUtils.createElement('section', 'contact');
    section.id = 'contact';
    
    const h2 = DOMUtils.createElement('h2', '', this.contactData.title);
    
    // Criar elementos de contato
    const contactElements = this.contactData.contacts.map(contact => {
      return DOMUtils.createElement('p', '', `${contact.label}: ${contact.value}`);
    });
    
    DOMUtils.appendChildren(section, h2, ...contactElements);
    return section;
  }

  public render(): HTMLElement {
    return this.element;
  }

  public mount(container: HTMLElement): void {
    container.appendChild(this.element);
  }
}
