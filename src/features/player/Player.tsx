import {FC} from 'react';
import {TbChevronUp, TbSearch} from 'react-icons/tb';
import {usePlayer} from './hooks/usePlayer';
import image from '@/assets/videos/roof.jpg';

interface Props {}

const Player: FC<Props> = ({}) => {
  const videoId = 'DgVML3MnpKw';
  const {isReady, onPlayerReady} = usePlayer();

  return (
    <div>
      <div className="w-80 h-48 p-1 bg-black/75 rounded-lg">
        <img src={image} alt="image" className="h-full w-full" />
      </div>
      {/* <Youtube
          videoId={videoId}
          onReady={onPlayerReady}
          className={clsx('w-full h-full', isReady ? 'block' : 'none')}
          iframeClassName="w-full h-full"
          opts={{
            playerVars: {
              autoplay: 0,
              controls: 0,
              modestbranding: 1,
              playsinline: 1,
              rel: 0,
              showinfo: 0,
            },
          }}
        /> */}

      <div className="mt-1 flex items-center space-x-4 bg-black/75 px-2 py-1 rounded-lg text-[10px] justify-between text-white w-80">
        <button className="outline-none">
          <TbChevronUp size={20} />
        </button>
        <span className="truncate">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam tempore
          facilis atque sapiente eligendi officiis culpa ut? Voluptatum doloremque quo velit
          soluta placeat necessitatibus sunt magnam molestias facilis illo?
        </span>
        <button className="outline-none">
          <TbSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default Player;
