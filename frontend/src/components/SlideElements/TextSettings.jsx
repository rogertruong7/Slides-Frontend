import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getUserData, putUserData } from '../ApiCalls.jsx';
import { MuiColorInput } from 'mui-color-input'
import { Slider, TextField, Button } from '@mui/material';

function TextSettings({
  token,
  setTextSettingsVisible,
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
  const [colour, setColor] = useState('#000000');
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
          const text = slide.texts.find(t => t.id === objectDoubleClicked);

          if (text) {
            setWidth(parseFloat(text.width));
            setHeight(parseFloat(text.height));
            setContent(text.content);
            setFontSize(parseFloat(text.fontSize));
            setLeft(parseFloat(text.left));
            setTop(parseFloat(text.top));
            setColor(text.colour);
          }
        });
    }
  }, [objectDoubleClicked]);
	

  const editText = () => {
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const newPresentation = presentations.find(p => p.id === presentationId);

        const slide = newPresentation.slides.find(s => s.slideNumber === slideNumber);
        let text = slide.texts.find(t => t.id === objectDoubleClicked);
			
        text.content = content;
        text.width = `${width}%`;
        text.height = `${height}%`;
        text.fontSize = `${fontSize}em`;
        text.colour = colour;
        text.left = `${left}%`;
        text.top = `${top}%`;
			
        const data = {
          presentations: presentations
        }

        putUserData(token, data)
          .then(() => {
            setPresentation(newPresentation);
            setTextSettingsVisible(false);
            setSettingsSideBar(false);
            setDoubleClicked(false);
          })
      });
  }

  const addText = () => {
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const newPresentation = presentations.find(p => p.id === presentationId);
        const slide = newPresentation.slides.find(s => s.slideNumber === slideNumber);
        const newText = {
          id: id,
          content: content,
          width: `${width}%`,
          height: `${height}%`,
          fontSize: `${fontSize}em`,
          colour: colour,
          left: `${left}%`,
          top: `${top}%`,
          font: 'Poppins',
        }
        slide.texts.push(newText); 
			
        const data = {
          presentations: presentations
        }
			
        putUserData(token, data)
          .then(() => {
            setPresentation(newPresentation);
            setTextSettingsVisible(false);
            setSettingsSideBar(false);
            setDoubleClicked(false);
          })
      });
  }

  return (
    <>
      {doubleClicked ? (
        <h3>Edit Text Settings</h3>
      ) : (
        <h3>Text Settings</h3>
      )}
      <form style={{marginLeft: '20px', marginRight: '20px'}} onSubmit={(e) => {
        e.preventDefault(); 
        doubleClicked ? editText() : addText();
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
        <b>Your text</b>
        <TextField
          fullWidth
          label="Text"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
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
        <b>Font Colour</b>
        <MuiColorInput
          format="hex"
          value={colour}
          onChange={e => setColor(e)}
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

export default TextSettings;