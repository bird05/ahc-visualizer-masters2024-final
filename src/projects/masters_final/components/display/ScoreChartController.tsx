import React from "react";
// ビルトインフック
import { useState,useEffect } from "react";
// Redux
import { useSelector } from '../../store/store';
// 外部コンポーネント
import { CalcScoreSequence } from './CalcScore';
import { ScoreChart } from './ScoreChart';
// 関数インポート
import { zeroPadding, read_text_from_url, text_to_Input, text_to_Output } from '../../functions/CommonFunctions'

export const ScoreChartController = (props) => {
  const { chartNum } = props;
  // useState==============================
  const [dataAll, setDataAll] = useState<any[]>([]); // 全てのデータセット
  // Redux==============================
  const input_body=useSelector((state) => state.input.b);
  const output_body=useSelector((state) => state.output.b);
  const input_type = useSelector((state) => state.input.type);
  const seed = useSelector((state) => state.input.seed);
  const is_input_complete = useSelector((state) => state.input.isCompleteSet);
  const is_output_complete = useSelector((state) => state.output.isCompleteSet);

  const selectedSeed = useSelector((state) => state.statistics.selectedSeed);
  const urls1 = useSelector((state) => state.output.urls1);
  const urls2 = useSelector((state) => state.output.urls2);
  const urls3 = useSelector((state) => state.output.urls3);

  // useEffect==============================
  useEffect(() => {
    // データを作る
    const dataAll_l = new Array();
    if(chartNum===1 && is_input_complete && is_output_complete){
      dataAll_l[0]=CalcScoreSequence(input_body,output_body).score;
      setDataAll(dataAll_l);
    }
  },[is_input_complete,is_output_complete,input_body,output_body,seed]);
  useEffect(() => {
    if(chartNum===1) return;
    (async() => {
      // データを作る
      const dataAll_l = new Array();
      // const text = await read_text_from_url(`https://raw.githubusercontent.com/bird05/ahc-visualizer-input/main/masters_final/in${input_type}/${zeroPadding(seed,4)}.txt`);
      const text = await read_text_from_url(`https://raw.githubusercontent.com/bird05/ahc-visualizer-input/main/masters_final/in${input_type}/${zeroPadding(selectedSeed,4)}.txt`);
      const input_body=text_to_Input(text);
      if(chartNum===2){
        dataAll_l[0]=data1;
        dataAll_l[1]=data2;
        setDataAll(dataAll_l);
      }else if(chartNum===3){
        
        const urlsAll = [urls1,urls2,urls3]
        for(let p_id=0; p_id<3; ++p_id){
          let buf:any=[];
          // 該当データが存在しない場合
          if(urlsAll[p_id].length<=selectedSeed){
            buf=[];
          }else{
            const out_text = await read_text_from_url(urlsAll[p_id][selectedSeed]);
            const output_body=text_to_Output(out_text);
            buf=CalcScoreSequence(input_body,output_body).score;
          }
          dataAll_l[p_id]=buf;
        }
        // dataAll_l[0]=CalcScoreSequence(input_body,output_body);
        // dataAll_l[1]=data2;
        // dataAll_l[2]=data3;
        setDataAll(dataAll_l);
      }else{
        dataAll_l[0]=[];
        setDataAll(dataAll_l);
      }
    })()
  },[selectedSeed]);

  const data1 = [1,1,1,1,1,1,1];
  const data2 = [2,2,2,2,2,2,2];
  const data3 = [3,3,3,3,3,3,3];

  console.log("ScoreChartConroller");
  return(
    <ScoreChart dataAll={dataAll}/>
  );
}






