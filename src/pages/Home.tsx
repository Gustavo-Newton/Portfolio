import React, { useEffect, useRef } from 'react';
import type { HeroData, AboutData, ProjectsData, Project, SkillsData, Skill } from '../types';
import { Section, Heading, Text, Card, Grid, Container, ContactSection } from '../components';
import checkmarkIcon from '../assets/images/icons/checkmark.png';
import experienceIconPng from '../assets/images/icons/experience.png';
import linkedinIcon from '../assets/images/icons/linkedin.png';
import githubIcon from '../assets/images/icons/github.png';
import emailIcon from '../assets/images/icons/email.png';
import whatsappIcon from '../assets/images/icons/whatsapp.jpg';
import connectPng from '../assets/images/pessoal/connect.png';
import gustavoImg from '../assets/images/pessoal/gustavo.JPG';
import newtonImg from '../assets/images/pessoal/newton.jfif';
import './Home.css';

export const Home: React.FC = () => {
  const skillsSectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  const heroData: HeroData = {
    title: 'Gustavo & Newton',
    subtitle: 'Desenvolvedores Web focados em soluções modernas e eficientes.'
  };

  const aboutData: AboutData = {
    title: 'Sobre Nós',
    description: 'Somos Gustavo Seberino da Silva e Newton Marques Coelho Neto, apaixonados por tecnologia.'
  };

  const skillsData: SkillsData = {
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

  const projectsData: ProjectsData = {
    title: 'Projetos',
    subtitle: 'Nossos',
    projects: [
      {
        id: 1,
        title: 'MSM Group',
        description: 'Projeto em andamento - Desenvolvimento de sistema web para a MSM Group.',
        icon: '🚀',
        image: connectPng,
        url: 'https://site-msm-group.web.app/'
      }
    ]
  };

  

  useEffect(() => {
    const setupAnimations = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!entry.target.classList.contains('animate')) {
              entry.target.classList.add('animate');
            }
          } else {
            entry.target.classList.remove('animate');
          }
        });
      }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observar seções
      if (aboutSectionRef.current) {
        observer.observe(aboutSectionRef.current);
      }
      if (skillsSectionRef.current) {
        observer.observe(skillsSectionRef.current);
      }
      if (projectsSectionRef.current) {
        observer.observe(projectsSectionRef.current);
      }
      if (contactSectionRef.current) {
        observer.observe(contactSectionRef.current);
      }

      return () => observer.disconnect();
    };

    setupAnimations();
  }, []);

  // Garantir que a página sempre vá ao topo quando recarregada
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Delay de 2 segundos e redirecionamento para a seção "Sobre Nós"
  useEffect(() => {
    const timer = setTimeout(() => {
      if (aboutSectionRef.current) {
        aboutSectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const createSkillItem = (skill: Skill) => (
    <div key={skill.id} className="skill-item">
      <img src={checkmarkIcon} alt="Checkmark" className="skill-icon" />
      <span className="skill-name">{skill.name}</span>
      <span className="skill-level">({skill.level})</span>
    </div>
  );

  const createPersonSkills = (personName: string, skills: Skill[]) => (
    <Card key={personName} variant="elevated" className="person-skills">
      <Heading level={3} variant="card">{personName}</Heading>
      <div className="skills-list">
        {skills.map(createSkillItem)}
      </div>
    </Card>
  );

  const createSocialIcons = () => {
    const socialIcons = [
      { href: '#', icon: linkedinIcon, alt: 'LinkedIn' },
      { href: '#', icon: githubIcon, alt: 'GitHub' },
      { href: '#', icon: emailIcon, alt: 'Email' },
      { href: '#', icon: whatsappIcon, alt: 'WhatsApp' }
    ];

    return (
      <div className="social-icons">
        {socialIcons.map((social, index) => (
          <a key={index} href={social.href} className="social-icon">
            <img src={social.icon} alt={social.alt} />
          </a>
        ))}
      </div>
    );
  };

  const createPersonCard = (name: string, description: string, imagePath?: string) => (
    <Card key={name} variant="elevated" className="person-card">
      <div className="photo-container">
        <div className="photo-placeholder">
          {imagePath ? (
            <img
              src={imagePath}
              alt={`Foto de ${name}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%'
              }}
            />
          ) : (
            <span>👨‍💻</span>
          )}
        </div>
      </div>
      <div className="person-content">
        <Heading level={2} variant="card">{name}</Heading>
        <Text variant="body">{description}</Text>
        {createSocialIcons()}
      </div>
    </Card>
  );

  const createProjectCard = (project: Project) => (
    <Card
      key={project.id}
      variant="elevated"
      className="project-card"
      onClick={() => {
        if (project.url) {
          window.open(project.url, '_blank', 'noopener,noreferrer');
        }
      }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={`Imagem do projeto ${project.title}`}
          className="project-image"
        />
      ) : (
        <div className="project-placeholder">
          <span>{project.icon}</span>
        </div>
      )}
      <div className="project-title-with-icon">
        <img
          src={experienceIconPng}
          alt="Projeto Validado"
          className="project-experience-icon"
        />
        <Heading level={3} variant="card">{project.title}</Heading>
      </div>
      <Text variant="body">{project.description}</Text>
    </Card>
  );

  

  return (
    <main className="home">
      {/* Intro Section */}
      <Section variant="hero" className="intro-block">
        <Heading level={1} variant="hero">{heroData.title}</Heading>
        <Text variant="lead">{heroData.subtitle}</Text>
        <img
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Portfólio de TI - Desenvolvimento Web"
          className="intro-image"
        />
      </Section>

      {/* About Section */}
      <Section variant="about" id="about" ref={aboutSectionRef}>
        <div className="about-title-container">
          <Text variant="small" as="span" className="about-subtitle">Sobre</Text>
          <Heading level={2} variant="section" className="about-main-title">Nós</Heading>
        </div>
        <Grid columns={2} gap="large" className="about-container">
          {createPersonCard(
            'Gustavo Seberino da Silva',
            '32 anos, nascido em Florianópolis. Cursa Análise e Desenvolvimento de Sistemas (ADS) e é desenvolvedor front-end com foco em criar interfaces modernas e experiências digitais excepcionais.',
            gustavoImg
          )}
          {createPersonCard(
            'Newton Marques Coelho Neto',
            '31 anos, nascido no Rio de Janeiro. Desenvolvedor Full-Stack e analista de sistemas com especialização em C# e segurança da informação, com 6 anos de experiência em TI. Especialista em validação de identidade, análise antifraude e Big Data, com vasto conhecimento em C#, Java, JavaScript, Python e frameworks como MVC, AWS e Django.',
            newtonImg
          )}
        </Grid>
      </Section>

      {/* Skills Section */}
      <Section variant="skills" id="experiencias" ref={skillsSectionRef}>
        <div className="skills-title-container">
          <Text variant="small" as="span" className="skills-subtitle">Explore Nossas</Text>
          <Heading level={2} variant="section" className="skills-main-title">{skillsData.title}</Heading>
        </div>
        <Grid columns={2} gap="large" className="skills-container">
          {createPersonSkills('Gustavo', skillsData.skills)}
          {createPersonSkills('Newton', skillsData.skills)}
        </Grid>
      </Section>

      {/* Projects Section */}
      <Section variant="projects" id="projects" ref={projectsSectionRef}>
        <div className="projects-title-container">
          <Text variant="small" as="span" className="projects-subtitle">{projectsData.subtitle}</Text>
          <Heading level={2} variant="section" className="projects-main-title">{projectsData.title}</Heading>
        </div>
        <Container maxWidth="lg">
          <Grid columns={1} gap="medium" className="project-list">
            {projectsData.projects.map(createProjectCard)}
          </Grid>
        </Container>
      </Section>

      {/* Contact Section */}
      <ContactSection id="contact" ref={contactSectionRef} />
    </main>
  );
};
