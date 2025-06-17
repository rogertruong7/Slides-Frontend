// StyledHeaderComponents.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  color: white;
  padding: 15px 0px;
  height: 40px;
  position: sticky;
  z-index: 100;
  margin: 0;
  left: 0;
  top: 0;
  width: 100%;
  font-family: 'Poppins', sans-serif;
`;

export const NavBrand = styled.div`
  display: flex;
  align-items: center;
`;

export const BrandLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-left: 30px;
`;

export const BrandText = styled(Link)`
  font-size: 1.5rem;
  font-family: 'Poppins', sans-serif;
  color: white;
  text-decoration: none;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLink = styled(Link)`
  font-family: 'Poppins', sans-serif;
  color: white;
  text-decoration: none;
  margin-left: 15px;
  margin-right: 15px;

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: white;
  }
`;
