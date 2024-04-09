import React from "react";
// ビルトインフック
import { useState,useEffect,useRef } from "react";
// Redux
import { useSelector } from '../../store/store';
import { useDispatch, shallowEqual } from 'react-redux';
import { setInput } from '../../store/inputSlice';
import { setOutput } from '../../store/outputSlice';
import { setTarTurn } from '../../store/tarTurnSlice';
// CSS
import styled from "@emotion/styled";
// MUI
import Stack from '@mui/material/Stack';
// 型
import type { Input_type, Output_type, Ope_type } from "../../types/typeFormat"
// import { prependOnceListener } from "process";
// 外部コンポーネント
import { InputFieldTarTurn } from './InputFieldTarTurn';
import { PlayStopButton } from '../UI/PlayStopButton';

export const InputField = () => {
  // useState==============================
  
  // Redux==============================
  // const s = useSelector((state) => state.output.s);
  // const tarTurn = useSelector((state) => state.tarTurn.tarTurn, shallowEqual);
  // const playingFlag = useSelector((state) => state.playingFlag.playingFlag);
  const dispatch = useDispatch();
  // useEffect==============================
  // const refTarTurn = useRef(tarTurn);
  // useEffect(() => {
  //   refTarTurn.current = tarTurn;
  // },[tarTurn]);
  // Styled CSS==============================
  const SH3 = styled.h3`
  margin-top:0;
  margin-bottom:0;
  `;
  const SP = styled.p`
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  `
  
  const STextarea = styled.textarea`
  width: 500px;
  `
  const FlexP = styled.p`
  display: flex;
  `
  const InputPlayButton = styled.input`
  width: 32px;
  height:32px;
  bottom:5px;
  position:relative;
  `
  const InputSpeedBar = styled.input`
  width:200px;
  `
  const InputTrunSelect = styled.input`
  width:70px;
  text-align:right; 
  `
  const SLabel = styled.label`
  padding: 0px 4px;
  `

  // useEffect(() => {
  //   let cnt:number = 0;
  //   // const interval = setInterval(() => {
  //   //   console.log(cnt++);
  //   // }, 1000);
  //   // return () => clearInterval(interval);
  // }, []);

  // console.log("InputField");
  // 関数==============================
  // 入力内容読み取り
  const readInput = () => {
    const input_data = document.getElementById('input') as HTMLInputElement;
    // console.log(input_data.value);
    dispatch(setInput(input_data.value));
  }
  // 出力内容読み取り
  const readOutput = () => {
    const output_data = document.getElementById('output') as HTMLInputElement;
    dispatch(setOutput(output_data.value));
  }
  const readTarTurn = () => {

  }
  // // 定期実行
  // const advanceTarTurn = () => {
  //   dispatch(setTarTurn(refTarTurn.current+1));
  //   console.log(refTarTurn.current);
  // }
  // // 再生開始
  // function playBoard(){
  //   setIsPlaying(true);
  //   clearInterval(refIntervalID.current);
  //   refIntervalID.current = setInterval(() => {
  //     advanceTarTurn();
  //     console.log(refIntervalID.current);
  //   }, 500);
  // }
  // // 再生停止
  // const stopBoard = () => {
  //   setIsPlaying(false);
  //   console.log("stop");
  //   console.log(refIntervalID.current);
  //   clearInterval(refIntervalID.current);
  //   refIntervalID.current=0;
  //   console.log(refIntervalID.current);
  // }
  // DOM==============================
  console.log("InputField");
  return(
    <>
      <Stack direction="column">
        {/* <div>
          <label>File:</label>
          <select id="fileSelect" disabled/>
          <input type="file" id="dirSelect" directory webkitdirectory wfd-id="id0"/>
        </div> */}

        {/* <div>
          <label>Seed:</label>
          <input type="number" id="seed" value="0" min="0" max="18446744073709551615" onchange="generate()" wfd-id="id1"></input>
        </div> */}

        <div>
          <label>Input:</label>
          <br></br>
          {/* <textarea id="input" rows="3" cols="35" value={InputRawData} onChange={(e) => setInputRawData(e.target.value)}></textarea> */}
          {/* <textarea id="input" rows="3" cols="35" onChange={e => readInput(e.target.value)}></textarea> */}
          <textarea id="input" rows={3} cols={35} onChange={ readInput }></textarea>
        </div>

        <div>
          <label>Output:</label>
          <br></br>
          <textarea id="output" rows={3} cols={35} onChange={ readOutput }></textarea>
        </div>

        {/* <div>
          <input type="button" id="save_png" value="Save as PNG" wfd-id="id10"/>
          <input type="button" id="save_gif" value="Save as Animation GIF" wfd-id="id11"/>
        </div> */}

        <SDiv>
          <PlayStopButton/>
          {/* <InputFieldPlayStop/> */}
          {/* {!isPlaying
            ?
            <InputPlayButton type="button" id="play" value="▶" onClick={ playBoard }/>
            :
            <InputPlayButton type="button" id="stop" value="■" onClick={ stopBoard }/>
          }
          <InputPlayButton type="button" id="play" value="▶" onClick={ playBoard }/>
          <InputPlayButton type="button" id="stop" value="■" onClick={ stopBoard }/> */}

          <SLabel>slow</SLabel>
          <InputSpeedBar type="range" id="speed" min={1} max={60} defaultValue={30}/>
          {/* <InputSpeedBar type="range" id="speed" min="1" max="60" value="30" wfd-id="id14"/> */}
          <SLabel>fast</SLabel>
          {/* <SLabel>turn:</SLabel>
          <InputTrunSelect type="number" id="turn" value={tarTurn} min={0} max={s.length} onChange={(e) => dispatch(setTarTurn(e.target.value))}/> */}
          <InputFieldTarTurn/>
        </SDiv>
      </Stack>
      {/* <textarea id="input" rows="4" style="width:650px;" data-gramm_editor="false" oninput="updateOutput()"></textarea> */}
    </>
  )
};
const SDiv = styled.div`
display: flex;
margin-top:5px;
`