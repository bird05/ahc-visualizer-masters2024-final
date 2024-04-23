import React from "react";
import { useNavigate } from 'react-router-dom';
// Redux関連
import { useSelector } from '../store/store';
import { setAuth, setName } from '../store/userInfoSlice';
import { useDispatch, shallowEqual } from 'react-redux';
// CSS
import styled from "@emotion/styled";
// //import * as wasm from "atcoder-gacha01";
// import useMedia from "use-media";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // ビルトインフック
import { useState, memo} from 'react';
// // 外部コンポーネント
// import { SideBar } from './components/SideBar';
import { useLogin } from '../hooks/useLogin';

export const SideBar = () => {
  // カスタムフック==============================
  const { loginCheck } = useLogin();
  // Navigate==============================
  const navigate=useNavigate();
  // Redux==============================
  const authnum = useSelector((state) => state.user.authnum);
  const name = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  // useState==============================
  const [inputName, setInputName] = useState(""); // 名前をリアルタイムに受け取るState
  const [inputPass, setInputPass] = useState(""); // パスをリアルタイムに受け取るState
  // Styled CSS==============================
  const SInput = styled.input`
  color:#000000; // 黒
  // background-color:#efefef; // ライトグレー
  // border-color:#767676; // ライトグレー
  // border-radius:3px;
  `
  const SH3 = styled.h3`
    margin:5px 0px;
  `
  const onClickAuth = () => {
    // 名前、パスを照会
    console.log(inputName);
    console.log(inputPass);
    const newAuth = loginCheck(inputName,inputPass);
    if(newAuth!==-1){
      dispatch(setAuth(newAuth));
      dispatch(setName(inputName));
      alert("ログイン成功");
    }
  };
  // ログオフ
  const onClickLogOff = () => {
    dispatch(setAuth(-1));
    dispatch(setName("ゲスト"));
  };
  return(
    <>
      <SH3>Menu</SH3>
      <p><input type="button" onClick={() => navigate('single')} value={"Single"}/></p>
      <p><input type="button" onClick={() => navigate('input_survey')} value={"Input Survey"}/></p>
      {/* <p><input type="button" onClick={() => navigate('statistics')} value={"Statistics"}/></p> */}

      <hr></hr>
      {/* <div>
        <h3>権限設定</h3>
        <p>
          名前：{name}<br></br>
          権限：{authnum===-1
                  ?"実行不可"
                  :"実行可"}
        </p>

        <form>
          <label>
            名前：<input type="text" placeholder="name" value={inputName} onChange={(e) => setInputName(e.target.value)}/>
          </label>

          <label>
            パスワード：<input type="password" placeholder="password" value={inputPass} onChange={(e) => setInputPass(e.target.value)}/>
          </label>
        </form>

        <p>
          <SInput type="button" onClick={onClickAuth} value={"権限切り替え"}/>
          <input type="button" onClick={onClickLogOff} value={"ログオフ"}/>
        </p>
      </div> */}
    </>
  );
};