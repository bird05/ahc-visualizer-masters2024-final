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
import { InputTypeSelector } from './UI/InputTypeSelector';
import { SeedSelector } from './UI/SeedSelector';
import { InputTextarea } from './UI/InputTextarea';
import { OutputTextarea } from './UI/OutputTextarea';
import { FolderSelector } from './UI/FolderSelector';
import { PlayStopButton } from './UI/PlayStopButton';
import { SpeedBar } from './UI/SpeedBar';
import { TarTurnInput } from './UI/TarTurnInput';
import { SeekBar } from './UI/SeekBar';
// import { Board } from './Board';
import { BoardController } from './display/BoardController';
import { ScoreChartController } from './display/ScoreChartController';
// import GenerateGIF from '../functions/GenerateGIF';

// 型
import type { Input_type, Output_type } from "../types/typeFormat"
import { DisplayConditionSelector } from './UI/DisplayConditionSelector';

export const Main_Single = () => {
  // useState==============================

  console.log("Main_Single");
  return(
    <>
      <SH3>Single</SH3>
      問題文は<SA href="https://atcoder.jp/contests/masters2024-final/tasks/masters2024_final_a">こちら</SA>。
      <details>
        <summary>使い方</summary>
        <div>Input,Outputに値を入力し、▶ ボタンを押すと、アニメーションが開始されます。</div>
        <div>※Type:A,Seed:0のみダミーデータが挿入されます。</div>
      </details>
      <hr></hr>
      <Stack direction="row" spacing="14px">
        <InputTypeSelector/>
        <SeedSelector/>
      </Stack>
      <InputTextarea/>
      <br></br>
      <OutputTextarea/>
      <br></br>
      <FolderSelector/>
      {/* <br></br>
      <GenerateGIF/> */}
      <SDiv>
        <PlayStopButton/>
        <SpeedBar/>
        <TarTurnInput/>
      </SDiv>
      <SeekBar/>
      <DisplayConditionSelector/>
      <hr></hr>
      <Stack direction="row">
        <div><BoardController/></div>
        <ScoreChartController chartNum={1}/>
      </Stack>
    </>
  );
};
const SH3 = styled.h3`
  margin:5px 0px;
`
const SA = styled.a`
  text-decoration: underline;
`
const SDiv = styled.div`
  display: flex;
  margin-top:5px;
`
