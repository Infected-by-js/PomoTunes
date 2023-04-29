import {PageContainer} from '@/shared/components';
import bgVideo from '@/assets/videos/desk.mp4';

const MainPage = () => {
  return (
    <>
      <PageContainer bgLink={bgVideo} bgType="video">
        {/* header */}
        <div className="fixed w-screen top-6 z-10">
          <div className="grid grid-cols-3 mx-12">
            <div className="col-start-2 flex items-center justify-center space-x-2">
              <button>0</button>
              <button>0</button>
              <button>0</button>
            </div>

            <div className="flex justify-center items-center">
              <div className="transition-all duration-300 ease-in hover:opacity-50 ">
                theme
              </div>
              <button className="text-white font-bold text-lg mx-2">bgs</button>
              <button className="text-white font-bold text-lg mx-2">full_screen</button>
            </div>
          </div>
        </div>

        {/* body */}
        <div className="fixed max-h-screen top-28 left-1/2 z-10 transform -translate-x-1/2">
          <div className="p-4 bg-primary">adsa</div>
        </div>

        {/* footer */}
        <div className="fixed bottom-6 w-screen flex justify-center items-center">
          <div className="flex justify-center items-center text-white">footer</div>
        </div>
      </PageContainer>
    </>
  );
};

export default MainPage;
