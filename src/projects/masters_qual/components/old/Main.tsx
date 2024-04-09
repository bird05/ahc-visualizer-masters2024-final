import React from "react";
// CSS
import styled from "@emotion/styled";
// //import * as wasm from "atcoder-gacha01";
// import useMedia from "use-media";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// MUI
// import Stack from '@mui/material/Stack';
// // ビルトインフック
// import { useState, memo} from 'react';
// // 外部コンポーネント
// import { SideBar } from './components/SideBar';
// import { Gacha } from './components/Gacha';
// import { GachaContentAll } from './components/GachaContentAll';
import { InputField } from './InputField';
import { Board } from '../Board';

export const Main = () => {
  
  return(
    <>
      <InputField/>
      <hr></hr>
      <Board/>
    </>
  );
};