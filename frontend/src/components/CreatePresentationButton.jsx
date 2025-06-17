import { useState } from 'react';
import CreatePresentation from './CreatePresentationPopup.jsx';
import { Button as BaseButton } from '../styles/LoginRegister.jsx';
import styled from 'styled-components';

const CreateButton = styled(BaseButton)`
  height: 100px;
  width: 208px;
`

function CreatePresentationButton({token, setPresentations}) {
  const [popUpVisible, setPopUpVisible] = useState(false);
  const togglePopUp = () => {
    setPopUpVisible((prev) => !prev); // Toggle the state
  };
  // CreatePresentation
  return (
    <>
      <ResponsiveDiv>
        <CreateButton onClick={togglePopUp}>+ New Presentation</CreateButton>
        {popUpVisible && <CreatePresentation token={token} setPresentations={setPresentations} setPopUpVisible={setPopUpVisible}/>}
      </ResponsiveDiv>
    </>
  );
}

const ResponsiveDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-left: 20%;
  margin-right: 20%;

  @media (max-width: 450px) {
    flex-direction: column;
    margin: 0;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;


export default CreatePresentationButton;