import React from 'react';
// Redux関連
import { useSelector } from '../../store/store';
// CSS
import styled from "@emotion/styled";
// MUI
// import Stack from '@mui/material/Stack';
// ビルトインフック
import { useState, useEffect } from 'react';
// 外部コンポーネント
import { BoardDisplay } from '../display/BoardDisplay';
// 関数インポート
import { zeroPadding, read_text_from_url, text_to_Input } from '../../functions/CommonFunctions'
// 型
// import type { Input_type, Output_type } from "../types/typeFormat"

export const InitialBoard = () => {
  // useState==============================
  
  // Redux==============================
  const selectedSeed = useSelector((state) => state.statistics.selectedSeed);

  // useEffect==============================
  useEffect(() => {
    byoga(selectedSeed);
  },[selectedSeed])

  // 関数==============================
  // seedを指定して描画する関数
  async function byoga(seed_l:number){
    const text = await read_text_from_url(`https://raw.githubusercontent.com/bird05/ahc-visualizer-input/main/masters_qual/in/${zeroPadding(seed_l,4)}.txt`);
    const input_body=text_to_Input(text);
    if(input_body){
      const canvas=BoardDisplay(
        200,200,
        input_body.is_valid,input_body.px,input_body.py,
        input_body.lx,input_body.ly,input_body.rx,input_body.ry,
        input_body.sx,input_body.sy,
        []
      );
      const pa=document.getElementById(`initialBoard`);
      if(pa) pa.replaceChildren(canvas);
    }
  }
  
  const num_g=[0,1,2,3,4,5,6,7,8,9];
  const num_e1=[0,1,2,3,4];
  const num_e2=[5,6,7,8,9];
  console.log("InitialBoard");
  return(
    <>
      <SDiv>
        Seed:{selectedSeed}
        <div id={`initialBoard`}></div>
      </SDiv>
    </>
  );
};
const SDiv = styled.div`
margin-right:5px;
`