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

// ダミーデータ
const dummy:string="A -250 -433\nA -250 -433\nA -250 -433\nA -250 -433\nA -250 -433\nA -250 -233\nA -500 0\nA -500 0\nA -500 0\nA -500 0\nA -500 0\nA -129 482\nA -129 482\nA -129 482\nA -129 482\nA 0 500\nA 0 500\nA 0 500\nA 0 500\nA -433 0\nA -433 249\nA -433 249\nA -433 249\nA -433 249\nA -433 249\nA -433 249\nA -433 0\nA -433 0\nA -433 0\nA 250 -433\nA 250 -433\nA 250 -433\nA 250 -433\nA 250 -433\nA 250 433\nA -433 249\nA -433 249\nA -433 249\nA 0 -500\nA 0 -500\nA 500 0\nS 0 1\nA 129 -482\nA 129 -482\nA 129 -482\nA 129 -482\nA 129 -482\nA 130 -433\nA 250 -433\nA 250 -433\nA 129 -482\nA 0 0\nA 0 0\nA 0 0\nA 0 0\nA 0 0\nA 0 0\nA 129 -482\nA 0 500\nA 0 500\nS -1 0\nA -249 433\nA -249 433\nA -249 433\nA -249 433\nA 0 500\nA 0 500\nA 0 500\nA 0 0\nA 0 0\nA 433 -250\nA 433 -250\nA 433 -250\nA 433 -250\nA 433 -250\nA 433 0\nA 433 0\nA 0 0\nA -482 129\nA -482 129\nA -482 129\nA -482 129\nA -482 129\nA -482 129\nA -482 129\nA -482 129\nS -1 0\nS 0 1\nA -500 0\nA -433 -50\nA -433 -250\nA -433 -250\nA -433 -250\nA -433 -250\nA -433 -250\nA -433 -250\nA -433 -250\nA 433 249\nA 433 249\nA 433 249\nA 433 249\nA 433 249\nA 433 249\nA 433 249\nA 433 249\nA 433 249\nA 0 0\nA 0 0\nA 0 0\nA 0 0\nA 500 0\nA 353 0\nA 353 -353\nA 353 -353\nA 353 -353\nA 353 -353\nA 353 -353\nA 353 -353\nA 353 -353\nA 353 -353\nA 353 -353\nA 0 0\nA 0 0\nA 0 0\nA 0 0\nA 0 0\nA 0 0\nA -353 353\nA -353 353\nA -353 353\nA -353 353\nA -353 353\nA -353 353\nA -353 353\nS -1 0\nS 0 -1\nA 433 249\nA 433 249\nA 433 249\nA 433 249\nA 433 249\nA 433 249\nA 433 249\nA 433 249\nA 433 249\nA 482 129\nA 482 129\nA 482 129\nA 0 0\nA 0 0\nA 0 0\nA 0 0\nA -433 -250\nA -433 -250\nA -482 -129\nA -482 -129\nA -482 -129\nA -482 -129\nA -482 -129\nA -482 -129\nA 0 0";

export const OutputTextarea = () => {
  // useState==============================
  const [outputText, setOutputText] = useState<string>(dummy);
  // Redux==============================
  const output_body=useSelector((state) => state.output.b);
  const output_urls=useSelector((state) => state.output.urls);
  const seed=useSelector((state) => state.input.seed);
  const dispatch = useDispatch();
  // useEffect==============================
  useEffect(() => {
    readOutput();
  },[])
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
      <STextarea id="output" rows={3} cols={35} value={outputText} onChange={ readOutput }></STextarea>
    </>
  )
};
const SLabel = styled.label`
  color:red;
`
const STextarea = styled.textarea`
  color:#000000; // 黒
  background-color:#ffffff; // 白
  border-color:#767676; // ライトグレー
  border-radius:3px;
`