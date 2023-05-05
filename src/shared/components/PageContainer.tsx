import {FC, PropsWithChildren} from 'react';

interface Props extends PropsWithChildren {
  bgType?: 'video' | 'image';
  bgLink: string;
}

const Container: FC<Props> = ({bgType = 'video', bgLink, children}) => {
  const bgClasses =
    'fixed top-0 left-0 right-0 bottom-0 w-full h-full object-cover lg:aspect-video';

  return (
    <div className="relative min-h-screen bg-black/75">
      <div className="absolute inset-0">
        <div className="relative w-full h-full pointer-events-none">
          <div className={'absolute inset-0 transition-opacity duration-500 ease-in-out'}>
            {bgType === 'video' ? (
              <video src={bgLink} className={bgClasses} autoPlay muted loop playsInline />
            ) : (
              <img src={bgLink} className={bgClasses} />
            )}
          </div>
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default Container;
