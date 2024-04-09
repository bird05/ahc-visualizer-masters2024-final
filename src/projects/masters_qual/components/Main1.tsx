import React from 'react';
// CSS
import styled from "@emotion/styled";
// import useMedia from "use-media";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// MUI
import Stack from '@mui/material/Stack';
// ビルトインフック
import { useState, memo} from 'react';
// 外部コンポーネント
import { InputTextarea } from './UI/InputTextarea';
import { OutputTextarea } from './UI/OutputTextarea';
import { PlayStopButton } from './UI/PlayStopButton';
import { SpeedBar } from './UI/SpeedBar';
import { TarTurnInput } from './UI/TarTurnInput';
import { SeekBar } from './UI/SeekBar';
// import { Board } from './Board';
import { BoardController } from './display/BoardController';
import GenerateGIF from '../functions/GenerateGIF';
// 型
import type { Input_type, Output_type } from "../types/typeFormat"

export const Main1 = () => {
  // useState==============================

  console.log("Main1");
  return(
    <>
      <InputTextarea/>
      <br></br>
      <OutputTextarea/>
      <br></br>
      <GenerateGIF/>
      <SDiv>
        <PlayStopButton/>
        <SpeedBar/>
        <TarTurnInput/>
      </SDiv>
      <SeekBar/>
      {/* <hr></hr> */}
      {/* <Board/> */}
      <hr></hr>
      <BoardController/>
    </>
  );
};
const SDiv = styled.div`
display: flex;
margin-top:5px;
`