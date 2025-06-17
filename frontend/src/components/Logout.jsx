import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Error from '../components/Error.jsx';

const StyledButton = styled.button`
  font-family: 'Poppins', sans-serif;
  height: 60px;
  border-radius: 60px;
  background-color: white;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    background-color: #f0f0f0; 
  }
`;

const Logout = ({ token, setToken }) => {
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const logout = () => {
    axios.post('http://localhost:5005/admin/auth/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/');
      })
      .catch(() => {
        setErrorVisible(true);
        setErrorMessage('Failed Logout.');
      });
  };

  return (
    <>
      {errorVisible && (
        <Error setErrorVisible={setErrorVisible} errorMessage={errorMessage} errorStatus={'403'} /> 
      )}
      <StyledButton onClick={logout}>Logout</StyledButton>
    </>
  );
};

export default Logout;
