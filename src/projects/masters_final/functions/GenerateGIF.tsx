import React, {useState} from 'react'
// import { ReactDOM } from 'react-dom';
// Redux関連
import { useSelector } from '../store/store';
// 外部コンポーネント
import { BoardDisplay } from '../components/display/BoardDisplay';
import { move_player } from '../components/display/CalcScore';

import { createGIF } from 'gifshot';

function GenerateGIF() {
  // useState==============================
  const[progress, setProgress] = useState(0);
  // Redux==============================
  const input_body=useSelector((state) => state.input.b);
  const output_body=useSelector((state) => state.output.b);
  
  const handleClick = () => {
    // イメージ作成
    let images = new Array();
    // let board: number[][] = JSON.parse(JSON.stringify(input_body.a)); // ディープコピー
    // const [N,v,h]=[input_body.N,input_body.v,input_body.h];
    // const [s,d,e]=[output_body.s,output_body.d,output_body.e]
    // let [x1,y1,x2,y2]=[output_body.pi,output_body.pj,output_body.qi,output_body.qj];
    
    // // 最初の数フレーム
    // const initial_flame_cnt=20;
    // for(var turn=0; turn<initial_flame_cnt; ++turn){
    //   const canvas=BoardDisplay(
    //     500,500,
    //     input_body.is_valid,N,v,h,board,
    //     output_body.is_valid,x1,y1,x2,y2
    //   );
    //   const url=canvas.toDataURL();
    //   images[turn]=url;
    // }
    // // 動くフレーム
    // for(var turn=0; turn<output_body.s.length; ++turn){
    // // for(var turn=0; turn<1; ++turn){
    //   // console.log(turn);
      
    //   // 入替
    //   if(s[turn]){
    //     [board[x1][y1],board[x2][y2]]=[board[x2][y2],board[x1][y1]]; // swap
    //   }
    //   // 移動
    //   [x1,y1]=move_player(d[turn],x1,y1);
    //   [x2,y2]=move_player(e[turn],x2,y2);
      
    //   // 画像追加
    //   const canvas=BoardDisplay(
    //     500,500,
    //     input_body.is_valid,N,v,h,board,
    //     output_body.is_valid,x1,y1,x2,y2
    //   );
    //   const url=canvas.toDataURL();
    //   images[turn+initial_flame_cnt]=url;
    // }
    // // 最後の数フレーム
    // const end_flame_cnt=20;
    // for(var turn=0; turn<end_flame_cnt; ++turn){
    //   const canvas=BoardDisplay(
    //     500,500,
    //     input_body.is_valid,N,v,h,board,
    //     output_body.is_valid,x1,y1,x2,y2
    //   );
    //   const url=canvas.toDataURL();
    //   images[turn+output_body.s.length+initial_flame_cnt]=url;
    // }

    const options = {
      images: images,
      gifWidth: 500,
      gifHeight: 500,
      frameDuration: 1,
      sampleInterval: 10,
      progressCallback: (e) => setProgress(Math.trunc(e*100)),
    };

    createGIF(options, (obj) => {
      if(!obj.error){
        const link = document.createElement('a');
        link.download = 'vis.gif';
        link.href = obj.image;
        link.click();
        setProgress(0);
      }
    });
  };

  return (
    <div className="App">
      {input_body.is_valid && output_body.is_valid
      ?
      <input type="button" onClick={handleClick} value={"Save as Animation GIF"}/>
      // <button onClick={handleClick}>Click to create a GIF</button>
      :
      <input type="button" onClick={handleClick} value={"Save as Animation GIF"} disabled/>
      // <button onClick={handleClick} disabled>Click to create a GIF</button>
      }
      {progress !== 0 && <label> Creating GIF... {progress}%</label>}
    </div>
  )
}

export default GenerateGIF;