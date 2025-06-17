import { useEffect, useState } from 'react';
import styled from 'styled-components';

function SideBarSlide({slide, selectedSlide, setSelectedSlide}) {
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    if (slide.slideNumber === 1) {
      setIsClicked(true);
    }
  }, []);
  
  useEffect(() => {
    if (selectedSlide === slide.slideNumber) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [selectedSlide])

  const clickedSlide = () => {
    
    setSelectedSlide(slide.slideNumber);
  }

  return (
    <>
      <DisplayBox onClick={clickedSlide} isClicked={isClicked}>
        <p>
          {slide.slideNumber}
        </p>
      </DisplayBox>
    </>
  );
}

const DisplayBox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isClicked'
})`
  display: flex;
  justify-content:center;
  align-items: center;
  width: 210px;
  aspect-ratio: 16 / 9;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  background-color: white;

  &:hover {
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.2);
  }

  ${({ isClicked }) =>
    isClicked && `
      box-shadow: 0px 0px 5px 2px rgba(0, 60, 200, 0.7);

      &:hover {
        box-shadow: 0px 0px 5px 2px rgba(0, 60, 200, 0.7);
      }
  `}
`

export default SideBarSlide;