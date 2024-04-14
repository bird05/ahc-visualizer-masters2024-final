import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Redux関連
import { useSelector } from './store/store';
// CSS
import styled from "@emotion/styled";

// //import * as wasm from "atcoder-gacha01";
// import useMedia from "use-media";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // ビルトインフック
// import { useState, memo} from 'react';
// // 外部コンポーネント
import { SideBar } from './components/SideBar';
// import { Gacha } from './components/Gacha';
// import { GachaContentAll } from './components/GachaContentAll';
// import { Main } from './components/old/Main';
import { Main_Single } from './components/Main_Single';
import { Main_InputSurvey } from './components/Main_InputSurvey';

// // Redux
// import { useSelector } from './store/store';
// import { useDispatch, shallowEqual } from "react-redux";


const App = () => {
  const root:string = "https://ahc-visualizer.onrender.com/";
  // Redux==============================
  const authnum = useSelector((state) => state.user.authnum);

  const isWide: boolean = true;
  const mainElemHeight = 500;

  // Styled CSS==============================
  const SDivAll = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: ${isWide?"row":"column"};
  `
  const SDivSide = styled.div`
    ${isWide?"width: 180px":"height: 100%"};
    //padding-top: 5px;
    //padding-left: 5px;
    margin-top: 5px;
    margin-left: 5px;
    margin-right:5px;
    box-sizing: border-box;
    background-color: #ffffff;//blue;
  `
  const SDivMain = styled.div`
    height: ${isWide?"100vh":"100%"};
    min-height: ${mainElemHeight}px;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    background-color: #ffffff;//green;
    border-left: 1px solid #333;
  `
  const SDivBlack = styled.div`
  color:black;
  `
  return(
    <>
      <BrowserRouter>
        <SDivAll>
          <SDivSide>
            <SideBar/>
          </SDivSide>
          <SDivMain>
            {authnum!==-1
            ?
            <Routes>
              <Route path={'/'} element={<Main_Single/>} />
              <Route path={'/*'} element={<Main_Single/>} />
              <Route path={'/single'} element={<Main_Single/>} />
              <Route path={'/input_survey'} element={<Main_InputSurvey/>} />
            </Routes>
            // <Main_Single/>
            // <Main_InputSurvey/>
            :
            <SDivBlack>ID、パスワードを入力してください。</SDivBlack>
            }
          </SDivMain>
        </SDivAll>
      </BrowserRouter>
    </>
  );
};

export default App


// import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import init, { greet } from '../wasm/pkg/wasm'

// function App() {
//   const [count, setCount] = useState(0)

//   useEffect(() => {
//     init()
//   }, [])

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => greet('App')}>
//           greet
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
