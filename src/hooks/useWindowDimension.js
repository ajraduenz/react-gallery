import React from 'react'

function getWindowDimensions() {
  const { innerWidth, innerHeight } = window;

  return {
    innerWidth, innerHeight
  };
}
export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}