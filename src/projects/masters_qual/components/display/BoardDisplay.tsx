// import { Stage, Layer, Rect, Line, Text, Circle } from 'react-konva';
// import Konva from 'konva'
// 関数インポート
import { val_to_hue } from '../../functions/CommonFunctions'

export function BoardDisplay(
  canv_w:number, canv_h:number,
  input_is_valid:boolean, N:number, v:string[], h:string[], board:number[][],
  output_is_valid:boolean, x1:number, y1:number, x2:number, y2:number){

  const canvas=document.createElement("canvas");
  canvas.width=canv_w;
  canvas.height=canv_h;
  const CANV_SIZ=canv_w;
  const ctx=canvas.getContext('2d');
  if(ctx){
    if(input_is_valid){
      const LEN=500/N;
      // 背景
      // ctx.fillStyle = 'rgb(255,255,255)';
      // ctx.fillRect(0,0,500,500);
      // 四角形
      for(var i=0; i<N; ++i){
        for(var j=0; j<N; ++j){
          ctx.fillStyle = 'hsla('+val_to_hue(N,board[i][j])+',100%,50%,.8)';
          ctx.fillRect(j*LEN, i*LEN, LEN, LEN);
        }
      }
      // テキスト
      ctx.fillStyle = 'black';
      ctx.font = `${100/N}pt Arial`; // '10pt Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = "middle";
      for(var i=0; i<N; ++i){
        for(var j=0; j<N; ++j){
          ctx.fillText(board[i][j].toString(), (j+0.5)*LEN,(i+0.5)*LEN);
        }
      }
      // ライン
      ctx.lineWidth=0.5;
      ctx.beginPath();
      for(var i=1; i<N; ++i){ // 縦
        ctx.moveTo(i*LEN, 0);
        ctx.lineTo(i*LEN, CANV_SIZ);
      }
      for(var i=1; i<N; ++i){ // 横
        ctx.moveTo(0, i*LEN);
        ctx.lineTo(CANV_SIZ, i*LEN);
      }
      ctx.closePath();
      ctx.stroke();
      // 壁
      ctx.lineWidth=3;
      ctx.beginPath();
      for(var i=0; i<N; ++i){ // 縦
        for(var j=0; j<N-1; ++j){
          if(v[i][j]=='0') continue;
          ctx.moveTo((j+1)*LEN,i*LEN);
          ctx.lineTo((j+1)*LEN,(i+1)*LEN);
        }
      }
      for(var i=0; i<N-1; ++i){ // 横
        for(var j=0; j<N; ++j){
          if(h[i][j]=='0') continue;
          ctx.moveTo(j*LEN,(i+1)*LEN);
          ctx.lineTo((j+1)*LEN,(i+1)*LEN);
        }
      }
      ctx.closePath();
      ctx.stroke();
      if(output_is_valid){
        // プレイヤー
        ctx.fillStyle = 'hsla(0,100%,50%,.5)';
        ctx.beginPath();
        ctx.arc((y1+0.5)*LEN, (x1+0.5)*LEN, (CANV_SIZ/4)/N, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.fillStyle = 'hsla(205,100%,50%,.5)';
        ctx.beginPath();
        ctx.arc((y2+0.5)*LEN, (x2+0.5)*LEN, (CANV_SIZ/4)/N, 0, Math.PI * 2, true);
        ctx.fill();
      }
    }
    // 枠線
    ctx.lineWidth=1;
    ctx.strokeRect(0,0,canv_w,canv_h);
  }
  // console.log(typeof(canvas));
  return canvas;
}