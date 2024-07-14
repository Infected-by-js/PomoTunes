import {FC, PropsWithChildren} from 'react';

interface Props extends PropsWithChildren {
  background: string;
}

const Container: FC<Props> = ({background, children}) => {
  return (
    <div className="relative min-h-screen bg-black/75">
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <div className={'absolute inset-0 transition-opacity duration-500 ease-in-out'}>
            <img
              src={background}
              className="fixed top-0 left-0 right-0 bottom-0 w-full h-full object-cover lg:aspect-video pointer-events-none select-none"
            />
          </div>
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default Container;
