import {FC} from 'react';
import {DividerHorizontal, Input} from '@/shared/components';

interface Props {
  videoId: string;
  changeVideoId: (id: string) => void;
  className?: HTMLDivElement['className'];
}

const SectionYoutube: FC<Props> = (props) => {
  const {className, videoId, changeVideoId} = props;

  return (
    <div className={className}>
      <DividerHorizontal label="Youtube" />

      <div className="mt-2 flex justify-between items-center">
        <p className="text-md mr-6">Video ID</p>
        <Input value={videoId} onChange={changeVideoId} />
      </div>
    </div>
  );
};

export default SectionYoutube;
