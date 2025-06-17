import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getUserData, putUserData } from '../ApiCalls.jsx';
import { Slider, TextField, Button } from '@mui/material';

function CodeSettings({
  token,
  setCodeSettingsVisible,
  setSettingsSideBar,
  setPresentation,
  slideNumber,
  presentationId,
  doubleClicked,
  setDoubleClicked,
  objectDoubleClicked
}) {
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const [content, setContent] = useState('');
  const [fontSize, setFontSize] = useState(1);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const id = uuidv4();

  useEffect(() => {
    if (doubleClicked) {
      getUserData(token)
        .then((response) => {
          const presentations = response.store.presentations;
          const newPresentation = presentations.find(p => p.id === presentationId);

          const slide = newPresentation.slides.find(s => s.slideNumber === slideNumber);
          const code = slide.codes.find(c => c.id === objectDoubleClicked);

          if (code) {
            setWidth(parseFloat(code.width));
            setHeight(parseFloat(code.height));
            setContent(code.content);
            setFontSize(parseFloat(code.fontSize));
            setLeft(parseFloat(code.left));
            setTop(parseFloat(code.top));
          }
        });
    }
  }, [objectDoubleClicked]);
	

  const editCode = () => {
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const newPresentation = presentations.find(p => p.id === presentationId);

        const slide = newPresentation.slides.find(s => s.slideNumber === slideNumber);
        let code = slide.codes.find(c => c.id === objectDoubleClicked);
			
        code.content = content;
        code.width = `${width}%`;
        code.height = `${height}%`;
        code.fontSize = `${fontSize}em`;
        code.left = `${left}%`;
        code.top = `${top}%`;
			
        const data = {
          presentations: presentations
        }

        putUserData(token, data)
          .then(() => {
            setPresentation(newPresentation);
            setCodeSettingsVisible(false);
            setSettingsSideBar(false);
            setDoubleClicked(false);
          })
      });
  }

  const addCode = () => {
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const newPresentation = presentations.find(p => p.id === presentationId);
        const slide = newPresentation.slides.find(s => s.slideNumber === slideNumber);
        const newCode = {
          id: id,
          content: content,
          width: `${width}%`,
          height: `${height}%`,
          fontSize: `${fontSize}em`,
          left: `${left}%`,
          top: `${top}%`, 
        }
        slide.codes.push(newCode); 
			
        const data = {
          presentations: presentations
        }
			
        putUserData(token, data)
          .then(() => {
            setPresentation(newPresentation);
            setCodeSettingsVisible(false);
            setSettingsSideBar(false);
            setDoubleClicked(false);
          })
      });
  }

  return (
    <>
      {doubleClicked ? (
        <h3>Edit Code Settings</h3>
      ) : (
        <h3>Code Settings</h3>
      )}
      <form style={{marginLeft: '20px', marginRight: '20px'}} onSubmit={(e) => {
        e.preventDefault(); 
        doubleClicked ? editCode() : addCode();
      }}>
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
        <b>Your code</b>
        <TextField
          fullWidth
          label="Code"
          multiline
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          fontSize="9px"
        />
        <b>Font Size (em)</b>
        <Slider
          value={fontSize}
          onChange={(e, newValue) => setFontSize(newValue)}
          aria-label="Font Size"
          valueLabelDisplay="auto"
          step={0.1}
          min={0.5}
          max={6}
        />
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
        <Button
          type='submit'
          variant="contained"
          style={{marginBottom: '30px'}}
        >
					Apply
        </Button>
      </form>
    </>
  )
}

export default CodeSettings;