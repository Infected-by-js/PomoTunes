import {FC, useEffect} from 'react';
import clsx from 'clsx';
import YouTubePlayer from 'react-youtube';
import {useUndoState} from '@/shared/hooks';
import eventBus from '@/shared/lib/event-bus';
import SearchForm from './components/SearchForm';
import Toolbar from './components/Toolbar';
import {usePlayer} from './hooks/usePlayer';
import {PLAYER_OPTIONS} from './utils/constants';

type Status = 'VIDEO_SHOW' | 'VIDEO_HIDE' | 'VIDEO_SEARCH';
interface Props {
  videoId: string;
  onChangeVideoId: (videoId: string) => void;
}

const Player: FC<Props> = ({videoId, onChangeVideoId}) => {
  const {isReady, title, play, pause, setVolume, onPlayerReady, onPlayerEnd} = usePlayer();
  const [status, setStatus, undoStatus] = useUndoState<Status>('VIDEO_HIDE');

  const toggleOpenPlayer = () => {
    setStatus((prev) => {
      if (prev === 'VIDEO_SHOW') return 'VIDEO_HIDE';
      if (prev === 'VIDEO_HIDE') return 'VIDEO_SHOW';
      return prev;
    });
  };

  const submitSearchVideo = (id: string) => {
    onChangeVideoId(id);
    setStatus('VIDEO_SHOW');
  };

  useEffect(() => {
    const playCleanUp = eventBus.startTimer.subscribe(play);
    const pauseCleanUp = eventBus.pauseTimer.subscribe(pause);

    const focusStartCleanUp = eventBus.focusStart.subscribe(() => {
      play();
      setVolume(100);
    });

    const focusEndCleanUp = eventBus.focusEnd.subscribe(async () => {
      await setVolume(10);
      pause();
    });

    return () => {
      playCleanUp();
      pauseCleanUp();
      focusStartCleanUp();
      focusEndCleanUp();
    };
  }, [isReady]);

  return (
    <div>
      <div
        className={clsx(
          'w-96 h-56 bg-black/75 rounded-lg transition-all duration-150 ease-in-out',
          status === 'VIDEO_SHOW' ? 'p-2 opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <YouTubePlayer
          videoId={videoId}
          onReady={onPlayerReady}
          onEnd={onPlayerEnd}
          className="w-full h-full rounded-lg overflow-hidden"
          iframeClassName="w-full h-full"
          opts={PLAYER_OPTIONS}
        />
      </div>

      <div className="mt-1 flex items-center  bg-black/75 p-2  rounded-lg text-[10px] justify-between text-white/75 w-96">
        {status === 'VIDEO_SEARCH' ? (
          <SearchForm
            onSubmit={submitSearchVideo}
            onCancel={() => undoStatus()}
            videoId={videoId}
          />
        ) : (
          <Toolbar
            isPlayerOpened={status === 'VIDEO_SHOW'}
            onToggleOpenPlayer={toggleOpenPlayer}
            onOpenSearchForm={() => setStatus('VIDEO_SEARCH')}
            title={title}
            isPlayerPaused={!isReady}
          />
        )}
      </div>
    </div>
  );
};

export default Player;
