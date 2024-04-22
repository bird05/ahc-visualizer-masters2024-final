import React from 'react';
// Redux関連
import { useSelector } from '../../store/store';
// CSS
import styled from "@emotion/styled";
// MUI
// import Stack from '@mui/material/Stack';
// ビルトインフック
import { useState, useEffect } from 'react';
// 外部コンポーネント
import { BoardDisplay } from '../display/BoardDisplay';
import { CalcEndBoardPlace } from '../display/CalcScore';
// 関数インポート
import { zeroPadding, read_text_from_url, text_to_Input, text_to_Output } from '../../functions/CommonFunctions'
// 型
// import type { Input_type, Output_type } from "../types/typeFormat"

export const LastBoard = (props) => {
  const { p_id } = props;
  // useState==============================
  
  // Redux==============================
  const urls1 = useSelector((state) => state.output.urls1);
  const urls2 = useSelector((state) => state.output.urls2);
  const urls3 = useSelector((state) => state.output.urls3);
  const selectedSeed = useSelector((state) => state.statistics.selectedSeed);

  // useEffect==============================
  useEffect(() => {
    byoga(selectedSeed);
  },[selectedSeed])

  // 関数==============================
  // seedを指定して描画する関数
  async function byoga(seed_l:number){
    const in_text = await read_text_from_url(`https://raw.githubusercontent.com/bird05/ahc-visualizer-input/main/masters_qual/in/${zeroPadding(seed_l,4)}.txt`);
    const input_body=text_to_Input(in_text);

    const urlsAll = [urls1,urls2,urls3]
    for(let p_id=0; p_id<3; ++p_id){
      // 該当データが存在しない場合
      if(urlsAll[p_id].length<=selectedSeed){
        const canvas=BoardDisplay(
          200,200,
          {is_valid:false,N:0,M:0,eps:0,dlt:0,sx:0,sy:0,px:[],py:[],lx:[],ly:[],rx:[],ry:[],alp:[],fx:[],fy:[]},
          {is_valid:false,ope:[],ax:[],ay:[]}, // TODO:output_bodyの反映
          0,0, // TODO:output_bodyの反映
          [],
          0,
          {showTra:true,showTail:false,showCross:true} // 軌跡,しっぽ,×
        );
        const pa=document.getElementById(`lastBoard${p_id}`);
        if(pa) pa.replaceChildren(canvas);
      }else{
        const out_text = await read_text_from_url(urlsAll[p_id][selectedSeed]);
        const output_body=text_to_Output(out_text);
        // input_body,output_bodyから最終盤面を求める
        const res:any = CalcEndBoardPlace(input_body,output_body);
        const canvas=BoardDisplay(
          200,200,
          input_body,
          {is_valid:false,ope:[],ax:[],ay:[]}, // TODO:output_bodyの反映
          0,0, // TODO:output_bodyの反映
          [],
          0,
          {showTra:true,showTail:false,showCross:true} // 軌跡,しっぽ,×
        );
        const pa=document.getElementById(`lastBoard${p_id}`);
        if(pa) pa.replaceChildren(canvas);
      }
    }
  }
  
  console.log("LastBoard");
  return(
    <>
      <SDiv>
        Dataset:{p_id}
        <div id={`lastBoard${p_id}`}></div>
      </SDiv>
    </>
  );
};
const SDiv = styled.div`
margin-right:5px;
`