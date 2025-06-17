import styled from 'styled-components';
import Logout from './Logout';
import ProtectedRoute from './ProtectedRoute';
import logo from '../assets/pesto.jpg'
import EditTitleSection from './EditPresentationData/EditTitleButton.jsx';
import {
  Header,
  NavBrand,
  BrandLogo,
  BrandText,
  NavLinks,
} from '../styles/HeaderStyles';

function DashboardSlideHeader({token, setToken, presentation, setPresentation, deleteVisible, setDeleteVisible}) {
  return (
    <>
      <Header style={{overflow: 'auto'}}>
        <NavBrand>
          <BrandLogo src={logo} alt="Presto Logo" />
          <BrandText to="/dashboard">PRESTO</BrandText>
          {presentation && (
            <SlideData>
              <EditTitleSection token={token} presentation={presentation} setPresentation={setPresentation}/> 
            </SlideData>
          )}
        </NavBrand>
        
        <NavLinks>
          <>
            {presentation && (
              <DeleteButton onClick={() => setDeleteVisible(!deleteVisible)}>
                Delete Presentation
              </DeleteButton>
            )}
            <ProtectedRoute token={token} />
            <nav>
              <Logout token={token} setToken={setToken} />
            </nav>
          </>

        </NavLinks>
      </Header>
    </>
  );  
}

const SlideData = styled.div`
  margin-left: 50px;
  display: flex;
  gap: 10px;
  justify-content: space-around;
  align-items: center;
`;

export const DeleteButton = styled.button`
  margin-left: 30px;
  padding: 8px 16px;
  background-color: #ff4d4d;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  border-radius: 4px;
  margin-right: 20px;
  transition: background-color 0.3s ease;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #cc0000;
  }

  @media (max-width: 850px) {
    font-size: 12px;
  }
`;

export default DashboardSlideHeader;