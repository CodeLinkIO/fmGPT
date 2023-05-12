import React from 'react';

import useStore from '@store/store';
import SquareIcon from '@icon/SquareIcon';

const StopGeneratingButton = () => {
  const setGenerating = useStore((state) => state.setGenerating);
  const generating = useStore((state) => state.generating);

  return generating ? (
    <div
      className='absolute bottom-6 left-0 right-0 m-auto flex md:w-full md:m-auto gap-0 md:gap-2 justify-center'
      onClick={() => setGenerating(false)}
    >
      <button className='btn relative btn-neutral border-0 md:border'>
        <div className='flex w-full items-center justify-center gap-2'>
          <SquareIcon />
          Stop generating
        </div>
      </button>
    </div>
  ) : (
    <></>
  );
};

export default StopGeneratingButton;
