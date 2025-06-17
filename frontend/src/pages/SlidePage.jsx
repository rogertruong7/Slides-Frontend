import { useNavigate, useParams } from 'react-router-dom';
import {getUserData, putUserData} from '../components/ApiCalls.jsx'
import styled from 'styled-components';
import { Button as BaseButton } from '../styles/LoginRegister.jsx';
import DeletePresPopup from '../components/DeletePresPopup.jsx';
import DashboardSlideHeader from '../components/DashboardSlideHeader.jsx';
import EditThumbnailSection from '../components/EditPresentationData/EditThumbnailButton.jsx';
import SideBarSlide from '../components/SideBarSlide.jsx';
import NewSlideButton from '../components/NewSlideButton.jsx';
import Slide from '../components/Slide.jsx';
import { DeleteButton as DeleteBaseButton } from '../components/DashboardSlideHeader.jsx';
import DeleteSlidePopup from '../components/DeleteSlidePopup.jsx';
import EditDescriptionSection from '../components/EditPresentationData/EditDescriptionButton.jsx';
import TextSettings from '../components/SlideElements/TextSettings.jsx';
import ImageSettings from '../components/SlideElements/ImageSettings.jsx';
import VideoSettings from '../components/SlideElements/VideoSettings.jsx';
import CodeSettings from '../components/SlideElements/CodeSettings.jsx';
import ThemeModal from '../components/ThemeModal.jsx';
import Error from '../components/Error.jsx';
import { useState, useEffect } from 'react';

