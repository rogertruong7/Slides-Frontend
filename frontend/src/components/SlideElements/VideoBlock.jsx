import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

function VideoBlock({
  video,
  setDoubleClicked,
  setTextSettingsVisible,
  setImageSettingsVisible,
  setVideoSettingsVisible,
  setCodeSettingsVisible,
  setObjectDoubleClicked
}) {
  const [lastClickTime, setLastClickTime] = useState(0); 
  const videoRef = useRef(null);
  	useEffect(() => {
    const handleDoubleClick = () => {
      const currentTime = new Date().getTime();
      
      if (currentTime - lastClickTime < 500) {
        setDoubleClicked(true); 
        setImageSettingsVisible(false); 
        setTextSettingsVisible(false);
        setVideoSettingsVisible(true);
        setCodeSettingsVisible(false);
        setObjectDoubleClicked(video.id);
      }

      setLastClickTime(currentTime);
    };
    const currentTextRef = videoRef.current;
    currentTextRef.addEventListener('click', handleDoubleClick);

    return () => {
      window.removeEventListener('click', handleDoubleClick);
    };
  }, [lastClickTime]);

  const autoPlay = video.autoPlay;

  return (
    <>
      <VideoPlayer ref={videoRef}
        style={{
          position: "absolute",
          margin: '0',
          top: video.top,
          left: video.left,
          width: video.width,
          height: video.height,

          boxSizing: 'border-box',
          cursor: 'pointer',
        }}>
        <iframe
          src={video.videoUrl}
          autoPlay={{autoPlay}}
          width='100%'
          height='100%'
          style={{border: 'none'}}
        ></iframe>
      </VideoPlayer>
    </>
  );
}

const VideoPlayer = styled.div`
	&:hover {
		border: 10px solid gray;
		borderRadius: 5px;
	}
`

export default VideoBlock;