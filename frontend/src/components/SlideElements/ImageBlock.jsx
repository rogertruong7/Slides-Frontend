import { useState, useRef, useEffect } from "react";

function ImageBlock({
  image,
  setDoubleClicked,
  setTextSettingsVisible,
  setImageSettingsVisible,
  setVideoSettingsVisible,
  setCodeSettingsVisible,
  setObjectDoubleClicked
}) {
  const [lastClickTime, setLastClickTime] = useState(0); 
  const imageRef = useRef(null);
  useEffect(() => {
    const handleDoubleClick = () => {
      const currentTime = new Date().getTime();
      
      if (currentTime - lastClickTime < 500) {
        setDoubleClicked(true); 
        setImageSettingsVisible(true); 
        setTextSettingsVisible(false);
        setVideoSettingsVisible(false);
        setCodeSettingsVisible(false);
        setObjectDoubleClicked(image.id);
      }

      setLastClickTime(currentTime);
    };
    const currentTextRef = imageRef.current;
    currentTextRef.addEventListener('click', handleDoubleClick);

    return () => {
      window.removeEventListener('click', handleDoubleClick);
    };
  }, [lastClickTime]);

  return (
    <>
      <img 
        alt={image.altText}
        src={image.src}
        ref={imageRef}
        style={{
          position: "absolute",
          margin: '0',
          width: image.width,
          height: image.height,
          top: image.top,
          left: image.left,
          cursor: 'pointer',
        }}/>
    </>
  );
}

export default ImageBlock;