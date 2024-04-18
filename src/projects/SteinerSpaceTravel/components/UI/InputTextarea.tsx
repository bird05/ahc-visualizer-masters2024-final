import React from "react";
// ビルトインフック
import { useState,useEffect,useRef } from "react";
// Redux
import { useSelector } from '../../store/store';
import { useDispatch, shallowEqual } from 'react-redux';
import { setInput } from '../../store/inputSlice';
// CSS
import styled from "@emotion/styled";
// MUI
import Stack from '@mui/material/Stack';
// 型

// 関数インポート
import { zeroPadding, read_text_from_url } from '../../functions/CommonFunctions'

export const InputTextarea = () => {
  // useState==============================
  const [inputText, setInputText] = useState<string>(""); // 盤面
  // Redux==============================
  const input_body=useSelector((state) => state.input.b);
  const seed=useSelector((state) => state.input.seed);
  const dispatch = useDispatch();
  // useEffect==============================
  useEffect(() => {
    readInput_from_File(seed);
  },[seed])
  // Styled CSS==============================
  const SLabel = styled.label`
  color:red;
  `
  const STextarea = styled.textarea`
  color:#000000; // 黒
  background-color:#ffffff; // 白
  border-color:#767676; // ライトグレー
  border-radius:3px;
  `
  // 関数==============================
  // ファイルからの読み込み
  const readInput_from_File = async (seed_l:number) => {
    // ローカルからの読み込み
    // const response = await fetch(`/src/projects/masters_qual/in/${zeroPadding(seed_l,4)}.txt?raw`);
    // const response = await fetch(`${location.href}src/projects/masters_qual/in/${zeroPadding(seed_l,4)}.txt?raw`);
    // githubからの読み込み
    // const text = await read_text_from_url(`https://raw.githubusercontent.com/bird05/ahc-visualizer-input/main/masters_qual/in/${zeroPadding(seed_l,4)}.txt`);
    const text = await read_text_from_url(`https://raw.githubusercontent.com/bird05/ahc-visualizer-input/main/SteinerSpaceTravel/in/${zeroPadding(seed_l,4)}.txt`);
    dispatch(setInput(text));
    setInputText(text);
  }
  // 入力内容読み取り
  const readInput = () => {
    const input_data = document.getElementById('input') as HTMLInputElement;
    dispatch(setInput(input_data.value));
    setInputText(input_data.value);
  }

  // DOM==============================
  console.log("InputTextarea");
  return(
    <>
      <label>Input:</label>
      <SLabel>{input_body.is_valid?"":" invalid"}</SLabel>
      <br></br>
      <STextarea id="input" rows={3} cols={35} value={inputText} onChange={ readInput }></STextarea>
    </>
  )
};