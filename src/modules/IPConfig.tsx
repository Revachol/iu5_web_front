import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { apiService } from '../services/apiService';

interface IPConfigProps {
  show: boolean;
  onHide: () => void;
}

const IPConfig: React.FC<IPConfigProps> = ({ show, onHide }) => {
  const [ip, setIp] = useState('');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    const savedIP = localStorage.getItem('api_ip') || '192.168.1.100:8000';
    setIp(savedIP);
  }, []);

  const testConnection = async () => {
    setTesting(true);
    setTestResult(null);
    
    const success = await apiService.testConnection();
    setTestResult(success ? 'success' : 'error');
    setTesting(false);
  };

  const saveAndTest = async () => {
    apiService.setIPAddress(ip);
    await testConnection();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Настройка подключения</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>IP адрес сервера (с портом)</Form.Label>
            <Form.Control
              type="text"
              placeholder="192.168.1.100:8000"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
            <Form.Text className="text-muted">
              Укажите IP адрес и порт сервера в локальной сети
            </Form.Text>
          </Form.Group>
        </Form>

        {testResult === 'success' && (
          <Alert variant="success">
            ✅ Подключение успешно!
          </Alert>
        )}
        
        {testResult === 'error' && (
          <Alert variant="danger">
            ❌ Не удалось подключиться к серверу
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="warning" onClick={testConnection} disabled={testing}>
          {testing ? 'Проверка...' : 'Проверить подключение'}
        </Button>
        <Button variant="primary" onClick={saveAndTest} disabled={testing}>
          Сохранить и проверить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IPConfig;