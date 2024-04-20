// 型
import { Input_type, Output_type } from "../../types/typeFormat"
// 関数インポート
import { val_to_hue } from '../../functions/CommonFunctions'

// x,y座標をcanvas座標に変換する関数(arcに対応)
const conv_coord = function(x:number, y:number){
  return [x+100000,100000-y];
}
// x,y座標をcanvas座標に変換する関数(fillRect,lineに対応)
const conv_coord2 = function(x:number, y:number){
  return [x,100000-y];
}

export function BoardDisplay(
  canv_w:number, canv_h:number,
  input_is_valid:boolean,
  px:number[], py:number[], // 目的地の位置
  lx:number[],ly:number[],rx:number[],ry:number[],// 壁の位置
  // output_is_valid:boolean,
  dro_x:number,dro_y:number // ドローンの位置
  // input_body:Input_type, output_body:Output_type
  ){
  // const [input_is_valid,N,M,eps,dlt,sx,sy,px,py,lx,ly,rx,ry,alp,fx,fy]=[input_body.is_valid,input_body.N,input_body.M,input_body.eps,input_body.dlt,input_body.sx,input_body.sy,input_body.px,input_body.py,input_body.lx,input_body.ly,input_body.rx,input_body.ry,input_body.alp,input_body.fx,input_body.fy];
  // const [output_is_valid,ope,ax,ay]=[output_body.is_valid,output_body.ope,output_body.ax,output_body.ay];
  // let [x1,y1,x2,y2]=[output_body.pi,output_body.pj,output_body.qi,output_body.qj];

  const canvas=document.createElement("canvas");
  canvas.width=canv_w;
  canvas.height=canv_h;
  const CANV_SIZ=canv_w;
  const ctx=canvas.getContext('2d');
  if(ctx){
    if(input_is_valid){
      const LEN=CANV_SIZ/200000;

      // 目的地
      ctx.fillStyle = 'hsla(0,100%,50%,1.0)';
      for(let i=0; i<px.length; ++i){
        ctx.beginPath();
        const [x,y] = conv_coord(px[i],py[i]); // 座標変換
        ctx.arc(x*LEN, y*LEN, 1000*LEN, 0, Math.PI * 2, true); // x,y,半径,開始角度,終了角度,時計回り
        ctx.fill();
      }
      // 壁
      ctx.lineWidth=1.5;
      ctx.strokeStyle = 'rgba(100,100,100,1.0)';//'hsla(205,100%,50%,.8)';
      ctx.beginPath();
      for(let i=0; i<px.length; ++i){
        const [x1,y1] = conv_coord(lx[i],ly[i]); // 座標変換
        const [x2,y2] = conv_coord(rx[i],ry[i]);
        ctx.moveTo(x1*LEN, y1*LEN);
        ctx.lineTo(x2*LEN, y2*LEN);
      }      
      ctx.closePath();
      ctx.stroke();
      ctx.strokeStyle = 'rgba(0,0,0,1.0)'; // 線の色を戻す
      // ドローン
      ctx.fillStyle = 'hsla(205,100%,50%,0.5)';
      ctx.beginPath();
      const [x,y] = conv_coord(dro_x,dro_y); // 座標変換
      ctx.arc(x*LEN, y*LEN,3000*LEN, 0, Math.PI * 2, true); // x,y,半径,開始角度,終了角度,時計回り
      ctx.fill();
    }
    // 枠線
    ctx.lineWidth=1;
    ctx.strokeRect(0,0,canv_w,canv_h);
  }
  // console.log(typeof(canvas));
  return canvas;
}
/*
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
    if(input_is_valid && Number(N)===board.length){
      const LEN=canv_w/N;
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
      // ctx.font = `${canv_w/5/N}pt Arial`; // '10pt Arial';
      ctx.font = `${LEN/5}pt Arial`; // '10pt Arial';
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
*/