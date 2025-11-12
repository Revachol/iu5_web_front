// App.tsx
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CustomNavbar from './modules/Navbar';
import HomePage from './pages/HomePage';
import HistoricalObjectsPage from './pages/HistoricalObjectsPage';
import DetailedHistoricalObjectPage from './pages/DetailedHistoricalObjectPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter basename='/iu5_web_front'>
      <div className="App">
        <CustomNavbar />
        <div style={{ paddingTop: '70px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/historical_objects" element={<HistoricalObjectsPage />} />
            <Route path="/historical_object/:id" element={<DetailedHistoricalObjectPage />} />
            <Route path="/my-request" element={
              <div className="home-page">
                <Container className="page-container"> 
                  <div className="text-center">
                    <h1 style={{ color: 'white', marginBottom: '30px' }}>Моя заявка</h1>
                    <p style={{ color: 'white' }}>Страница в разработке...</p>
                  </div>
                </Container>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;