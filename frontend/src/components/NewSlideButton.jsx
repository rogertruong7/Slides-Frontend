import { Button as BaseButton } from '../styles/LoginRegister.jsx';
import styled from 'styled-components';
import { getUserData, putUserData } from './ApiCalls.jsx';

function NewSlideButton({isSidebarOpen, token, presentation, setPresentation}) {
  const addNewSlide = () => {
  	
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const newPresentation = presentations.find(p => p.id === presentation.id);
        const numSlides = newPresentation.slides.length;
        const slideNumber = numSlides + 1;
        const newSlide = {
          texts: [],
          images: [],
          codes: [],
          videos: [],
          slideNumber: slideNumber,
          theme: '',
        };
        newPresentation.numSlides += 1;
        newPresentation.slides.push(newSlide);
        const data = {
          presentations: presentations
        }
        putUserData(token, data)
          .then(() => {
            setPresentation(newPresentation);
          })
      });
  }
 
  return (
    <ButtonContainer className={isSidebarOpen ? 'closed' : ''}>
      <NewSlideBtn onClick={addNewSlide}>+ New Slide</NewSlideBtn>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fdfdfd;
  height: 60px;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #dadada;
  transition: border-top 0.3s ease-in-out;

  &.closed {
    border-top: none;
    width: 100px;
  }
`;

const NewSlideBtn = styled(BaseButton)`
  height: 40px

  @media (max-width: 850px) {
    font-size: 9px;
  }
`;

export default NewSlideButton;