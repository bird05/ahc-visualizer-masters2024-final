// import { Stage, Layer, Rect, Line, Text, Circle } from 'react-konva';
// import Konva from 'konva'
// 関数インポート
import { val_to_hue } from '../../functions/CommonFunctions'

// x,y座標をcanvas座標に変換する関数(arcに対応)
const conv_coord = function(x:number, y:number){
  return [1000-y,x];
}
// x,y座標をcanvas座標に変換する関数(fillRect,lineに対応)
const conv_coord2 = function(x:number, y:number){
  return [x,1000-y];
}

export function BoardDisplay(
  canv_w:number, canv_h:number,
  input_is_valid:boolean, N:number, M:number, a:number[], b:number[],
  output_is_valid:boolean, c:number[], d:number[], V:number, t:number[], r:number[],
  turn:number){

  const canvas=document.createElement("canvas");
  canvas.width=canv_w;
  canvas.height=canv_h;
  const CANV_SIZ=canv_w;
  const ctx=canvas.getContext('2d');
  if(ctx){
    if(input_is_valid && Number(N)===a.length){
      const LEN=CANV_SIZ/1000;

      // 背景
      // ctx.fillStyle = 'rgb(255,255,255)';
      // ctx.fillRect(0,0,500,500);
      if(input_is_valid){
        // 惑星
        ctx.fillStyle = 'hsla(0,100%,50%,.5)';
        for(let i=0; i<N; ++i){
          ctx.beginPath();
          const [x,y] = conv_coord(a[i],b[i]); // 座標変換
          ctx.arc(y*LEN, x*LEN, 10*LEN, 0, Math.PI * 2, true); // x,y,半径,開始角度,終了角度,時計回り
          ctx.fill();
        }
        
        if(output_is_valid){
          // 宇宙ステーション
          // ctx.fillStyle = 'hsla('+val_to_hue(N,board[i][j])+',100%,50%,.8)';
          const Rect_size=20;
          ctx.fillStyle = 'hsla(205,100%,50%,.8)';
          for(let i=0; i<M; ++i){
            const [x,y]=conv_coord2(c[i],d[i]);  // 座標変換
            ctx.fillRect((x-Rect_size/2)*LEN, (y-Rect_size/2)*LEN, Rect_size*LEN, Rect_size*LEN);
            // ctx.fillRect((x)*LEN, (y)*LEN, 100*LEN, 100*LEN);
          }

          // 経路
          ctx.lineWidth=1.5;
          ctx.strokeStyle = 'rgba(100,100,100,.8)';//'hsla(205,100%,50%,.8)';
          ctx.beginPath();
          let cx:number, cy:number, nx:number, ny:number;
          let idx=r[0]-1;
          if(t[0]===1){ // 惑星を訪問
            [cx,cy] = conv_coord2(a[idx],b[idx]); // 座標変換
          }else{ // 宇宙ステーションを訪問
            [cx,cy] = conv_coord2(c[idx],d[idx]); // 座標変換
          }
          for(let i=1; i<V; ++i){
            [nx,ny]=[cx,cy];
            idx=r[i]-1;
            if(t[i]===1){ // 惑星を訪問
              [cx,cy] = conv_coord2(a[idx],b[idx]); // 座標変換
            }else{ // 宇宙ステーションを訪問
              [cx,cy] = conv_coord2(c[idx],d[idx]); // 座標変換
            }
            ctx.moveTo(cx*LEN, cy*LEN);
            ctx.lineTo(nx*LEN, ny*LEN);
          }
          ctx.closePath();
          ctx.stroke();
          ctx.strokeStyle = 'rgba(0,0,0,1.0)'; // 線の色を戻す

          // 宇宙船
          ctx.fillStyle = 'hsla(100,100%,50%,.5)';
          ctx.beginPath();
          if(t[turn]===1){ // 惑星を訪問
            const [x,y] = conv_coord(a[r[turn]-1],b[r[turn]-1]); // 座標変換
            ctx.arc(y*LEN, x*LEN, 20*LEN, 0, Math.PI * 2, true); // x,y,半径,開始角度,終了角度,時計回り
          }else{ // 宇宙ステーションを訪問
            const [x,y] = conv_coord(c[r[turn]-1],d[r[turn]-1]); // 座標変換
            ctx.arc(y*LEN, x*LEN, 20*LEN, 0, Math.PI * 2, true); // x,y,半径,開始角度,終了角度,時計回り
          }
          ctx.fill();
        }
      }
      

      // // 四角形
      // for(var i=0; i<N; ++i){
      //   for(var j=0; j<N; ++j){
      //     ctx.fillStyle = 'hsla('+val_to_hue(N,board[i][j])+',100%,50%,.8)';
      //     ctx.fillRect(j*LEN, i*LEN, LEN, LEN);
      //   }
      // }
      // // テキスト
      // ctx.fillStyle = 'black';
      // // ctx.font = `${canv_w/5/N}pt Arial`; // '10pt Arial';
      // ctx.font = `${LEN/5}pt Arial`; // '10pt Arial';
      // ctx.textAlign = 'center';
      // ctx.textBaseline = "middle";
      // for(var i=0; i<N; ++i){
      //   for(var j=0; j<N; ++j){
      //     ctx.fillText(board[i][j].toString(), (j+0.5)*LEN,(i+0.5)*LEN);
      //   }
      // }
      // // ライン
      // ctx.lineWidth=0.5;
      // ctx.beginPath();
      // for(var i=1; i<N; ++i){ // 縦
      //   ctx.moveTo(i*LEN, 0);
      //   ctx.lineTo(i*LEN, CANV_SIZ);
      // }
      // for(var i=1; i<N; ++i){ // 横
      //   ctx.moveTo(0, i*LEN);
      //   ctx.lineTo(CANV_SIZ, i*LEN);
      // }
      // ctx.closePath();
      // ctx.stroke();
      // // 壁
      // ctx.lineWidth=3;
      // ctx.beginPath();
      // for(var i=0; i<N; ++i){ // 縦
      //   for(var j=0; j<N-1; ++j){
      //     if(v[i][j]=='0') continue;
      //     ctx.moveTo((j+1)*LEN,i*LEN);
      //     ctx.lineTo((j+1)*LEN,(i+1)*LEN);
      //   }
      // }
      // for(var i=0; i<N-1; ++i){ // 横
      //   for(var j=0; j<N; ++j){
      //     if(h[i][j]=='0') continue;
      //     ctx.moveTo(j*LEN,(i+1)*LEN);
      //     ctx.lineTo((j+1)*LEN,(i+1)*LEN);
      //   }
      // }
      // ctx.closePath();
      // ctx.stroke();
      // if(output_is_valid){
      //   // プレイヤー
      //   ctx.fillStyle = 'hsla(0,100%,50%,.5)';
      //   ctx.beginPath();
      //   ctx.arc((y1+0.5)*LEN, (x1+0.5)*LEN, (CANV_SIZ/4)/N, 0, Math.PI * 2, true);
      //   ctx.fill();
      //   ctx.fillStyle = 'hsla(205,100%,50%,.5)';
      //   ctx.beginPath();
      //   ctx.arc((y2+0.5)*LEN, (x2+0.5)*LEN, (CANV_SIZ/4)/N, 0, Math.PI * 2, true);
      //   ctx.fill();
      // }
    }
    // 枠線
    ctx.lineWidth=1;
    ctx.strokeRect(0,0,canv_w,canv_h);
  }
  // console.log(typeof(canvas));
  return canvas;
}

// arc: https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/arc
// fillRect: https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/fillRect
