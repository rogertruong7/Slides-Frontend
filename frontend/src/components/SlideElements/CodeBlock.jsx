import { useState, useRef, useEffect } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import hljs from "highlight.js";

function CodeBlock({
  code,
  setDoubleClicked,
  setTextSettingsVisible,
  setObjectDoubleClicked,
  setImageSettingsVisible,
  setVideoSettingsVisible,
  setCodeSettingsVisible,
}) {
  const [lastClickTime, setLastClickTime] = useState(0); 
  const codeRef = useRef(null);
  const [detectedLanguage, setDetectedLanguage] = useState("plaintext");

  useEffect(() => {
    const autoDetectLanguage = () => {
      const detected = hljs.highlightAuto(code.content).language;
      setDetectedLanguage(detected || "plaintext");
    };

    autoDetectLanguage();
  }, [code.content]);


  useEffect(() => {
    const handleDoubleClick = () => {
      const currentTime = new Date().getTime();
			
      if (currentTime - lastClickTime < 500) {
        setDoubleClicked(true); 
        setImageSettingsVisible(false); 
        setTextSettingsVisible(false);
        setVideoSettingsVisible(false);
        setCodeSettingsVisible(true);
        setObjectDoubleClicked(code.id);
      }

      setLastClickTime(currentTime);
    };
    const currentCodeRef = codeRef.current;
    currentCodeRef.addEventListener('click', handleDoubleClick);

    return () => {
      if (currentCodeRef) {
        currentCodeRef.removeEventListener('click', handleDoubleClick);
      }
    };
  }, [lastClickTime]);

  return (
    <>
      <div ref={codeRef} style={{
        position: "absolute",
        margin: '0',
        width: code.width,
        height: code.height,
        top: code.top,
        left: code.left,
        boxSizing: 'border-box',
        pointerEvents: "all",
        cursor: 'pointer',
      }}>
        <SyntaxHighlighter 
          language={detectedLanguage}
          style={docco}
          customStyle={{
            padding: '5px',
            boxSizing: 'border-box',
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
            margin: '0',
            fontSize: code.fontSize,
            whiteSpace: "normal",
            overflow: "auto",
            wordWrap: "break-word",
          }}>{code.content}</SyntaxHighlighter>
      </div>
    </>
  );
}

export default CodeBlock;