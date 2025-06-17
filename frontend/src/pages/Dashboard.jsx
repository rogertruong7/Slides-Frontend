import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreatePresentationButton from '../components/CreatePresentationButton';
import {getUserData} from '../components/ApiCalls'
import styled from 'styled-components';
import PresentationDisplay from '../components/PresentationDisplay';
import DashboardSlideHeader from '../components/DashboardSlideHeader';

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:visited {
    color: black;
  }
`;

const ResponsiveDiv = styled.div`
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  margin-left: 20%;
  margin-right: 20%;

  @media (max-width: 450px) {
    margin-left: 5%;
    margin-right: 5%;
  }
`;

function Dashboard({token, setTokenFn}) {
  const [presentations, setPresentations] = useState([]);

  const loadSlides = () => {
    getUserData(token)
      .then((response) => {
        if (response.store.presentations) {
          setPresentations(response.store.presentations);
        }
      })
  }

  React.useEffect(() => {
    loadSlides();
  }, []);

  return (
    <>
      <DashboardSlideHeader token={token} setToken={setTokenFn}/>
      <div style={{ height: '150px', width: '100%', backgroundColor: '#F2F2F2', display: 'flex'}}>
        <CreatePresentationButton token={token} setPresentations={setPresentations} />
      </div>
      <h2 style={{
        marginLeft: '20%',
        marginRight: '20%',
        fontFamily: "'Poppins', sans-serif"
      }}>Recent presentations</h2>
      <ResponsiveDiv>
        <br />
        {presentations.length > 0 && (
          presentations.map((presentation, index) => (
            <StyledLink 
              key={index}
              to={`/${presentation.id}/edit/1`}
              state={{ presentation: presentation }}>
              <PresentationDisplay presentation={presentation} />
            </StyledLink>
          ))
        )}
      </ResponsiveDiv>
      <div style={{width: '100%', textAlign: 'center', fontFamily: "'Poppins', sans-serif", marginTop: '30px'}}>
        <p>&copy; Presto 2024</p>
      </div>
    </>
  );
}

export default Dashboard;