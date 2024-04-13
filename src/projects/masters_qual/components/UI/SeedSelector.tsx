import React from "react";
// ビルトインフック
import { useState,useEffect,useRef } from "react";
// Redux
import { useSelector } from '../../store/store';
import { useDispatch, shallowEqual } from 'react-redux';
import { setSeed } from '../../store/inputSlice';
// CSS
import styled from "@emotion/styled";
// MUI

// 型
// import type { Input_type, Output_type, Ope_type } from "../../types/typeFormat"

export const SeedSelector = () => {
  // useState==============================
  
  // Redux==============================
  const seed = useSelector((state) => state.input.seed);
  const dispatch = useDispatch();
  // useEffect==============================
  
  // Styled CSS==============================
  const SLabel = styled.label`
  color:red;
  `
  // 関数==============================

  // DOM==============================
  console.log("SeedSelector");
  return(
    <>
      <label>Seed: </label>
      <input type="number" defaultValue={0} value={seed} min={0} max={99} onChange={(e) => dispatch(setSeed(e.target.value))}/>
    </>
  )
};