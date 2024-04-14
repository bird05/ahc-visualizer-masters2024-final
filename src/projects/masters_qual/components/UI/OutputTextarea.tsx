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

// 関数インポート
import { read_text_from_url } from '../../functions/CommonFunctions'

export const OutputTextarea = () => {
  // useState==============================
  const [outputText, setOutputText] = useState<string>(""); // 盤面
  // Redux==============================
  const output_body=useSelector((state) => state.output.b);
  const output_urls=useSelector((state) => state.output.urls);
  const seed=useSelector((state) => state.input.seed);
  const dispatch = useDispatch();
  // useEffect==============================
  useEffect(() => {
    (async() => {
      if(output_urls.length!==0){
        const text = await read_text_from_url(output_urls[seed]);
        setOutputText(text);
        dispatch(setOutput(text));
      }
    })()
  },[output_urls,seed])

  // Styled CSS==============================
  const SLabel = styled.label`
  color:red;
  `
  // 関数==============================
  // 出力内容読み取り
  const readOutput = () => {
    const output_data = document.getElementById('output') as HTMLInputElement;
    dispatch(setOutput(output_data.value));
    setOutputText(output_data.value);
  }

  // DOM==============================
  console.log("OutputTextarea");
  return(
    <>
      <label>Output:</label>
      <SLabel>{output_body.is_valid?"":" invalid"}</SLabel>
      <br></br>
      <textarea id="output" rows={3} cols={35} value={outputText} onChange={ readOutput }></textarea>
    </>
  )
};