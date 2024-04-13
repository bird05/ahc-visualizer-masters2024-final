import React from "react";
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
  // Redux==============================
  const authnum = useSelector((state) => state.user.authnum);
  const name = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  // useState==============================
  const [inputName, setInputName] = useState(""); // 名前をリアルタイムに受け取るState
  const [inputPass, setInputPass] = useState(""); // パスをリアルタイムに受け取るState
  // Styled CSS==============================
  const SButtonMenu = styled.button`
  font-size: 20px;
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
      Menu
      <br></br>
      <input type="button" onClick={onClickAuth} value={"Single"}/>
      {/* <SButtonMenu>Single</SButtonMenu> */}

      <div>
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
            パスワード：<input type="text" placeholder="password" value={inputPass} onChange={(e) => setInputPass(e.target.value)}/>
          </label>
        </form>

        <p>
          <input type="button" onClick={onClickAuth} value={"権限切り替え"}/>
          <input type="button" onClick={onClickLogOff} value={"ログオフ"}/>
          {/* <button onClick={onClickAuth}>権限切り替え</button> */}
          {/* <button onClick={onClickLogOff}>ログオフ</button> */}
        </p>
      </div>
    </>
  );
};