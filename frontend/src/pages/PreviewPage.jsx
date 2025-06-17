import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {getUserData} from '../components/ApiCalls.jsx'
import PreviewSlide from '../components/PreviewSlide.jsx';
import Error from '../components/Error.jsx';

function PreviewPage({token}) {
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const statePresentation = location.state?.presentation;
  const [presentation, setPresentation] = useState(statePresentation || {});
  const { id, slideNumber } = useParams();
  const [selectedSlide, setSelectedSlide] = useState(Number(slideNumber) || 1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigate(`/${id}/preview/${selectedSlide}`, { replace: true });
  }, [selectedSlide, navigate]);

	
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
  

  // Getting new data when refreshing
  useEffect(() => {
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const currPresentation = presentations.find(p => p.id === id);
        setPresentation(currPresentation);
        setLoading(false);
      })
      .catch(() => {
        setErrorVisible(true);
        setErrorMessage('Failed Register.');
      })
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {errorVisible && (
        <Error setErrorVisible={setErrorVisible} errorMessage={errorMessage} errorStatus={'403'} /> 
      )}
      <PreviewSlide 
        defaultTheme={presentation.defaultTheme}
        slide={presentation.slides.find(s => s.slideNumber === selectedSlide)}
      />
    </>
  );
}

export default PreviewPage;