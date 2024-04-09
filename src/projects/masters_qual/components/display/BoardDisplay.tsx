import React from "react";
import { Stage, Layer, Rect, Line, Text, Circle } from 'react-konva';
import Konva from 'konva'

// 値を色に変換する関数
const val_to_hue = (val:number) => {
  const N:number=10;
  return 205-val/(N*N-1)*205;
}

export function BoardDisplay(
  is_valid:boolean,N:number,v:string[],h:string[],board:number[][],
  x1:number,y1:number,x2:number,y2:number){

  const canvas=document.createElement("canvas");
  canvas.width=500;
  canvas.height=500;
  const ctx=canvas.getContext('2d');
  if(ctx){
    if(is_valid){
      // 背景
      // ctx.fillStyle = 'rgb(255,255,255)';
      // ctx.fillRect(0,0,500,500);
      // 四角形
      for(var i=0; i<N; ++i){
        for(var j=0; j<N; ++j){
          ctx.fillStyle = 'hsla('+val_to_hue(board[i][j])+',100%,50%,.8)';
          ctx.fillRect(j*500/N, i*500/N,500/N, 500/N);
        }
      }
      // テキスト
      ctx.fillStyle = 'black';
      ctx.font = '10pt Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = "middle";
      for(var i=0; i<N; ++i){
        for(var j=0; j<N; ++j){
          ctx.fillText(board[i][j].toString(),(j+0.5)*500/N,(i+0.5)*500/N);
        }
      }
      // ライン
      ctx.lineWidth=0.5;
      ctx.beginPath();
      for(var i=1; i<N; ++i){ // 縦
        ctx.moveTo(50*i,0);
        ctx.lineTo(50*i,500);
      }
      for(var i=1; i<N; ++i){ // 横
        ctx.moveTo(0,50*i);
        ctx.lineTo(500,50*i);
      }
      ctx.closePath();
      ctx.stroke();
      // 壁
      ctx.lineWidth=3;
      ctx.beginPath();
      for(var i=0; i<N; ++i){ // 縦
        for(var j=0; j<N-1; ++j){
          if(v[i][j]=='0') continue;
          ctx.moveTo(j*50+50,50*i);
          ctx.lineTo(j*50+50,50*i+50);
        }
      }
      for(var i=0; i<N-1; ++i){ // 横
        for(var j=0; j<N; ++j){
          if(h[i][j]=='0') continue;
          ctx.moveTo(j*50,50*i+50);
          ctx.lineTo(j*50+50,50*i+50);
        }
      }
      ctx.closePath();
      ctx.stroke();
      // プレイヤー
      ctx.fillStyle = 'hsla(0,100%,50%,.5)';
      ctx.beginPath();
      ctx.arc((y1+0.5)*(500/N), (x1+0.5)*(500/N), 125/N, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.fillStyle = 'hsla(205,100%,50%,.5)';
      ctx.beginPath();
      ctx.arc((y2+0.5)*(500/N), (x2+0.5)*(500/N), 125/N, 0, Math.PI * 2, true);
      ctx.fill();
    }
    // 枠線
    ctx.lineWidth=1;
    ctx.strokeRect(0,0,500,500);
  }
  // console.log(typeof(canvas));
  return canvas;
}