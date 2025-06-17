import React, { useState } from 'react';
import { HomepageContainer, Tagline, Description } from '../styles/HomepageStyles.jsx';
import { BackgroundContainer } from '../styles/LoginRegister.jsx';

function Homepage() {
  const [slidein, setSlideIn] = useState(false);

  React.useEffect(() => {
    setSlideIn(true);
  }, []);

  const slideStyles = {
    transform: slidein ? "translateX(0)" : "translateX(-100%)",
    opacity: slidein ? 1 : 0,
    transition: "all 1s ease"
  };

  return (
    <>
      <BackgroundContainer>
        <HomepageContainer style={slideStyles} data-testid="homepage__container">
          <Tagline id="homepage__tagline">And... Presto!</Tagline>
          <Description id="homepage__description">Your slides are your command.</Description>
          <p>Sign up or Login today.</p>
        </HomepageContainer>
      </BackgroundContainer>
    </>
  );
}

export default Homepage;