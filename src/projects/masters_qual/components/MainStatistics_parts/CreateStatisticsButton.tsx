import React from 'react';
// Redux関連
import { useSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setAll, setFiltered } from '../../store/statisticsInfoSlice';
// CSS
import styled from "@emotion/styled";
// 外部コンポーネント
import { CalcEndScore } from '../display/CalcScore';
// 関数インポート
import { zeroPadding, read_text_from_url, text_to_Input, text_to_Output } from '../../functions/CommonFunctions';

export const CreateStatisticsButton = () => {
  // useState==============================

  // Redux==============================
  const urls1=useSelector((state) => state.output.urls1);
  const urls2=useSelector((state) => state.output.urls2);
  const urls3=useSelector((state) => state.output.urls3);
  const dispatch = useDispatch();

  // 関数==============================
  async function createStatistics(){
    // t,seed,score1,score2,score3
    const res = new Array();
    const urlsAll = [urls1,urls2,urls3];

    for(let seed_id=0; seed_id<100; ++seed_id){
      // 入力データ取り込み
      const text = await read_text_from_url(`https://raw.githubusercontent.com/bird05/ahc-visualizer-input/main/masters_qual/in/${zeroPadding(seed_id,4)}.txt`);
      const input_body=text_to_Input(text);
      
      let score123:number[] = [-1,-1,-1];
      for(let p_id=0; p_id<3; ++p_id){
        if(urlsAll[p_id].length<=seed_id) continue;
        const text = await read_text_from_url(urlsAll[p_id][seed_id]);
        const output_body=text_to_Output(text);
        score123[p_id]=CalcEndScore(input_body, output_body);
      }
      const buf = {
        t: input_body.t,
        seed: seed_id,
        score1: score123[0],
        score2: score123[1],
        score3: score123[2],
      }
      res.push(buf);
    }

    dispatch(setAll(res));
    dispatch(setFiltered(res));
  };

  console.log("CreateStatisticsButton");
  return(
    <>
      <input type="button" onClick={createStatistics} value={"計算開始"}/>
    </>
  );
};