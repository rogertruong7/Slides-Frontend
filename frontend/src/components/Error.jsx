import { Button as BaseButton } from '../styles/LoginRegister.jsx';
import { ButtonContainer, BodyContainer, DeleteContainer } from './DeletePresPopup.jsx';

function Error({setErrorVisible, errorMessage, errorStatus}) {
  return (
    <BodyContainer>
      <DeleteContainer>
        <p>Error {errorStatus}: {errorMessage}</p>
        <ButtonContainer>
          <BaseButton onClick={() => {setErrorVisible(false)}}>Ok</BaseButton>
        </ButtonContainer>
      </DeleteContainer>
    </BodyContainer>
  )
}

export default Error;