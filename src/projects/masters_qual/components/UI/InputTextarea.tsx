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
import type { Input_type, Output_type, Ope_type } from "../../types/typeFormat"
// 関数インポート
import { zeroPadding } from '../../functions/CommonFunctions'

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
  // 関数==============================
  // ファイルからの読み込み
  const readInput_from_File = async (seed_l:number) => {
    const response = await fetch(`/src/projects/masters_qual/in/${zeroPadding(seed_l,4)}.txt?raw`);
    const text=await response.text();
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
      <textarea id="input" rows={3} cols={35} value={inputText} onChange={ readInput }></textarea>
      {/* <textarea id="input" value={} rows={3} cols={35} onChange={ readInput }></textarea> */}
    </>
  )
};