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
import { FolderSelector } from './UI/FolderSelector';
import { SeedSelector } from './UI/SeedSelector';
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
import { BoardDisplay } from './display/BoardDisplay';

// 関数インポート
import { zeroPadding, read_text_from_url } from '../functions/CommonFunctions'

export const Main_InputSurvey = () => {
  // useState==============================

  // 関数==============================
  // textをInputに変換する
  function text_to_Input(text){
    const arr = text.split('\n');
    let is_valid:boolean=false;
    let t:number=-1;
    let N:number=0;
    let v:string[]=new Array();
    let h:string[]=new Array();
    let a:number[][]=new Array();
    const one_data=arr[0].split(' ');
    // 1行目の要素数が2でない
    if(one_data.length!=2){
      is_valid=false;
      return;
    }
    // Nが数値ではない
    if(isNaN(one_data[1])){
      is_valid=false;
      return;
    }
    t=one_data[0];
    N=one_data[1];
    // Nが0以下
    if(N<=0){
      is_valid=false;
      return;
    }
    if(arr.length<N*3){
      is_valid=false;
      return;
    }
    for(let i=1; i<N*3; ++i){
      if(i<=N){
        v[i-1]=arr[i];
      }else if(i<=N*2-1){
        h[i-N-1]=arr[i];
      }else{
        a[i-N*2]=arr[i].split(' ');
        // aの要素数がNでない
        if(a[i-N*2].length!=N){
          is_valid=false;
          return;
        }
      }
    }
    // const res:Input_type = [];
    // let res:Input_type=[];
    const res:Input_type={
      is_valid: true,
      t: t,
      N: N,
      v: v,
      h: h,
      a: a
    }
    return res;
  }
  // 0000.txtの内容を描画する関数
  async function byoga(seed_l:number){
    const text = await read_text_from_url(`https://raw.githubusercontent.com/bird05/ahc-visualizer-input/main/masters_qual/in/${zeroPadding(seed_l,4)}.txt`);
    const input_body=text_to_Input(text);
    if(input_body){
      const canvas=BoardDisplay(
        200,200,
        input_body.is_valid,input_body.N,input_body.v,input_body.h,input_body.a,
        false,-1,-1,-1,-1
      );
      const pa=document.getElementById(`board${seed_l}`);
      // console.log("disp");
      if(pa) pa.replaceChildren(canvas);
    }
  }
  for(let i=0; i<10; ++i){
    byoga(i);
  }
  // const num_g=[0,1,2,3,4,5,6,7,8,9];
  // const num_e1=[0,1,2,3,4];
  // const num_e2=[5,6,7,8,9];
  console.log("Main_InputSurvey");
  return(
    <>
      {/* {num_g.map((g) => {
        <>
          <Stack direction={'row'}>
          return(
            <>
              {num_e1.map((e1) => {
                <SDiv>
                  Seed:{g*10 + e1}
                  <div id={`board${g*10 + e1}`}></div>
                </SDiv>
              })}
            </>
            )
          </Stack>
          <Stack direction={'row'}>
          return(
            <>
              {num_e2.map((e2) => {
                <SDiv>
                  Seed:{g*10 + e2}
                  <div id={`board${g*10 + e2}`}></div>
                </SDiv>
              })}
            </>
            )
          </Stack>
        </>
      })} */}

        {/* {num_e1.map((e1) => {
          <SDiv>
            Seed:{e1}
            <div id={`board${e1}`}></div>
          </SDiv>
        })} */}

      {/* <Stack direction={'row'}>
        {num_e1.map((e1) => {
          <SDiv>
            Seed:{e1}
            <div id={`board${e1}`}></div>
          </SDiv>
        })}
      </Stack> */}
      
      {/* <Stack direction={'row'}> */}

      <Stack direction={'row'}>
        <SDiv>
          Seed:0
          <div id="board0"></div>
        </SDiv>
        <SDiv>
          Seed:1
          <div id="board1"></div>
        </SDiv>
        <SDiv>
          Seed:2
          <div id="board2"></div>
        </SDiv>
        <SDiv>
          Seed:3
          <div id="board3"></div>
        </SDiv>
        <SDiv>
          Seed:4
          <div id="board4"></div>
        </SDiv>
      </Stack>

      <Stack direction={'row'}>
        <SDiv>
          Seed:5
          <div id="board5"></div>
        </SDiv>
        <SDiv>
          Seed:6
          <div id="board6"></div>
        </SDiv>
        <SDiv>
          Seed:7
          <div id="board7"></div>
        </SDiv>
        <SDiv>
          Seed:8
          <div id="board8"></div>
        </SDiv>
        <SDiv>
          Seed:9
          <div id="board9"></div>
        </SDiv>
      </Stack>
      
      
    </>
  );
};
const SDiv = styled.div`
margin-right:5px;
`