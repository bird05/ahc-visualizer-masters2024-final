import React from "react";
// ビルトインフック
import { useState,useEffect,useRef } from "react";
// Redux
import { useSelector } from '../../store/store';
import { useDispatch, shallowEqual } from 'react-redux';
import { setPlayingFlag } from '../../store/playingFlagSlice';
// CSS
import styled from "@emotion/styled";
// MUI
import Stack from '@mui/material/Stack';
// 型
import type { Input_type, Output_type, Ope_type } from "../../types/typeFormat"

export const Dummy = () => {
  // useState==============================
  // const [Input, setInput] = useState([] as Input_type); // Inputデータ
  // const [intervalID,setIntervalID] = useState(null);
  // Redux==============================
  
  // useEffect==============================
  
  // Styled CSS==============================

  // 関数==============================

  // DOM==============================
  console.log("Dummy");
  return(
    <>
      Dummy
    </>
  )
};