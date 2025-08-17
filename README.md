# Portfolio - Gustavo & Newton

Portfolio pessoal desenvolvido em React com TypeScript, apresentando os trabalhos e experiências de Gustavo Seberino da Silva e Newton Marques Coelho Neto.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **CSS3** - Estilização moderna com animações e responsividade
- **HTML5** - Estrutura semântica

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/gustavo-newton/Portfolio.git
cd Portfolio
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── Navbar.tsx      # Navegação principal
│   ├── Footer.tsx      # Rodapé da aplicação
│   ├── Navbar.css      # Estilos da navegação
│   └── Footer.css      # Estilos do rodapé
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Página principal
│   └── Home.css        # Estilos da página principal
├── types/              # Definições de tipos TypeScript
│   └── index.ts        # Tipos compartilhados
├── assets/             # Recursos estáticos
│   └── images/         # Imagens e ícones
├── App.tsx             # Componente principal
├── index.tsx           # Ponto de entrada da aplicação
└── style.css           # Estilos globais
```

## 🎨 Funcionalidades

- **Design Responsivo** - Adaptável a diferentes tamanhos de tela
- **Navegação Suave** - Scroll automático entre seções
- **Animações CSS** - Efeitos visuais interativos
- **Seções Principais**:
  - Hero com apresentação
  - Sobre com informações pessoais
  - Experiências e habilidades
  - Projetos desenvolvidos
  - Informações de contato

## 🚀 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm build` - Cria a versão de produção
- `npm test` - Executa os testes
- `npm eject` - Ejeta a configuração do Create React App

## 🌐 Build e Deploy no GitHub Pages

Siga os passos abaixo para gerar o build de produção, mover os arquivos para a pasta `docs/` e publicar no GitHub Pages.

1. Gerar o build de produção:
```bash
npm run build
```

2. Mover os arquivos do build para `docs/`:

Windows (PowerShell):
```powershell
Remove-Item -Recurse -Force .\docs\*
Copy-Item -Recurse -Force .\build\* .\docs\
```

3. Committar e enviar para a branch `main`:
```bash
git add docs
git commit -m "build: publica nova versão no GitHub Pages"
git push origin main
```

4. No GitHub, verifique em Settings → Pages se a fonte está configurada para `main` com a pasta `/docs`.

## 📱 Responsividade

O projeto é totalmente responsivo e funciona perfeitamente em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🎯 Características Técnicas

- **Componentes Funcionais** - Utilizando React Hooks
- **TypeScript** - Tipagem estática para maior segurança
- **CSS Modules** - Estilos encapsulados por componente
- **Intersection Observer** - Animações baseadas em scroll
- **Performance Otimizada** - Lazy loading e otimizações

## 👥 Autores

- **Gustavo Seberino da Silva** - Desenvolvedor Front-end
- **Newton Marques Coelho Neto** - Desenvolvedor Full-Stack

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
