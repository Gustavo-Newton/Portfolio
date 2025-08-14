import './style.css';
import { App } from './app';

// Inicializar a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  try {
    const app = new App('app');
    app.init();
  } catch (error) {
    console.error('Erro ao inicializar a aplicação:', error);
  }
});
