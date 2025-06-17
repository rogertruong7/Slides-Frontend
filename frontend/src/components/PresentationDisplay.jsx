import styled from 'styled-components';

const DisplayBox = styled.div`
    display: flex;
    align-items: center;
    width: 360px;
    height: 180px;
    margin-right: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.1);
		font-family: 'Poppins', sans-serif;
		cursor: pointer;

    &:hover {
      box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.2);
    }
`

function PresentationDisplay({presentation}) {
  const truncateText = (text, type) => {
    if (type === 'description') {
      return text.length > 90 ? text.slice(0, 90) + '...' : text;
    } else if (type === 'title') {
      return text.length > 24 ? text.slice(0, 24) + '...' : text;
    }
    return text; 
  }


  return (
    <>
      <DisplayBox>
        {presentation.thumbnail === '' ? (
          <div style={{minWidth: '180px', minHeight: '180px', backgroundColor: '#F1F1F1'}}></div>
        ) : (
          <div style={{minWidth: '180px', minHeight: '180px', backgroundColor: '#F1F1F1'}}>
            <img style={{
              maxWidth: '180px',
              maxHeight: '180px',
              width: '180px',
              height: '180px',
              objectFit: 'cover'
            }} src={presentation.thumbnail} alt="thumbnail" />
          </div>
        )}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          textAlign: 'left',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          justifyContent: 'flex-start',
          marginLeft: "10px",
          marginRight: "10px"
        }}>
          <b style={{ marginBottom: "10px", marginTop: '0' }}>
            {truncateText(presentation.name, "title")}
          </b>
          {presentation.description === '' ? (
            <br />
          ) : (
            <i style={{ margin: 0, whiteSpace: 'normal', fontSize: '14px' }}>
              {truncateText(presentation.description, "description")}
            </i>
          )}
          <p style={{ margin: 0, fontSize: '12px', whiteSpace: 'normal' }}>Slides: {presentation.numSlides}</p>
        </div>

      </DisplayBox>
    </>
  );
}

export default PresentationDisplay;