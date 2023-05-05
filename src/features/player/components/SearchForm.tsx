import {ChangeEvent, FC, useState} from 'react';
import {TbCheck, TbX} from 'react-icons/tb';
import {deserializeVideoIdFromUrl, serializeVideoIdToUrl} from '@/shared/utils/string-utils';

interface Props {
  videoId: string;
  onSubmit: (videoId: string) => void;
  onCancel: () => void;
}

const SearchForm: FC<Props> = ({videoId, onSubmit, onCancel}) => {
  const [videoUrl, setVideoUrl] = useState(serializeVideoIdToUrl(videoId));

  const onInputVideoUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const onSubmitSearch = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const id = deserializeVideoIdFromUrl(videoUrl);

      if (id === videoId) return;

      onSubmit(id);
    } catch {
      const msg =
        'Wrong url format. \nPlease make sure the url is right (including http/https)';
      // TODO: create notification
      alert(msg);
    }
  };

  const onCloseSearch = () => {
    onCancel();
    setVideoUrl(serializeVideoIdToUrl(videoId));
  };

  return (
    <form
      onSubmit={onSubmitSearch}
      onKeyDown={(e) => e.key === 'Escape' && onCloseSearch()}
      className="flex items-center w-full space-x-3"
    >
      <input
        type="text"
        value={videoUrl}
        onInput={onInputVideoUrl}
        spellCheck="false"
        autoFocus
        className="bg-secondary w-full placeholder:text-[10px] outline-none text-[8px]  px-3 py-1 rounded-[4px]"
        placeholder="Paste a YouTube video URL here"
      />
      <button className="outline-none" type="submit">
        <TbCheck size={16} />
      </button>

      <button onClick={onCloseSearch} className="outline-none" type="button">
        <TbX size={16} />
      </button>
    </form>
  );
};

export default SearchForm;
