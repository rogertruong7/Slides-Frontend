import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BackgroundContainer, FormContainer, Title, Label, Input, Button } from '../styles/LoginRegister.jsx';
import Error from '../components/Error.jsx';

function Register({ setTokenFn }) {
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const register = () => {
    if (checkPasswords()) {
      return;
    }
    axios.post('http://localhost:5005/admin/auth/register', {
      email: email,
      password: password,
      name: name,
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        setTokenFn(response.data.token);
        navigate('/dashboard');
      })
      .catch(() => {
        setErrorVisible(true);
        setErrorMessage('Failed Register.'); //error.response.data.error
      });
  };

  const checkPasswords = () => {
    if (password !== confirmPassword) {
      setErrorVisible(true);
      setErrorMessage('Passwords are not the same');
      return true;
    }
    return false;
  }

  return (
    <>
      {errorVisible && (
        <Error setErrorVisible={setErrorVisible} errorMessage={errorMessage} errorStatus={'400'} /> 
      )}
      <BackgroundContainer>
        <FormContainer onSubmit={e => { 
          e.preventDefault();
          register(); 
        }}>
          <Title>Register</Title>
          <Label htmlFor="register__name__input">Name:</Label>
          <Input
            type="text"
            id="register__name__input"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Label htmlFor="register__email__input">Email:</Label>
          <Input
            type="email"
            id="register__email__input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Label htmlFor="register__password__input">Password:</Label>
          <Input
            type="password"
            id="register__password__input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Label htmlFor="register__confirm__password__input">Confirm Password:</Label>
          <Input
            type="password"
            id="register__confirm__password__input"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <Button type="submit">Register</Button>
        </FormContainer>
      </BackgroundContainer>
    </>
    
  );
}

export default Register;