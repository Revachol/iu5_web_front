//правильный

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomNavbar from './modules/Navbar';
import HomePage from './pages/HomePage';
import HistoricalObjectsPage from './pages/HistoricalObjectsPage';
import DetailedHistoricalObjectPage from './pages/DetailedHistoricalObjectPage';
import IPConfig from './modules/IPConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

console.log('🔍 [App.tsx] Module loaded - all imports successful');

const App: React.FC = () => {
  const [showIPConfig, setShowIPConfig] = useState(false);

  return (
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
    <IPConfig show={showIPConfig} onHide={() => setShowIPConfig(false)} />
  </div>
  );
};

export default App;