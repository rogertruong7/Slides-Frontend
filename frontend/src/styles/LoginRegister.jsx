import styled from 'styled-components';

export const BackgroundContainer = styled.div`
  height: 100vh;
  margin: 0;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -2;
  background-color: black;
`;

export const FormContainer = styled.form`
  font-family: 'Poppins', sans-serif;
  background-color: rgb(244, 244, 244);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 300px;
  margin: 150px auto;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  align-self: flex-start;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  font-family: 'Poppins', sans-serif;
  width: 90%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background-color: #007BFF;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
