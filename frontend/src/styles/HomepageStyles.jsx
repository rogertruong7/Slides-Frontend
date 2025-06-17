import styled, { css } from 'styled-components';

export const HomepageContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  background-color: white;
  color: black;
  width: 800px;
  height: 500px;
  position: relative;
  transform: translateX(-100%);
  transition: transform 2s ease-out, opacity 2s ease-out;
  opacity: 0;
  margin: 150px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  z-index: 3;
  border-radius: 10px;

  ${(props) =>
    props.slidein &&
    css`
      transform: translateX(0);
      opacity: 1;
    `}
`

export const Tagline = styled.h1`
  font-size: 40px;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  font-size: 24px;
  margin: 0;
`;