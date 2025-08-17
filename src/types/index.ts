// Tipos compartilhados para o projeto

export interface MenuItem {
  id: number;
  text: string;
  href: string;
}

export interface FooterData {
  copyrightText: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
}

export interface AboutData {
  title: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  image?: string;
  url?: string;
}

export interface ProjectsData {
  title: string;
  subtitle?: string;
  projects: Project[];
}

export interface Contact {
  id: number;
  label: string;
  value: string;
}

export interface ContactData {
  title: string;
  contacts: Contact[];
}

export interface Skill {
  id: number;
  name: string;
  level: string;
}

export interface SkillsData {
  title: string;
  skills: Skill[];
}

// Tipos específicos para React
export interface SocialIcon {
  href: string;
  icon: string;
  alt: string;
}

