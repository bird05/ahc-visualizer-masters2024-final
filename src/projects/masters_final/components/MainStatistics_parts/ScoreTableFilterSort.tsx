import React from 'react';
// Redux関連
import { useSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setFiltered } from '../../store/statisticsInfoSlice';
// CSS
import styled from "@emotion/styled";
// MUI
import Stack from '@mui/material/Stack';
// ビルトインフック
import { useState } from 'react';
// 外部コンポーネント
// import { CalcEndScore } from '../display/CalcScore';
// 関数インポート
// import { zeroPadding, read_text_from_url, text_to_Input, text_to_Output } from '../../functions/CommonFunctions';

export const ScoreTableFilterSort = () => {
  // useState==============================

  // Redux==============================
  const statistics_body = useSelector((state) => state.statistics.b);
  const t_store = useSelector((state) => state.statistics.t);
  const dispatch = useDispatch();
  // useState==============================
  // リアルタイムに情報を受け取る==============================
  const [inputT, setInputT] = useState(t_store); // inputで与えられるt(t_storeはpropsで受け取らないとだめかも)
  // 関数==============================
  const setType: React.ChangeEventHandler<HTMLSelectElement> = (ev) => {
    if(ev.target.value==="未選択") setInputT(-1);
    else setInputT(Number(ev.target.value));
  };
  const FilterAndSort = () => {
    // フィルター未選択の場合
    if(inputT===-1){
      dispatch(setFiltered(statistics_body));
    }else{
      // t,seed,score1,score2,score3
      const res = new Array();
      for(let i=0; i<statistics_body.length; ++i){
        const buf = statistics_body[i];
        if(Number(buf.t)!==inputT) continue; // フィルタ不一致スキップ
        res.push(buf);
      }
      dispatch(setFiltered(res));
    }
  }

  console.log("ScoreTableFilterSort");
  return(
    <>
      <Stack direction="row" spacing={2}>
        <STable>
          <caption></caption>
          <tbody>
            <tr>
              <STh>t</STh>
            </tr>
            <STr>
              <STd>
                <SSelect onChange={setType} value={inputT}>
                  <option value="未選択">未選択</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                </SSelect>
              </STd>
            </STr>
          </tbody>
        </STable>

        <input type="button" onClick={FilterAndSort} value={"絞り込み"}/>
        
      </Stack>
    </>
  );
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