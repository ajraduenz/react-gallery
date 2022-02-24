import React from 'react';
import useWindowDimensions from '../hooks/useWindowDimension';
import RowGallery from './RowGallery';
import './gallery.css';

const Gallery = ({ className, style }) => {

  const rowGallery = React.useRef();
  const { innerWidth } = useWindowDimensions();
  const [posYGaleria, setPosYGaleria] = React.useState(0);
  const [heightComponent, setHeightComponent] = React.useState(0);
  const [highlight, setHighlight] = React.useState({ x: 0, y: 0 });
  const [lastKey, setLastKey] = React.useState('');

  const [elementsY, setElementsY] = React.useState([
    { key: 1, title: 'Productivity', ativo: false },
    { key: 2, title: 'Organization', ativo: false },
    { key: 3, title: 'Organization', ativo: false },
    { key: 4, title: 'Organization', ativo: false },
  ]);

  const [elementsX, setElementsX] = React.useState([
    { key: 1, image: 'https://i.picsum.photos/id/874/300/200.jpg?hmac=-XtbXzmuqbXQ81WxvxnamQ4qygehIY8GwoWYe8kJjbM', ativo: true, page: 'play-mario-game' },
    { key: 2, image: 'https://i.picsum.photos/id/888/300/200.jpg?hmac=w2PRsL9__qK-Mnif6IwdjN06zIyX7GvfjWu63SxkQfA', ativo: false, page: 'x' },
    { key: 3, image: 'https://i.picsum.photos/id/38/300/200.jpg?hmac=J6kFRQ3kUJHnYjsZM8hNXgpKboaGz-f84iM20tJp4Iw', ativo: false, page: 'x' },
    { key: 4, image: 'https://i.picsum.photos/id/807/300/200.jpg?hmac=gWP12VdF9_c6OalRsEc0yo3dhDQ5MxQuP-mTfY8UEXI', ativo: false, page: 'x' },
    { key: 5, image: 'https://i.picsum.photos/id/184/300/200.jpg?hmac=Q8wXFeV1BL38zfE0AWqO5iJp2ymVllNAV-6ieJZL4LU', ativo: false, page: 'x' },
  ]);

  function handleUserKeyPressDown(event) {
    const { key } = event;
    setLastKey(key);
    if (key === 'ArrowRight' && highlight.x <= elementsX.length - 2) {
      setHighlight({ ...highlight, x: highlight.x + 1 });
    }
    if (key === 'ArrowLeft' && highlight.x >= 1) {
      setHighlight({ ...highlight, x: highlight.x - 1 });
    }
    if (key === 'ArrowDown' && highlight.y <= elementsY.length - 2) {
      setHighlight({ x: 0, y: highlight.y + 1 });
      setPosYGaleria(posYGaleria - heightComponent);
    }
    if (key === 'ArrowUp' && highlight.y >= 1) {
      setHighlight({ x: 0, y: highlight.y - 1 });
      setPosYGaleria(posYGaleria + heightComponent);
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPressDown);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPressDown);
    };
  }, [handleUserKeyPressDown]);

  React.useEffect(() => {
    if (rowGallery.current) {
      setHeightComponent(rowGallery.current.clientHeight);
    }
  }, [innerWidth]);

  React.useEffect(() => {
    elementsY.forEach((cada, i) => {
      if (i === highlight.y) {
        cada.ativo = true;
      } else {
        cada.ativo = false;
      }
    });
    setElementsY([...elementsY]);
  }, [highlight.y]);


  const isFirstRun = React.useRef(true);

  // React.useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     return;
  //   }

  //   setLastKey(command.key);
  //   if (command.keyCode === 39 && highlight.x <= elementsX.length - 2) {
  //     setHighlight({ ...highlight, x: highlight.x + 1 });
  //   }
  //   if (command.keyCode === 37 && highlight.x >= 1) {
  //     setHighlight({ ...highlight, x: highlight.x - 1 });
  //   }
  //   // Enter:
  //   if (command.keyCode === 13) { 
  //     const pageActive = elementsX.find((cada) => cada.ativo === true);
  //   }
  // }, [command]);

  return (
    <div
      className={className}
      style={{
        transform: `translateY(${posYGaleria}px)`,
        transition: '1s',
        ...style,
      }}
    >
      {elementsY.map((cada, i) => {
        return (
          <div key={cada.key} ref={rowGallery}>
            <RowGallery
              elementsX={elementsX}
              setElementsX={setElementsX}
              title={cada.title}
              ativo={cada.ativo}
              highlight={highlight}
              lastKey={lastKey}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
