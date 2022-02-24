import React from 'react';

const RowGallery = ({ highlight, lastKey, title, ativo, elementsX, setElementsX }) => {
  const [posXGaleria, setPosXGaleria] = React.useState(0);

  React.useEffect(() => {
    if (ativo) {
      elementsX.forEach((cada, i) => {
        if (i === highlight.x) {
          cada.ativo = true;
        } else {
          cada.ativo = false;
        }
      });
      setElementsX([...elementsX]);
    }
  }, [highlight.x]);

  React.useEffect(() => {
    if (ativo) {
      if (highlight.x >= 4 && lastKey === 'ArrowRight' && highlight.x <= elementsX.length - 1) {
        setPosXGaleria(posXGaleria - 21.09374993);
      }
      if (highlight.x >= 3 && lastKey === 'ArrowLeft') {
        setPosXGaleria(posXGaleria + 21.09374993);
      }
      if (lastKey === 'ArrowDown' || lastKey === 'ArrowUp') {
        setPosXGaleria(0);
      }
    }
  }, [highlight.x]);

  return (
    <>
      <h2 className="text-white lg:text-3xl font-roboto lg:mt-8 lg:mb-6">{title}</h2>
      <ul style={{ transform: `translateX(${posXGaleria}vw)`, transition: '1s' }} className="flex x-gallery">
        {elementsX.map((cada) => {
          return (
            <li key={cada.key}>              
              <img
                src={cada.image}
                style={{ border: ativo && cada.ativo === true ? '5px solid gold' : '' }}
                className="gallery-each max-w-none"
                alt=""
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RowGallery;
