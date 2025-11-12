// modules/Navbar.tsx
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const CustomNavbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Navbar className="custom-navbar" fixed="top">
      <Container fluid className="navbar-container">
        {/* Кнопка "Главная" слева */}
        <Nav className="me-auto">
          <Nav.Link 
            onClick={() => navigate('/')}
            className="home-link"
          >
            <h1>Главная</h1>
          </Nav.Link>
        </Nav>

        {/* Логотип по центру */}
        <Navbar.Brand className="logo-center">
          <img
            src="images/mock/logo.svg"
            width="80"
            height="45"
            className="logo"
            alt="Historical Objects Logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
        </Navbar.Brand>

        {/* Пустой элемент для балансировки */}
        <Nav className="ms-auto">
          <div style={{ width: '100px' }}></div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;