import PageContainer from '@/shared/ui/PageContainer';
import Player from './player';
import {TimerPage} from './timer';

const Navigator = () => {
  return (
    <>
      <PageContainer>
        <div className="grid grid-cols-3 gap-5">
          <div className="">
            <Player />
          </div>
          <div className="flex flex-col items-center mt-16">
            <TimerPage />
          </div>
          <div className=""></div>
        </div>
      </PageContainer>
    </>
  );
};

export default Navigator;
