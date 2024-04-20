import React from 'react';
// 外部コンポーネント
import { FolderSelector } from '../UI/FolderSelector';

export const FolderSelectorMulti = () => {
  console.log("FolderSelectorMulti");
  return(
    <>
      Dataset1: <FolderSelector tarNum={1}/> <br></br>
      Dataset2: <FolderSelector tarNum={2}/> <br></br>
      Dataset3: <FolderSelector tarNum={3}/> <br></br>
    </>
  );
};