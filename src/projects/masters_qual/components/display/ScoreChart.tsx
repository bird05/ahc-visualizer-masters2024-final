import React from "react";
// ビルトインフック
import { useState,useEffect } from "react";
// CSS
import styled from "@emotion/styled";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const colors = ['255,99,132', '53,162,235', '75,192,192'];

export const ScoreChart = (props) => {
  const { dataAll } = props;
  // useState==============================
  const [labels, setLabels] = useState<number[]>([]); // ラベル
  const [datasets, setDatasets] = useState<any[]>([]); // データセット
  // useEffect==============================
  useEffect(() => {
    // ラベル作成
    const labels_l:number[] = new Array();
    let lim=0;
    for(let i=0; i<dataAll.length; ++i) lim=Math.max(lim,dataAll[i].length);
    for(let i=0; i<lim; ++i) labels_l[i]=i;
    setLabels(labels_l);
    // データセット作成
    const datasets_l = new Array();
    for(let i=0; i<dataAll.length; ++i){
      const one_dataset = {
        label: `Dataset ${i+1}`,
        data: dataAll[i],
        borderColor: `rgb(${colors[i]})`,
        backgroundColor: `rgba(${colors[i]}, 0.5)`,
      }
      datasets_l[i]=one_dataset;
    }
    setDatasets(datasets_l);
  },[dataAll])
  // Styled CSS==============================
  const SDiv = styled.div`
  display: flex;
  margin-left:5px;
  // width: 500px;
  height: 500px;
  `
  // Redux==============================
  // const input_body=useSelector((state) => state.input.b);
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Score Chart',
      }
    },
  };

  const data = {
    labels,
    datasets,
  };

  return (
    <SDiv>
      <Line options={options} data={data}/>
    </SDiv>
  );
}









