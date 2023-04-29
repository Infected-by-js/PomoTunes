import {FC, PropsWithChildren} from 'react';

interface Props extends PropsWithChildren {
  bgType?: 'video' | 'image';
  bgLink: string;
}

const Container: FC<Props> = ({bgType = 'video', bgLink, children}) => {
  const bgClasses =
    'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full min-h-full object-cover lg:aspect-video';

  return (
    <div className="relative min-h-screen bg-black/75">
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
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
