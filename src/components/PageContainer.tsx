import {FC, PropsWithChildren} from 'react';

interface Props extends PropsWithChildren {}

const Container: FC<Props> = ({children}) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow bg-accent-100 dark:bg-accent-900 transition-colors ease-in duration-100">
        <div className="h-full max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
};

export default Container;