function SlidePage({token, setTokenFn}) {
  const { id, slideNumber } = useParams();
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState({});
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteSlideVisible, setDeleteSlideVisible] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(Number(slideNumber) || 1);
  const [settingsSideBar, setSettingsSideBar] = useState(false);
  const [textSettingsVisible, setTextSettingsVisible] = useState(false);
  const [imageSettingsVisible, setImageSettingsVisible] = useState(false);
  const [videoSettingsVisible, setVideoSettingsVisible] = useState(false);
  const [codeSettingsVisible, setCodeSettingsVisible] = useState(false);
  const [doubleClicked, setDoubleClicked] = useState(false);
  const [objectDoubleClicked, setObjectDoubleClicked] = useState('');
  const [selectedFont, setSelectedFont] = useState("Poppins");
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    navigate(`/${id}/edit/${selectedSlide}`, { replace: true });
  }, [selectedSlide, navigate]);

  useEffect(() => {
    setSettingsSideBar(false);
    setTextSettingsVisible(false);
    setImageSettingsVisible(false);
    setVideoSettingsVisible(false);
    setCodeSettingsVisible(false);
    setDoubleClicked(false);
  }, [isSidebarOpen])

  useEffect(() => {
    setSettingsSideBar(false);
    setTextSettingsVisible(false);
    setImageSettingsVisible(false);
    setVideoSettingsVisible(false);
    setCodeSettingsVisible(false);
    setDoubleClicked(false);
  }, [isSidebarOpen])
  
  useEffect(() => {
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const newPresentation = presentations.find(p => p.id === presentation.id);

        const slide = newPresentation.slides.find(s => s.slideNumber === selectedSlide);
        const text = slide.texts.find(t => t.id === objectDoubleClicked);

        if (text) {
          setSelectedFont(text.font);
        }
      });
  }, [objectDoubleClicked]);

  // Left and Right arrow keys
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft' && selectedSlide > 1) {
        setSelectedSlide(selectedSlide - 1);
      } else if (event.key === 'ArrowRight' && selectedSlide < presentation.numSlides) {
        setSelectedSlide(selectedSlide + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedSlide, presentation]);
  
  // turning off side bar when slide changes
  useEffect(() => {
    setSettingsSideBar(false);
    setTextSettingsVisible(false);
    setImageSettingsVisible(false);
    setVideoSettingsVisible(false);
    setCodeSettingsVisible(false);
    setDoubleClicked(false);
  }, [selectedSlide]);

  // Getting new data when refreshing
  useEffect(() => {
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const currPresentation = presentations.find(p => p.id === id);
        setPresentation(currPresentation);
        setLoading(false);
      })
      .catch((error) => {
        setErrorVisible(true);
        setErrorMessage(error.response.data.error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const newPresentation = presentations.find(p => p.id === presentation.id);

        const slide = newPresentation.slides.find(s => s.slideNumber === selectedSlide);
        const text = slide.texts.find(t => t.id === objectDoubleClicked);

        if (text) {
          text.font = event.target.value;
        }

        const data = {
          presentations: presentations
        }

        putUserData(token, data)
          .then(() => {
            setPresentation(newPresentation);
          })
          .catch((error) => {
            setErrorVisible(true);
            setErrorMessage(error.response.data.error);
          });
      })
      .catch((error) => {
        setErrorVisible(true);
        setErrorMessage(error.response.data.error);
      });
  };

  return (
    <>
      {errorVisible && (
        <Error setErrorVisible={setErrorVisible} errorMessage={errorMessage} errorStatus={'403'} /> 
      )}
      <DashboardSlideHeader token={token} setToken={setTokenFn} presentation={presentation} setPresentation={setPresentation} deleteVisible={deleteVisible} setDeleteVisible={setDeleteVisible}/>
      {deleteVisible && (
        <DeletePresPopup token={token} setDeleteVisible={setDeleteVisible} presentationId={presentation.id}></DeletePresPopup>
      )}
      {deleteSlideVisible && (
        <DeleteSlidePopup token={token} setDeleteVisible={setDeleteSlideVisible} setPresentation={setPresentation} setSelectedSlide={setSelectedSlide} slideNumber={selectedSlide} presentationId={presentation.id}></DeleteSlidePopup>
      )}
      {themeModalVisible && (
        <ThemeModal token={token} setThemeModalVisible={setThemeModalVisible} setPresentation={setPresentation} presentationId={presentation.id} slideNumber={selectedSlide}/>
      )}
      <MenuBar>
        <div style={{display: 'flex'}}>
          <EditThumbnailSection token={token} presentation={presentation}/>
          <EditDescriptionSection token={token} presentation={presentation}/>
        </div>
        <EditMenuContainer>
          {doubleClicked && textSettingsVisible && (
            <MenuDropdown value={selectedFont} onChange={handleFontChange}>
              <option value="Roboto">Roboto</option>
              <option value="Arial">Arial</option>
              <option value="Poppins">Poppins</option>
            </MenuDropdown>
          )}
          <MenuButton onClick={() => {
            setSettingsSideBar(true);
            setTextSettingsVisible(true);
            setImageSettingsVisible(false);
            setVideoSettingsVisible(false);
            setCodeSettingsVisible(false);
            setDoubleClicked(false);
          }}>+ Text</MenuButton>
          <MenuButton onClick={() => {
            setSettingsSideBar(true);
            setTextSettingsVisible(false);
            setImageSettingsVisible(true);
            setVideoSettingsVisible(false);
            setCodeSettingsVisible(false);
            setDoubleClicked(false);
          }}>+ Image</MenuButton>
          <MenuButton onClick={() => {
            setSettingsSideBar(true);
            setTextSettingsVisible(false);
            setImageSettingsVisible(false);
            setVideoSettingsVisible(true);
            setCodeSettingsVisible(false);
            setDoubleClicked(false);
          }}>+ Video</MenuButton>
          <MenuButton onClick={() => {
            setSettingsSideBar(true);
            setTextSettingsVisible(false);
            setImageSettingsVisible(false);
            setVideoSettingsVisible(false);
            setCodeSettingsVisible(true);
            setDoubleClicked(false);
          }}>+ Code</MenuButton>
          <MenuButton style={{width: '100px'}} onClick={() => {
            setThemeModalVisible(true);
          }}>Change Theme</MenuButton>
          <a
            href={`/${presentation.id}/preview/${selectedSlide}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{textDecoration: 'none'}}
          >
            <MenuButton style={{ width: "100px" }}>Preview</MenuButton>
          </a>
          {presentation.numSlides > 1 && (
            <>
              <DeleteBaseButton onClick={() => {setDeleteSlideVisible(!deleteSlideVisible)}}>Delete Slide</DeleteBaseButton>
            </>
          )}
        </EditMenuContainer>

      </MenuBar>
      {/* Main section */}
      <div style={{ display: "flex", marginTop: '60px', height: 'calc(100vh - 130px)'}}>
        
        {/* Sidebar */}
        <ToggleButton className={isSidebarOpen ? 'closed' : ''} onClick={toggleSidebar}>
          {isSidebarOpen ? '>' : '<'}
        </ToggleButton>
        <SidebarContainer className={isSidebarOpen ? 'open' : ''}>
          <div style={{margin: '20px'}}>Slides</div>
          <div style={{marginBottom: '80px'}}>
            {presentation.slides.length > 0 && (
              presentation.slides.map((slide, index) => (
                <div key={index}>
                  <SideBarSlide 
                    slide={slide} 
                    selectedSlide={selectedSlide}
                    setSelectedSlide={setSelectedSlide}
                  />
                </div>
              ))
            )}
          </div>
        </SidebarContainer>

        <SlideContainer>
          {/* Slide */}
          <SlideSubContainer>
            <Slide 
              defaultTheme={presentation.defaultTheme}
              slide={presentation.slides.find(s => s.slideNumber === selectedSlide)}
              setDoubleClicked={setDoubleClicked}
              setTextSettingsVisible={setTextSettingsVisible}
              setImageSettingsVisible={setImageSettingsVisible}
              setVideoSettingsVisible={setVideoSettingsVisible}
              setCodeSettingsVisible={setCodeSettingsVisible}
              setObjectDoubleClicked={setObjectDoubleClicked}
            />
            <div>
              {presentation.numSlides > 1 && selectedSlide !== 1 && (
                <BaseButton style={{margin: '20px'}} type='button'
                  onClick={() => {setSelectedSlide(selectedSlide - 1)}}>{"<"}</BaseButton>
              )}
              {presentation.numSlides > 1 && selectedSlide !== presentation.numSlides && (
                <BaseButton style={{margin: '20px'}} type='button'
                  onClick={() => {setSelectedSlide(selectedSlide + 1)}}>{">"}</BaseButton>
              )}
            </div>
          </SlideSubContainer>
          {/* Side bar for text/images/video etc */}
          {(doubleClicked || settingsSideBar) && (
            <AddElementSidebar>
              <CloseButton onClick={() => {
                setSettingsSideBar(false);
                setTextSettingsVisible(false);
                setImageSettingsVisible(false);
                setVideoSettingsVisible(false);
                setDoubleClicked(false);
              }}>×</CloseButton>
              {(textSettingsVisible) && (
                <>
                  <TextSettings 
                    token={token}
                    setTextSettingsVisible={setTextSettingsVisible}
                    setSettingsSideBar={setSettingsSideBar}
                    setPresentation={setPresentation}
                    slideNumber={selectedSlide}
                    presentationId={presentation.id}
                    doubleClicked={doubleClicked}
                    setDoubleClicked={setDoubleClicked}
                    objectDoubleClicked={objectDoubleClicked}
                  />
                </>
              )}
              {imageSettingsVisible && (
                <>
                  <ImageSettings 
                    token={token}
                    setImageSettingsVisible={setImageSettingsVisible}
                    setSettingsSideBar={setSettingsSideBar}
                    setPresentation={setPresentation}
                    slideNumber={selectedSlide}
                    presentationId={presentation.id}
                    doubleClicked={doubleClicked}
                    setDoubleClicked={setDoubleClicked}
                    objectDoubleClicked={objectDoubleClicked}
                  />
                </>
              )}
              {videoSettingsVisible && (
                <>
                  <VideoSettings 
                    token={token}
                    setVideoSettingsVisible={setVideoSettingsVisible}
                    setSettingsSideBar={setSettingsSideBar}
                    setPresentation={setPresentation}
                    slideNumber={selectedSlide}
                    presentationId={presentation.id}
                    doubleClicked={doubleClicked}
                    setDoubleClicked={setDoubleClicked}
                    objectDoubleClicked={objectDoubleClicked}
                  />
                </>
              )}
              {codeSettingsVisible && (
                <>
                  <CodeSettings 
                    token={token}
                    setCodeSettingsVisible={setCodeSettingsVisible}
                    setSettingsSideBar={setSettingsSideBar}
                    setPresentation={setPresentation}
                    slideNumber={selectedSlide}
                    presentationId={presentation.id}
                    doubleClicked={doubleClicked}
                    setDoubleClicked={setDoubleClicked}
                    objectDoubleClicked={objectDoubleClicked}
                  />
                </>
              )}
            </AddElementSidebar>
          )}
        </SlideContainer>
      </div>
      <NewSlideButton isSidebarOpen={isSidebarOpen} token={token} presentation={presentation} setPresentation={setPresentation}/>
    </>
  );
}

const MenuButton = styled(BaseButton)`
  height: 60px;
  border-radius: 0px;
  background-color: #FDFDFD;
  border: 1px solid #DADADA;
  width: 70px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;

  &:hover {
    background-color: #BABABA;
  }
`;


const MenuDropdown = styled.select`
  height: 60px;
  border-radius: 0px;
  background-color: #FDFDFD;
  border: 1px solid #DADADA;
  width: 120px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;

  &:hover {
    background-color: #BABABA;
  }

  & option {
    background-color: #FDFDFD;
    padding: 20px;
  }
`;


const EditMenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
    gap: 2px;
`;

const CloseButton = styled.button`
  position: absolute;
  left: 0;
  background-color: red;
  color: white;
  font-size: 20px;
  border: none;
  z-index: 400;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

export const SettingsButton = styled(BaseButton)`
  margin-right: 10px;
  background-color: #068891;
  text-align: center;
  width: 120px;
  padding-top: 5px;
  padding-bottom: 5px;

  &:hover {
    background-color: #04757D;
  }
`

export const MenuBar = styled.div`
  box-sizing: border-box;
  height: 60px;
  width: 100%;
  background-color: #FDFDFD;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #DADADA;
  position: absolute;
  z-index: 1000;
  padding-left: 20px;
  padding-right: 20px;
  overflow: auto;
`;

const AddElementSidebar = styled.div`
  right: 0;
  font-family: 'Poppins', sans-serif;
  height: 100%;
  top: 0;
  width: 300px;
  background-color: #FDFDFD;
  z-index: 0;
  position: relative;
  margin-left: auto;
	border-left: 1px solid #DADADA;
	display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
`

export const DeleteButton = styled.button`
  padding: 8px 16px;
  background-color: #ff4d4d;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  border-radius: 4px;
  margin-right: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cc0000;
  }
`;

export const SlideContainer = styled.div`
  position: relative;
  flex: 1;
  background-color: #FDFDFD;
  width: calc(100% - 250px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SlideSubContainer = styled.div`
  position: relative;
  flex: 1;
  background-color: #FDFDFD;
  width: calc(100% - 550px);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SidebarContainer = styled.div`
	font-family: 'Poppins', sans-serif;
  height: 100%;
  top: 0;
  width: 250px;
  background-color: #F2F2F2;
  z-index: 0;
  
	border-right: 1px solid #DADADA;
	display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  margin-bottom: 60px;
  transition: left 0.3s ease-in-out;

  &.open {
    position: fixed;
  }

  @media (min-width: 731px) {
    left: 0px;
    box-shadow: none;
  }

`;

const ToggleButton = styled.button`
  position: fixed;
  top: 300px;
  left: 250px;
  z-index: 100;
  padding: 10px 15px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &.closed {
    left: 0px;
  }
`;

export default SlidePage;