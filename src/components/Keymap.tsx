import {FC, Fragment} from 'react';

interface Props {
  keys: string[];
}

const Keymap: FC<Props> = ({keys}) => {
  return (
    <div className="flex flex-row flex-wrap items-center  text-zinc-900/50 dark:text-zinc-50/50 ">
      {keys.map((key, index) => (
        <Fragment key={index}>
          <div className="border-[1px] border-zinc-900/50 dark:border-zinc-50/50 rounded-[4px] text-xs leading-4  px-1">
            {key}
          </div>
          {index !== keys.length - 1 && <span className="text-sm mx-1">+</span>}
        </Fragment>
      ))}
    </div>
  );
};

export default Keymap;
