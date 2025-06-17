import styled from 'styled-components';
import TextBlock from './SlideElements/TextBlock';
import ImageBlock from './SlideElements/ImageBlock';
import VideoBlock from './SlideElements/VideoBlock';
import CodeBlock from './SlideElements/CodeBlock';

function PreviewSlide({
  slide,
  defaultTheme,
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

      <SlideItem id="Slideitem" style={slideThemeStyle}>
        

        {slide.texts.length > 0 && (
          slide.texts.map((text, index) => (
            <TextBlock 
              key={index}
              text={text}
            />
          ))
        )}
        {slide.images.length > 0 && (
          slide.images.map((image, index) => (
            <ImageBlock 
              key={index}
              image={image}
            />
          ))
        )}
        {slide.videos.length > 0 && (
          slide.videos.map((video, index) => (
            <VideoBlock 
              key={index}
              video={video}
            />
          ))
        )}
        {slide.codes.length > 0 && (
          slide.codes.map((code, index) => (
            <CodeBlock 
              key={index}
              code={code}
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
  position: absolute;
	font-family: 'Poppins', sans-serif;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default PreviewSlide;