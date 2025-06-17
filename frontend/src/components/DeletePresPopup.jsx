
import { Button as BaseButton } from '../styles/LoginRegister.jsx';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserData, putUserData } from './ApiCalls.jsx';

function DeletePresPopup({token, setDeleteVisible, presentationId}) {
  const navigate = useNavigate();

  const deletePresentation = () => {
  	
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const newPresentations = presentations.filter(p => p.id !== presentationId);
        const data = {
          presentations: newPresentations
        }
        putUserData(token, data)
          .then(() => {
            navigate('/dashboard');
          })
      });
  }
 
  return (
    <BodyContainer>
      <DeleteContainer>
        <p>Are you sure?</p>
        <ButtonContainer>
          <BaseButton onClick={() => {setDeleteVisible(false)}}>Cancel</BaseButton>
          <DeleteButton onClick={deletePresentation}>Delete</DeleteButton>
        </ButtonContainer>
      </DeleteContainer>
    </BodyContainer>
  )
}

export const DeleteButton = styled(BaseButton)`
	background-color: red;

	&:hover {
		background-color: #cc0000;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	gap: 10px;
`;

export const BodyContainer = styled.div`
	background-color: rgba(0,0,0,0.2);
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 0;
	z-index: 101;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const DeleteContainer = styled.div`
	background-color: white;
	width: 300px;
	height: 200px;
	position: absolute;
	margin: auto auto;
	z-index: 100;
	border-radius: 10px;
	padding: 20px;
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: center;
	font-family: 'Poppins', sans-serif;
	flex-direction: column;
`;

export default DeletePresPopup;