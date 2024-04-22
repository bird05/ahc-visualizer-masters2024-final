import React from "react";
// ビルトインフック
import { useState,useEffect,useRef } from "react";
// Redux
import { useSelector } from '../../store/store';
import { useDispatch, shallowEqual } from 'react-redux';
import { setType } from '../../store/inputSlice';
// CSS
import styled from "@emotion/styled";
// MUI
import Stack from '@mui/material/Stack';
// 型
import type { Input_type, Output_type } from "../../types/typeFormat"

export const InputTypeSelector = () => {
  // Redux==============================
  const t_store = useSelector((state) => state.input.type);
  const dispatch = useDispatch();
  // useState==============================
  // リアルタイムに情報を受け取る==============================
  const [inputT, setInputT] = useState(t_store); // inputで与えられるt(t_storeはpropsで受け取らないとだめかも)
  // useEffect==============================
  
  // 関数==============================
  const changeFunction: React.ChangeEventHandler<HTMLSelectElement> = (ev) => {
    setInputT(ev.target.value);
    dispatch(setType(ev.target.value));
  }

  const changeValue = function (ev){
    setInputT(ev.target.value);
    dispatch(setType(ev.target.value));
  }

  // DOM==============================
  console.log("InputTypeSelector");
  return(
    <>
      {/* ラジオボタン */}
      <SDivAll>
        <label>Type: </label>
        <SDivRadioAll>
          <SDivRadioItem><input type="radio" name="num_of_inq" value="A" onChange={changeValue} defaultChecked/>A</SDivRadioItem>
          <SDivRadioItem><input type="radio" name="num_of_inq" value="B" onChange={changeValue} />B</SDivRadioItem>
          <SDivRadioItem><input type="radio" name="num_of_inq" value="C" onChange={changeValue} />C</SDivRadioItem>
        </SDivRadioAll>
      </SDivAll>
      
      {/* ドロップダウンリスト */}
      {/* <label>Type: </label>
      <SSelect onChange={changeFunction} value={inputT}>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </SSelect> */}
      
      {/* ドロップダウンリスト */}
      {/* <STable>
          <caption></caption>
          <tbody>
            <tr>
              <STh>type</STh>
            </tr>
            <STr>
              <STd>
                <SSelect onChange={changeFunction} value={inputT}>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </SSelect>
              </STd>
            </STr>
          </tbody>
        </STable> */}
    </>
  )
};

// Styled CSS==============================
// 表の作り方
const STable = styled.table`
  border-collapse: collapse;
`;
const STh = styled.th`
  background-color: #cfdbd5; // gray
  border: 1px solid;
  padding-left: 5px;
  padding-right: 5px;
`;
const STr = styled.tr`
  background-color: #cfdbd5;
  border: 1px solid;
  padding-left: 5px;
  padding-right: 5px;
`;
const STd = styled.td`
  border: 1px solid;
  padding-left: 5px;
  padding-right: 5px;
`;
const SSelect = styled.select`
  cont-size: 12pt;
`

const SDivAll = styled.div`
  display:flex;
  // align-items: center;
  // justify-content: center;
  // padding: 8px;
`
const SDiv = styled.div`
  // padding: 8px;
`
const SDivRadioAll = styled.div`
  display:flex;
`
const SDivRadioItem = styled.div`
  padding-right: 4px;
`