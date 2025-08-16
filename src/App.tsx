import React from 'react';
import { Navbar, Footer, Container } from './components';
import { Home } from './pages/Home';
import './style.css';

function App() {
  return (
    <div id="app">
      <header>
        <Navbar />
      </header>
      <Container maxWidth="full" padding="none">
        <Home />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
