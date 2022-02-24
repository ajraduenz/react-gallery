import React from 'react';
import useWindowDimensions from '../hooks/useWindowDimension';
import RowGallery from './RowGallery';
import './gallery.css';
import background from '../images/background-texture.jpg'

const Gallery = () => {

  const rowGallery = React.useRef();
  const { innerWidth } = useWindowDimensions();
  const [posYGaleria, setPosYGaleria] = React.useState(0);
  const [heightComponent, setHeightComponent] = React.useState(0);
  const [highlight, setHighlight] = React.useState({ x: 0, y: 0 });
  const [lastKey, setLastKey] = React.useState('');

  // Array de elementos
  const [elementsY, setElementsY] = React.useState([
    { key: 1, title: 'Life', ativo: false },
    { key: 2, title: 'Wonder', ativo: false },
    { key: 3, title: 'Organization', ativo: false },
  ]);

  // Novas imagens:
  // https://i.picsum.photos/id/605/300/200.jpg?hmac=31cga_PYIOnSOpQxNJ-GL9mTctI7kUhKkpnn23MPiSc
  // https://i.picsum.photos/id/64/300/200.jpg?hmac=bsd1bjq-Md2Sb-zhI1f_fc9xGY1jnw5_0T07F3eZqOo
  // https://i.picsum.photos/id/423/300/200.jpg?hmac=sh-E4EaAaqCYPgyyAcuwMMRgc4b96HW27ph2F-Bm8lc
  // https://i.picsum.photos/id/0/300/200.jpg?hmac=qPTvURjzRq35DI4OD_cOli0W3KL2YowI7_hiVIvXulQ
  // https://i.picsum.photos/id/945/300/200.jpg?hmac=7nDPKpvlnFh1Zerl89ne5L_R3diCMyluZvraLl0pabk
  // https://i.picsum.photos/id/876/300/200.jpg?hmac=8UujDKOEz1cEpCX6yfGDJQIj0kACqA--5nyTQhQtFic
  // https://i.picsum.photos/id/873/300/200.jpg?hmac=ovJ-oryF0lV_gEOk4vy4Yf4x-Y7gIsxFl6FwbHf86h0

  const [elementsX, setElementsX] = React.useState([
    { key: 1, image: 'https://i.picsum.photos/id/874/300/200.jpg?hmac=-XtbXzmuqbXQ81WxvxnamQ4qygehIY8GwoWYe8kJjbM', ativo: true, page: 'play-mario-game' },
    { key: 2, image: 'https://i.picsum.photos/id/888/300/200.jpg?hmac=w2PRsL9__qK-Mnif6IwdjN06zIyX7GvfjWu63SxkQfA', ativo: false, page: 'x' },
    { key: 3, image: 'https://i.picsum.photos/id/38/300/200.jpg?hmac=J6kFRQ3kUJHnYjsZM8hNXgpKboaGz-f84iM20tJp4Iw', ativo: false, page: 'x' },
    { key: 4, image: 'https://i.picsum.photos/id/807/300/200.jpg?hmac=gWP12VdF9_c6OalRsEc0yo3dhDQ5MxQuP-mTfY8UEXI', ativo: false, page: 'x' },
    { key: 5, image: 'https://i.picsum.photos/id/184/300/200.jpg?hmac=Q8wXFeV1BL38zfE0AWqO5iJp2ymVllNAV-6ieJZL4LU', ativo: false, page: 'x' },
  ]);

  // Verifica qual tecla for pressionada

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
  // Adiciona função de detectar teclado
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

  return (
    <div className='bg-cover w-screen h-screen overflow-hidden' style={{ backgroundImage: `url(${background})` }}>
      <div
        className='ml-8'
        style={{
          transform: `translateY(${posYGaleria}px)`,
          transition: '1s',
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
    </div>
  );
};

export default Gallery;
