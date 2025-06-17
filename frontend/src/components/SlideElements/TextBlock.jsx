import { useState, useRef, useEffect } from "react";

function TextBlock({
  text,
  setDoubleClicked,
  setTextSettingsVisible,
  setObjectDoubleClicked,
  setImageSettingsVisible,
  setVideoSettingsVisible,
  setCodeSettingsVisible,
}) {
  const [lastClickTime, setLastClickTime] = useState(0); 
  const textRef = useRef(null);
  useEffect(() => {
    const handleDoubleClick = () => {
      const currentTime = new Date().getTime();
      
      if (currentTime - lastClickTime < 500) {
        setDoubleClicked(true); 
        setImageSettingsVisible(false); 
        setTextSettingsVisible(true);
        setVideoSettingsVisible(false);
        setCodeSettingsVisible(false);
        setObjectDoubleClicked(text.id);
      }

      setLastClickTime(currentTime);
    };
    const currentTextRef = textRef.current;
    currentTextRef.addEventListener('click', handleDoubleClick);

    return () => {
      window.removeEventListener('click', handleDoubleClick);
    };
  }, [lastClickTime]);

  return (
    <>
      <div ref={textRef}
        style={{
          padding: '5px',
          boxSizing: 'border-box',
          position: "absolute",
          backgroundColor: 'white',
          border: '1px solid #BABABA',
          margin: '0',
          width: text.width,
          height: text.height,
          top: text.top,
          left: text.left,
          fontFamily: `"${text.font}", sans-serif`,
          color: text.colour,
          fontSize: text.fontSize,
          whiteSpace: "normal",
      	overflow: "hidden",
          wordWrap: "break-word",
          cursor: 'pointer',
        }}>{text.content}</div>
    </>
  );
}

export default TextBlock;