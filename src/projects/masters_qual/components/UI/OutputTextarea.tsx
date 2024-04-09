import React from "react";
// ビルトインフック
import { useState,useEffect,useRef } from "react";
// Redux
import { useSelector } from '../../store/store';
import { useDispatch, shallowEqual } from 'react-redux';
import { setOutput } from '../../store/outputSlice';
// CSS
import styled from "@emotion/styled";
// MUI
import Stack from '@mui/material/Stack';
// 型
import type { Input_type, Output_type, Ope_type } from "../../types/typeFormat"

export const OutputTextarea = () => {
  // useState==============================
  
  // Redux==============================
  const output_body=useSelector((state) => state.output.b);
  const dispatch = useDispatch();
  // useEffect==============================
  
  // Styled CSS==============================
  const SLabel = styled.label`
  color:red;
  `
  // 関数==============================
  // 入力内容読み取り
  // 出力内容読み取り
  const readOutput = () => {
    const output_data = document.getElementById('output') as HTMLInputElement;
    dispatch(setOutput(output_data.value));
  }

  // DOM==============================
  console.log("OutputTextarea");
  return(
    <>
      <label>Output:</label>
      <SLabel>{output_body.is_valid?"":" invalid"}</SLabel>
      <br></br>
      <textarea id="output" rows={3} cols={35} onChange={ readOutput }></textarea>
    </>
  )
};