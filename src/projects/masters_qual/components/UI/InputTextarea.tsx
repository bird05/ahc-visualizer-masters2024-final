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

export const InputTextarea = () => {
  // useState==============================
  
  // Redux==============================
  const input_body=useSelector((state) => state.input.b);
  const dispatch = useDispatch();
  // useEffect==============================
  
  // Styled CSS==============================
  const SLabel = styled.label`
  color:red;
  `
  // 関数==============================
  // 入力内容読み取り
  const readInput = () => {
    const input_data = document.getElementById('input') as HTMLInputElement;
    // console.log(input_data.value);
    dispatch(setInput(input_data.value));
  }

  // DOM==============================
  console.log("InputFieldPlayStop");
  return(
    <>
      <label>Input:</label>
      <SLabel>{input_body.is_valid?"":" invalid"}</SLabel>
      <br></br>
      <textarea id="input" rows={3} cols={35} onChange={ readInput }></textarea>
    </>
  )
};