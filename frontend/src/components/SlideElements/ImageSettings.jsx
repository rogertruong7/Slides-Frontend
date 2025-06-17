import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getUserData, putUserData } from '../ApiCalls.jsx';
import { Slider, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { fileToDataUrl } from '../Helpers.jsx';
import Error from '../Error.jsx';

function ImageSettings({
  token,
  setImageSettingsVisible,
  setSettingsSideBar,
  setPresentation,
  slideNumber,
  presentationId,
  doubleClicked,
  setDoubleClicked,
  objectDoubleClicked,
}) {
  const [imageSrc, setImageSrc] = useState('');
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const [altText, setAltText] = useState('');
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [useUrl, setUseUrl] = useState(false);
  const id = uuidv4();

  useEffect(() => {
    if (doubleClicked) {
      getUserData(token)
        .then((response) => {
          const presentations = response.store.presentations;
          const newPresentation = presentations.find(p => p.id === presentationId);

          const slide = newPresentation.slides.find(s => s.slideNumber === slideNumber);
          const image = slide.images.find(t => t.id === objectDoubleClicked);
          if (image) {
            setWidth(parseFloat(image.width));
            setHeight(parseFloat(image.height));
            setImageSrc(image.src);
            setAltText(image.altText);
            setLeft(parseFloat(image.left));
            setTop(parseFloat(image.top));
          }
        });
    }
  }, [objectDoubleClicked]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      return fileToDataUrl(file)
        .then(dataUrl => {
          const image = dataUrl;
          setImageSrc(image);
        })
    }
  };

  const toggleInputType = () => {
    setUseUrl(!useUrl);
  };

  const editImage = () => {
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const newPresentation = presentations.find(p => p.id === presentationId);

        const slide = newPresentation.slides.find(s => s.slideNumber === slideNumber);
        let image = slide.images.find(i => i.id === objectDoubleClicked);
			
        image.altText = altText;
        image.width = `${width}%`;
        image.height = `${height}%`;
        if (imageSrc !== null) {
          image.src = imageSrc;
        }
			
        image.left = `${left}%`;
        image.top = `${top}%`;

        const data = {
          presentations: presentations
        }

        putUserData(token, data)
          .then(() => {
            setPresentation(newPresentation);
            setImageSettingsVisible(false);
            setSettingsSideBar(false);
            setDoubleClicked(false);
          })
          .catch((error) => {
            setErrorVisible(true);
            setErrorMessage(error.response.data.error);
          });
      })
      .catch((error) => {
        setErrorVisible(true);
        setErrorMessage(error.response.data.error);
      });
  }

  const addImage = () => {
    if (imageSrc === '') {
      setErrorVisible(true);
      setErrorMessage('No image given.');
      return <Error setErrorVisible={setErrorVisible} errorMessage={errorMessage} errorStatus={'403'} /> 
    }
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const newPresentation = presentations.find(p => p.id === presentationId);
        const slide = newPresentation.slides.find(s => s.slideNumber === slideNumber);
        const newImage = {
          id: id,
          src: imageSrc,
          width: `${width}%`,
          height: `${height}%`,
          altText: altText,
          left: `${left}%`,
          top: `${top}%`, 
        }
        slide.images.push(newImage); 
			
        const data = {
          presentations: presentations
        }
			
        putUserData(token, data)
          .then(() => {
            setPresentation(newPresentation);
            setImageSettingsVisible(false);
            setSettingsSideBar(false);
            setDoubleClicked(false);
          })
          .catch((error) => {
            setErrorVisible(true);
            setErrorMessage(error.response.data.error);
          });
      })
      .catch((error) => {
        setErrorVisible(true);
        setErrorMessage(error.response.data.error);
      });
  }

  return (
    <>
      {errorVisible && (
        <Error setErrorVisible={setErrorVisible} errorMessage={errorMessage} errorStatus={'403'} /> 
      )}
      {doubleClicked ? (
        <h3>Edit Image Settings</h3>
      ) : (
        <h3>Image Settings</h3>
      )}
      <form style={{ marginLeft: '20px', marginRight: '20px'}} onSubmit={(e) => {
        e.preventDefault(); 
        doubleClicked ? editImage() : addImage();
      }}>
        <FormControlLabel
          control={
            <Checkbox checked={useUrl} onChange={toggleInputType} />
          }
          label="Use URL for Image"
        />
        {useUrl ? (
          <>
            <TextField
              fullWidth
              label="Image URL"
              value={imageSrc}
              onChange={(e) => setImageSrc(e.target.value)}
              margin="normal"
            />
          </>
        ) : (
          <>
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
          </>
        )}
        <br />
        <b>Height (% of Slide)</b>
        <Slider
          value={height}
          onChange={(e, newValue) => setHeight(newValue)}
          aria-label="Height"
          valueLabelDisplay="auto"
          min={1}
          max={100}
        />
        <b>Width (% of Slide)</b>
        <Slider
          value={width}
          onChange={(e, newValue) => setWidth(newValue)}
          aria-label="Width"
          valueLabelDisplay="auto"
          min={1}
          max={100}
        />
        <TextField
          fullWidth
          label="Alt Text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          margin="normal"
        />
        <br />
        {doubleClicked && (
          <>
            <b>x-Position (% of Slide)</b>
            <Slider
              value={left}
              onChange={(e, newValue) => setLeft(newValue)}
              aria-label="x-Position"
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
            <b>y-Position (% of Slide)</b>
            <Slider
              value={top}
              onChange={(e, newValue) => setTop(newValue)}
              aria-label="y-Position"
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </>
        )}
        {/* Submit Button */}
        <Button variant="contained" type='submit'> 
        Apply
        </Button>
      </form>
    </>
  )
}

export default ImageSettings;