import React from 'react';
// Redux関連
import { useSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setSelectedSeed } from '../../store/statisticsInfoSlice';
// CSS
import styled from "@emotion/styled";
// MUI
// import Stack from '@mui/material/Stack';
// ビルトインフック
// import { useState } from 'react';
// 外部コンポーネント
// import { CalcEndScore } from '../display/CalcScore';
// 関数インポート
// import { zeroPadding, read_text_from_url, text_to_Input, text_to_Output } from '../../functions/CommonFunctions';

export const ScoreTable = () => {
  // useState==============================

  // Redux==============================
  const filtered_b = useSelector((state) => state.statistics.filtered_b);
  const dispatch = useDispatch();
  // colorList==============================
  const colorList: string[] = [
    "#eb9147",
    "#ebbc47",
    "#ebdd47",
    "#bfeb47",
    "#47ebeb",
    "#47cdeb",
    "#47a9eb",
    "#4776eb",
    "#a447eb",
    "#eb4a47",
    "#808080",
  ];
  // Styled CSS==============================
  // 表の作り方
  const STable = styled.table`
    border-collapse: collapse;
  `;
  const STh = styled.th`
    background-color: #cfdbd5; // gray
    border: 1px solid;
    padding-left: 5px;
    padding-right: 5px;
  `;
  const STrColorChange = styled.tr`
    background-color: #cfdbd5;
    border: 1px solid;
    padding-left: 5px;
    padding-right: 5px;
    &:hover {
      background-color: ${0?"#cfdbd5":"#f5cb5c"};
    }
  `;
  const STd = styled.td`
    border: 1px solid;
    padding-left: 5px;
    padding-right: 5px;
  `;
  const STdColored = styled.td<{
    col_idx: number;
  }>`
    background-color: ${({ col_idx }) => colorList[col_idx]};
    border: 1px solid;
    padding-left: 5px;
    padding-right: 5px;
  `;

  // 関数==============================
  // 表の行をクリックした際にseedを記録する関数
  const onClickItem = (seed:number) => {
    dispatch(setSelectedSeed(seed));
  };

  console.log("ScoreTable");
  return(
    <>
      <STable>
        <caption>　</caption>
        <tbody>
          <tr>
            <STh>t</STh>
            <STh>Seed</STh>
            <STh>Dataset1</STh>
            <STh>Dataset2</STh>
            <STh>Dataset3</STh>
          </tr>
          {filtered_b.map((data, index: number) => (
            <STrColorChange onClick={() => {onClickItem(data.seed);}} key={index}>
              {<STdColored col_idx={data.t}>{data.t}</STdColored>}
              <STd>{data.seed}</STd>
              <STd>{data.score1}</STd>
              <STd>{data.score2}</STd>
              <STd>{data.score3}</STd>
            </STrColorChange>
          ))}
        </tbody>
      </STable>
    </>
  );
};