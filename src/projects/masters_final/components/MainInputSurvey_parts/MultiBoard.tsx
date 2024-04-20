import React from 'react';
// CSS
import styled from "@emotion/styled";
// import useMedia from "use-media";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// MUI
import Stack from '@mui/material/Stack';
// ビルトインフック
import { useState, useEffect, memo} from 'react';
// Redux
import { useSelector } from '../../store/store';
// 外部コンポーネント
import { BoardDisplay } from '../display/BoardDisplay';
// 型
// import type { Input_type, Output_type } from "../../types/typeFormat"

// 関数インポート
import { zeroPadding, read_text_from_url, text_to_Input } from '../../functions/CommonFunctions'

export const MultiBoard = () => {
// Redux==============================
  const input_type = useSelector((state) => state.input.type);
  // useState==============================

  // useEffect==============================
  useEffect(() => {
    for(let i=0; i<100; ++i){
      byoga(i);
    }
  },[input_type])

  // 関数==============================
  // seedを指定して描画する関数
  async function byoga(seed_l:number){
    const text = await read_text_from_url(`https://raw.githubusercontent.com/bird05/ahc-visualizer-input/main/masters_final/in${input_type}/${zeroPadding(seed_l,4)}.txt`);
    const input_body=text_to_Input(text);
    if(input_body){
      const canvas=BoardDisplay(
        200,200,
        input_body.is_valid,input_body.px,input_body.py,
        input_body.lx,input_body.ly,input_body.rx,input_body.ry,
        0,0
      );
      const pa=document.getElementById(`board${seed_l}`);
      if(pa) pa.replaceChildren(canvas);
    }
  }
  
  const num_g=[0,1,2,3,4,5,6,7,8,9];
  const num_e1=[0,1,2,3,4];
  const num_e2=[5,6,7,8,9];
  console.log("MultiBoard");
  return(
    <>
      {num_g.map((g) => (
        <>
        <Stack direction={'row'}>
          {num_e1.map((e1) => (
            <SDiv>
              Seed:{g*10+e1}
              <div id={`board${g*10+e1}`}></div>
            </SDiv>
          ))}
        </Stack>
        <Stack direction={'row'}>
          {num_e2.map((e2) => (
            <SDiv>
              Seed:{g*10+e2}
              <div id={`board${g*10+e2}`}></div>
            </SDiv>
          ))}
        </Stack>
        </>
      ))}

      {/* <Stack direction={'row'}>
        {num_e1.map((e1) => (
          <SDiv>
            Seed:{e1}
            <div id={`board${e1}`}></div>
          </SDiv>
        ))}
      </Stack>
      <Stack direction={'row'}>
        {num_e2.map((e2) => (
          <SDiv>
            Seed:{e2}
            <div id={`board${e2}`}></div>
          </SDiv>
        ))}
      </Stack> */}
    </>
  );
};
const SDiv = styled.div`
margin-right:5px;
`