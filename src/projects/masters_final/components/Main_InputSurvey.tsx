import React from 'react';
// Redux関連
// import { useSelector } from '../store/store';
// CSS
import styled from "@emotion/styled";
// MUI
import Stack from '@mui/material/Stack';
// ビルトインフック
// import { useState, memo} from 'react';
// 外部コンポーネント
import { MultiBoard } from './MainInputSurvey_parts/MultiBoard';
import { InputTypeSelector } from './UI/InputTypeSelector';
// import { FolderSelectorMulti } from './MainStatistics_parts/FolderSelectorMulti';
// import { CreateStatisticsButton } from './MainStatistics_parts/CreateStatisticsButton';
// import { ScoreTableFilterSort } from './MainStatistics_parts/ScoreTableFilterSort';
// import { ScoreTable } from './MainStatistics_parts/ScoreTable';
// import { InitialBoard } from './MainStatistics_parts/InitialBoard';
// import { LastBoard } from './MainStatistics_parts/LastBoard';
// import { ScoreChartController } from './display/ScoreChartController';
// 型
// import type { Input_type, Output_type } from "../types/typeFormat"

export const Main_InputSurvey = () => {
  // useState==============================

  // Styled CSS==============================
  const SDivTopOuter = styled.div`
    width: 100%;
    height: 150px;
  `
  const SDivLeft = styled.div`
    min-width: 400px;
    height: ${"calc(100vh - 200px)"};
    overflow: scroll;
  `
  const SDivRight = styled.div`
    width: 100%;
    height: ${"calc(100vh - 200px)"};
    // overflow: scroll;
  `

  console.log("Main_InputSurvey");
  return(
    <>
      <SH3>Input Survey</SH3>
      問題文は<SA href="https://atcoder.jp/contests/masters2024-final/tasks/masters2024_final_a">こちら</SA>。
      <hr></hr>
      <InputTypeSelector/>
      <MultiBoard/>
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