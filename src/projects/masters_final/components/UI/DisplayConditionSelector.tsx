import React from "react";
// ビルトインフック
import { useState,useEffect,useRef } from "react";
// Redux
import { useSelector } from '../../store/store';
import { useDispatch, shallowEqual } from 'react-redux';
import { setShowTail, setShowTrajectory, setShowCollision } from '../../store/displayConditionSlice';
// CSS
import styled from "@emotion/styled";
// MUI
import Stack from '@mui/material/Stack';
// 型
// import type { Input_type, Output_type } from "../../types/typeFormat"

export const DisplayConditionSelector = () => {
  // Redux==============================
  const showCond = useSelector((state) => state.displayCondition.showCond);
  const dispatch = useDispatch();
  // useState==============================
  // リアルタイムに情報を受け取る==============================
  // const [inputT, setInputT] = useState(t_store); // inputで与えられるt(t_storeはpropsで受け取らないとだめかも)
  // useEffect==============================
  
  // Styled CSS==============================
  const SLabel = styled.label`
    cursor:pointer;
  `
  const SInputCheckBox = styled.input`
    cursor:pointer;
  `
  // 関数==============================

  // DOM==============================
  console.log("DisplayConditionSelector");
  return(
    <>
      {/* チェックボックス */}
      {/* https://quartet-communications.com/info/topics/7165 */}
      <Stack direction="row" spacing="12px">
        <div>
          <SLabel htmlFor="tail">
            <SInputCheckBox type="checkbox" id="tail" checked={showCond.tail} onChange={(e) => {dispatch(setShowTail(e.target.checked))}}/>
          Tail</SLabel>
        </div>
        <div>
          <SLabel htmlFor="tra">
            <SInputCheckBox type="checkbox" id="tra" checked={showCond.trajectory} onChange={(e) => {dispatch(setShowTrajectory(e.target.checked))}}/>
          Trajectory</SLabel>
        </div>
        <div>
          <SLabel htmlFor="col">
            <SInputCheckBox type="checkbox" id="col" checked={showCond.collision} onChange={(e) => {dispatch(setShowCollision(e.target.checked))}}/>
          Collision</SLabel>
        </div>
      </Stack>
    </>
  )
};