import { useState } from "react";
import styled from "styled-components";
import { MuiColorInput } from 'mui-color-input'
import { getUserData, putUserData } from "./ApiCalls";
import { fileToDataUrl } from "./Helpers";
import { Button } from '@mui/material';


const ThemeModal = ({
  token,
  setThemeModalVisible,
  setPresentation,
  presentationId,
  slideNumber
}) => {
  const [defaultBackground, setDefaultBackground] = useState(false);
  const [backgroundType, setBackgroundType] = useState("solid");
  const [colour, setColour] = useState("#FFFFFF");
  const [gradientLeft, setGradientLeft] = useState("#FF0000");
  const [gradientRight, setGradientRight] = useState("#0000FF");
  const [image, setImage] = useState("");

  const onApply = (newTheme) => {
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const newPresentation = presentations.find(p => p.id === presentationId);

        if (defaultBackground) {
          newPresentation.defaultTheme = newTheme;
        } else {
          const slide = newPresentation.slides.find(s => s.slideNumber === slideNumber);
          slide.theme = newTheme;
        }
        const data = {
          presentations: presentations
        }

        putUserData(token, data)
          .then(() => {
            setPresentation(newPresentation);
            setThemeModalVisible(false);
          })
      });
  }

  const handleApply = () => {
    let newTheme = {
      type: backgroundType,
    };
    switch (backgroundType) {
    case "solid":
      newTheme.value = colour;
      break;
    case "gradient":
      newTheme.value = `linear-gradient(${gradientLeft}, ${gradientRight})`;
      break;
    case "image":
      if (image === '') {
        return;
      }
      newTheme.value = image;
      break;
    default:
      break;
    }
    onApply(newTheme);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      return fileToDataUrl(file)
        .then(dataUrl => {
          const image = dataUrl;
          setImage(image);
        })
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h3 style={{textAlign: 'center'}}>Theme Settings</h3>
        <label>
          <input
            type="checkbox"
            value={defaultBackground}
            onChange={(e) => setDefaultBackground(e.target.value)}
          />
					Set Default
        </label>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <label>
            <input
              type="radio"
              value="solid"
              checked={backgroundType === "solid"}
              onChange={() => setBackgroundType("solid")}
            />
            Solid Colour
          </label>
          {backgroundType === "solid" && (
            <MuiColorInput
              format="hex"
              value={colour}
              onChange={e => setColour(e)}
              margin="normal"
            />
          )}
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <label>
            <input
              type="radio"
              value="gradient"
              checked={backgroundType === "gradient"}
              onChange={() => setBackgroundType("gradient")}
            />
            Gradient
          </label>
          {backgroundType === "gradient" && (
            <>
              <b>Start Colour</b>
              <MuiColorInput
                format="hex"
                value={gradientLeft}
                onChange={e => setGradientLeft(e)}
                margin="normal"
              />
              <b>End Colour</b>
              <MuiColorInput
                format="hex"
                value={gradientRight}
                onChange={e => setGradientRight(e)}
                margin="normal"
              />
            </>
          )}
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="image"
              checked={backgroundType === "image"}
              onChange={() => setBackgroundType("image")}
            />
            Image
          </label>
          <br />
          {backgroundType === "image" && (
            <Button
              variant="contained"
              component="label"
              style={{ marginTop: '10px', marginBottom: '10px' }}
            >
							Upload File
              <input
                type="file"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
          )}
        </div>
        <br />
        <div style={{display: 'flex', gap: '10px'}}>
          <ApplyButton onClick={handleApply}>Apply</ApplyButton>
          <CancelButton onClick={() => {setThemeModalVisible(false)}}>Cancel</CancelButton>
					
        </div>
        
      </ModalContent>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
	font-family: 'Poppins', sans-serif;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;

`;

const ApplyButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
	font-family: 'Poppins', sans-serif;

  &:hover {
    background: #0056b3;
  }
`;

const CancelButton = styled.button`
  background: #FF0000;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
	font-family: 'Poppins', sans-serif;

  &:hover {
    background: #d00000;
  }
`;

export default ThemeModal;