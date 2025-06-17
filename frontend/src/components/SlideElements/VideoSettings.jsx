import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getUserData, putUserData } from '../ApiCalls.jsx';
import { Slider, TextField, Button, Checkbox } from '@mui/material';
import Error from '../Error.jsx';

function VideoSettings({
  token,
  setVideoSettingsVisible,
  setSettingsSideBar,
  setPresentation,
  slideNumber,
  presentationId,
  doubleClicked,
  setDoubleClicked,
  objectDoubleClicked,
}) {
  const [videoUrl, setVideoUrl] = useState('');
  const [autoPlay, setAutoPlay] = useState(false);
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const id = uuidv4();

  useEffect(() => {
    if (doubleClicked) {
      getUserData(token)
        .then((response) => {
          const presentations = response.store.presentations;
          const newPresentation = presentations.find(p => p.id === presentationId);

          const slide = newPresentation.slides.find(s => s.slideNumber === slideNumber);
          const video = slide.videos.find(v => v.id === objectDoubleClicked);
          if (video) {
            setWidth(parseFloat(video.width));
            setHeight(parseFloat(video.height));
            setVideoUrl(video.videoUrl);
            setAutoPlay(video.autoPlay);
            setLeft(parseFloat(video.left));
            setTop(parseFloat(video.top));
          }
        });
    }
  }, [objectDoubleClicked]);


  const editVideo = () => {
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const newPresentation = presentations.find(p => p.id === presentationId);

        const slide = newPresentation.slides.find(s => s.slideNumber === slideNumber);
        let video = slide.videos.find(v => v.id === objectDoubleClicked);
			
        video.autoPlay = {autoPlay};
        video.width = `${width}%`;
        video.height = `${height}%`;
        if (videoUrl !== null) {
          video.videoUrl = videoUrl;
        }
        video.left = `${left}%`;
        video.top = `${top}%`;

        const data = {
          presentations: presentations
        }

        putUserData(token, data)
          .then(() => {
            setPresentation(newPresentation);
            setVideoSettingsVisible(false);
            setSettingsSideBar(false);
            setDoubleClicked(false);
          })
      });
  }

  const addVideo = () => {
    if (videoUrl === '') {
      setErrorVisible(!errorVisible);
      setErrorMessage('No video given.');
      return <Error setErrorVisible={setErrorVisible} errorMessage={errorMessage} errorStatus={'403'} /> 
    }
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const newPresentation = presentations.find(p => p.id === presentationId);
        const slide = newPresentation.slides.find(s => s.slideNumber === slideNumber);
        const newVideo = {
          id: id,
          videoUrl: videoUrl,
          width: `${width}%`,
          height: `${height}%`,
          autoPlay: {autoPlay},
          left: `${left}%`,
          top: `${top}%`, 
        }
        slide.videos.push(newVideo); 
			
        const data = {
          presentations: presentations
        }
			
        putUserData(token, data)
          .then(() => {
            setPresentation(newPresentation);
            setVideoSettingsVisible(false);
            setSettingsSideBar(false);
            setDoubleClicked(false);
          })
      });
    
  }

  return (
    <>
      {doubleClicked ? (
        <h3>Edit Video Settings</h3>
      ) : (
        <h3>Video Settings</h3>
      )}
      <form style={{ marginLeft: '20px', marginRight: '20px'}} onSubmit={(e) => {
        e.preventDefault(); 
        doubleClicked ? editVideo() : addVideo();
      }}>
        <b>Video URL</b>
        <TextField
          fullWidth
          label="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          margin="normal"
        />
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
        <b>Autoplay</b>
        <Checkbox
          fullWidth
          label="Autoplay"
          value={autoPlay}
          onChange={(e) => setAutoPlay(e.target.value)}
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
        <br />
        {/* Submit Button */}
        <Button variant="contained" type='submit'> 
        Apply
        </Button>
      </form>
    </>
  )
}

export default VideoSettings;