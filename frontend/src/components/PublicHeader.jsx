import logo from '../assets/pesto.jpg'
import {
  Header,
  NavBrand,
  BrandLogo,
  BrandText,
  NavLinks,
  NavLink,
} from '../styles/HeaderStyles';

function MainHeader() {
  return (
    <>
      <Header>
        <NavBrand>
          <BrandLogo src={logo} alt="Presto Logo" />
          <BrandText to="/dashboard">PRESTO</BrandText>
        </NavBrand>
        <NavLinks>
          <NavLink to="/register">Register</NavLink>
          <span>|</span>
          <NavLink to="/login">Login</NavLink>
        </NavLinks>
      </Header>
    </>
  );  
}

export default MainHeader;