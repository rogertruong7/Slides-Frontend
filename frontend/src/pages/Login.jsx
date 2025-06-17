import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BackgroundContainer, FormContainer, Title, Label, Input, Button } from '../styles/LoginRegister.jsx';
import Error from '../components/Error.jsx';

function Login({ setTokenFn }) {
  const [errorVisible, setErrorVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = () => {
    axios.post('http://localhost:5005/admin/auth/login', {
      email: email,
      password: password,
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        setTokenFn(response.data.token)
        navigate('/dashboard');
      })
      .catch(() => {
        setErrorVisible(true);
      });
  };

  return (
    <>
      {errorVisible && (
        <Error setErrorVisible={setErrorVisible} errorMessage={'Failed Login'} errorStatus={'400'} /> 
      )}
      <BackgroundContainer>
        <FormContainer onSubmit={submit => {
          submit.preventDefault();
          login();
        }}>
          <Title>Login</Title>
          <Label htmlFor="login__email__input">Email:</Label>
          <Input
            type="email"
            id="login__email__input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Label htmlFor="login__password__input">Password:</Label>
          <Input
            type="password"
            id="login__password__input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </FormContainer>
      </BackgroundContainer>
    </>
  );
}

export default Login;