import React from "react";
// ビルトインフック
import { useState,useEffect } from "react";
// Redux
import { useSelector } from '../../store/store';
// 外部コンポーネント
// import { CalcScoreSequence } from './CalcScore';
import { ScoreChart } from './ScoreChart';

export const ScoreChartController = (props) => {
  const { chartNum } = props;
  // useState==============================
  const [dataAll, setDataAll] = useState<any[]>([]); // 全てのデータセット
  // Redux==============================
  const input_body=useSelector((state) => state.input.b);
  const output_body=useSelector((state) => state.output.b);
  const seed = useSelector((state) => state.input.seed);
  const is_input_complete = useSelector((state) => state.input.isCompleteSet);
  const is_output_complete = useSelector((state) => state.output.isCompleteSet);

  // useEffect==============================
  useEffect(() => {
    // データを作る
    const dataAll_l = new Array();
    if(chartNum===1 && is_input_complete && is_output_complete){
      // dataAll_l[0]=CalcScoreSequence(input_body,output_body);
      setDataAll(dataAll_l);
    }
  },[is_input_complete,is_output_complete]);
  useEffect(() => {
    // データを作る
    const dataAll_l = new Array();
    if(chartNum===2){
      dataAll_l[0]=data1;
      dataAll_l[1]=data2;
      setDataAll(dataAll_l);
    }else if(chartNum===3){
      dataAll_l[0]=data1;
      dataAll_l[1]=data2;
      dataAll_l[2]=data3;
      setDataAll(dataAll_l);
    }else{
      dataAll_l[0]=[];
      setDataAll(dataAll_l);
    }
  },[seed]);

  const data1 = [1,1,1,1,1,1,1];
  const data2 = [2,2,2,2,2,2,2];
  const data3 = [3,3,3,3,3,3,3];

  console.log("ScoreChartConroller");
  return(
    <ScoreChart dataAll={dataAll}/>
  );
}






