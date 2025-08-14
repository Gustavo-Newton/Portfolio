import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';

export class App {
  private container: HTMLElement;
  private navbar: Navbar;
  private home: Home;
  private footer: Footer;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId) as HTMLElement;
    if (!this.container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }

    this.navbar = new Navbar();
    this.home = new Home();
    this.footer = new Footer();
  }

  public init(): void {
    this.setupContainer();
    this.mountComponents();
  }

  private setupContainer(): void {
    this.container.id = 'app';
  }

  private mountComponents(): void {
    // Header com Navbar
    const header = document.createElement('header');
    this.navbar.mount(header);
    this.container.appendChild(header);

    // Conteúdo principal
    this.home.mount(this.container);

    // Footer
    this.footer.mount(this.container);
  }
}
