import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import HistoricalObjectsPage from './pages/HistoricalObjectsPage';
import DetailedHistoricalObjectPage from './pages/DetailedHistoricalObjectPage';
import IPConfig from './modules/IPConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const [showIPConfig, setShowIPConfig] = useState(false);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#/">Исторические объекты</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#/">Главная</Nav.Link>
            <Nav.Link href="#/historical_objects">Каталог</Nav.Link>
          </Nav>
          <Button 
            variant="outline-light" 
            size="sm"
            onClick={() => setShowIPConfig(true)}
          >
            Настройки сети
          </Button>
        </Container>
      </Navbar>

      <div style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/historical_objects" element={<HistoricalObjectsPage />} />
          <Route path="/historical_object/:id" element={<DetailedHistoricalObjectPage />} />
        </Routes>
      </div>

      <IPConfig 
        show={showIPConfig} 
        onHide={() => setShowIPConfig(false)} 
      />
    </div>
  );
};

export default App;