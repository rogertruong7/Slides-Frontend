import { Button as BaseButton } from '../styles/LoginRegister.jsx';
import { getUserData, putUserData } from './ApiCalls.jsx';
import { DeleteButton, ButtonContainer, BodyContainer, DeleteContainer } from './DeletePresPopup.jsx';


function DeleteSlidePopup({token, setDeleteVisible, setPresentation, setSelectedSlide, slideNumber, presentationId}) {

  const deleteSlide = () => {
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const newPresentation = presentations.find(p => p.id === presentationId);
        const newSlides = newPresentation.slides.filter(s => s.slideNumber !== slideNumber);
        let count = 1;
        let shiftFlag = false;

        // Renumbering the slides
        for (const slide of newSlides) {
          if (shiftFlag) {
            slide.slideNumber -= 1;
          }
          if (count !== slide.slideNumber) {
            shiftFlag = true;
            slide.slideNumber -= 1;
          }
          count++;
        }
        newPresentation.slides = newSlides;
        newPresentation.numSlides -= 1;
        const data = {
          presentations: presentations
        }
        putUserData(token, data)
          .then(() => {
            if (slideNumber === 1) {
              setSelectedSlide(1);
            } else {
              setSelectedSlide(slideNumber - 1);
            }
				
            setPresentation(newPresentation);
            setDeleteVisible(false);
          })
      });
  }

  return (
    <BodyContainer>
      <DeleteContainer>
        <p>Are you sure?</p>
        <ButtonContainer>
          <BaseButton onClick={() => {setDeleteVisible(false)}}>Cancel</BaseButton>
          <DeleteButton onClick={deleteSlide}>Delete</DeleteButton>
        </ButtonContainer>
      </DeleteContainer>
    </BodyContainer>
  )
}



export default DeleteSlidePopup;