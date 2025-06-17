import styled from 'styled-components';
import TextBlock from './SlideElements/TextBlock';
import ImageBlock from './SlideElements/ImageBlock';
import VideoBlock from './SlideElements/VideoBlock';
import CodeBlock from './SlideElements/CodeBlock';

function Slide({
  slide,
  defaultTheme,
  setDoubleClicked,
  setTextSettingsVisible,
  setImageSettingsVisible,
  setVideoSettingsVisible,
  setCodeSettingsVisible,
  setObjectDoubleClicked,
}) {
  if (slide === null) {
    return;
  }

  const slideThemeStyle = {};

  if (defaultTheme !== "" && slide.theme === '') {
    if (defaultTheme.type === "solid") {
      slideThemeStyle.backgroundColor = defaultTheme.value;
    } else if (defaultTheme.type === "gradient") {
      slideThemeStyle.background = defaultTheme.value;
    } else if (defaultTheme.type === "image") {
      slideThemeStyle.backgroundImage = `url(${defaultTheme.value})`;
      slideThemeStyle.backgroundSize = "cover";
      slideThemeStyle.backgroundPosition = "center";
    }
  } else if (slide.theme !== '') {
    if (slide.theme.type === "solid") {
      slideThemeStyle.backgroundColor = slide.theme.value;
    } else if (slide.theme.type === "gradient") {
      slideThemeStyle.background = slide.theme.value;
    } else if (slide.theme.type === "image") {
      slideThemeStyle.backgroundImage = `url(${slide.theme.value})`;
      slideThemeStyle.backgroundSize = "cover";
      slideThemeStyle.backgroundPosition = "center";
    }
  }

  return (
    <>
      <SlideItem style={slideThemeStyle}>
        {slide.texts.length > 0 && (
          slide.texts.map((text, index) => (
            <TextBlock 
              key={index}
              text={text}
              setDoubleClicked={setDoubleClicked}
              setTextSettingsVisible={setTextSettingsVisible}
              setImageSettingsVisible={setImageSettingsVisible}
              setVideoSettingsVisible={setVideoSettingsVisible}
              setCodeSettingsVisible={setCodeSettingsVisible}
              setObjectDoubleClicked={setObjectDoubleClicked}
            />
          ))
        )}
        {slide.images.length > 0 && (
          slide.images.map((image, index) => (
            <ImageBlock 
              key={index}
              image={image}
              setDoubleClicked={setDoubleClicked}
              setTextSettingsVisible={setTextSettingsVisible}
              setImageSettingsVisible={setImageSettingsVisible}
              setVideoSettingsVisible={setVideoSettingsVisible}
              setCodeSettingsVisible={setCodeSettingsVisible}
              setObjectDoubleClicked={setObjectDoubleClicked}
            />
          ))
        )}
        {slide.videos.length > 0 && (
          slide.videos.map((video, index) => (
            <VideoBlock 
              key={index}
              video={video}
              setDoubleClicked={setDoubleClicked}
              setTextSettingsVisible={setTextSettingsVisible}
              setImageSettingsVisible={setImageSettingsVisible}
              setVideoSettingsVisible={setVideoSettingsVisible}
              setCodeSettingsVisible={setCodeSettingsVisible}
              setObjectDoubleClicked={setObjectDoubleClicked}
            />
          ))
        )}
        {slide.codes.length > 0 && (
          slide.codes.map((code, index) => (
            <CodeBlock 
              key={index}
              code={code}
              setDoubleClicked={setDoubleClicked}
              setTextSettingsVisible={setTextSettingsVisible}
              setImageSettingsVisible={setImageSettingsVisible}
              setVideoSettingsVisible={setVideoSettingsVisible}
              setCodeSettingsVisible={setCodeSettingsVisible}
              setObjectDoubleClicked={setObjectDoubleClicked}
            />
          ))
        )}
        <SlidePageNumber>{slide.slideNumber}</SlidePageNumber>
      </SlideItem>
    </>
  );
}

const SlidePageNumber = styled.p`
	position: absolute;
	bottom: 0;
	left: 0;
	padding-left: 20px;
	z-index: 100;
	font-size: 1em;
`

const SlideItem = styled.div`
	position: relative;
	font-family: 'Poppins', sans-serif;
  width: 75%;
  max-width: 1100px;
  aspect-ratio: 16 / 9;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #DADADA;
	margin-left: 30px;
	margin-right: 30px;
`;

export default Slide;