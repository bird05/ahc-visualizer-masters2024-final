// 型
import { Input_type, Output_type } from "../../types/typeFormat"
// 関数インポート
import { val_to_hue } from '../../functions/CommonFunctions'

// x,y座標をcanvas座標に変換する関数(arc,lineに対応)
const conv_coord = function(x:number, y:number){
  return [x+100000,100000-y];
}
// バツ印を描画する(ctx,中心のxy座標,大きさ,透過度)
const cross = function (ctx:any, cx:number, cy:number, siz:number, a:number){
  ctx.lineWidth=1.5;
  ctx.strokeStyle = `rgba(255,0,0,${a})`; // 赤
  ctx.beginPath();
  ctx.moveTo(cx-siz/2, cy-siz/2);
  ctx.lineTo(cx+siz/2, cy+siz/2);
  ctx.moveTo(cx+siz/2, cy-siz/2);
  ctx.lineTo(cx-siz/2, cy+siz/2);
  ctx.closePath();
  ctx.stroke();
  ctx.strokeStyle = 'rgba(0,0,0,1.0)'; // 黒に戻す
}

export function BoardDisplay(
  canv_w:number, canv_h:number,
  input_body:Input_type,
  output_body:Output_type,
  dro_x:number,dro_y:number, // ドローンの位置
  res:any,                   // 軌跡等
  turn:number,               // ターン数
  cond:any,                  // 描画条件
  ){
  const {is_valid:input_is_valid,N,M,eps,dlt,sx,sy,px,py,lx,ly,rx,ry,alp,fx,fy}=input_body;
  const {is_valid:output_is_valid,ope,ax,ay}=output_body;
  const {showTra,showTail,showCross}=cond;
  const {tra_lx,tra_ly,tra_rx,tra_ry,is_col,col_x,col_y,mes_x,mes_y,vis_turn} = res;
  const canvas=document.createElement("canvas");
  canvas.width=canv_w;
  canvas.height=canv_h;
  const CANV_SIZ=canv_w;
  const ctx=canvas.getContext('2d');
  if(ctx){
    if(input_is_valid){
      const LEN=CANV_SIZ/200000;
      
      // 目的地
      ctx.fillStyle = 'hsla(205,100%,50%,1.0)';
      for(let i=0; i<px.length; ++i){
        if(vis_turn.length>0){
          if(vis_turn[i]<=turn) ctx.fillStyle = 'hsla(205,100%,50%,1.0)'; // 訪問済
          else ctx.fillStyle = 'hsla(100,100%,50%,1.0)'; // 未訪問
        }
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
      // 軌跡
      /*
      for(let i=0; i<tra.length; ++i){
        ctx.beginPath();
        const [x1,y1] = conv_coord(tra[i].lx,tra[i].ly); // 座標変換
        const [x2,y2] = conv_coord(tra[i].rx,tra[i].ry);
        // 衝突あり
        if(tra[i].is_col){
          ctx.lineWidth = 13.0;
          ctx.strokeStyle = 'hsla(205,100%,50%,.8)';
        // 衝突なし
        }else{
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = 'hsla(100,100%,50%,.8)';
        }
        ctx.moveTo(x1*LEN, y1*LEN);
        ctx.lineTo(x2*LEN, y2*LEN);
        ctx.closePath();
        ctx.stroke();
      }
      */
      
      if(showTra){
        ctx.beginPath();
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = 'hsla(205,100%,20%,.5)';
        for(let i=0; i<tra_lx.length; ++i){
          const [x1,y1] = conv_coord(tra_lx[i],tra_ly[i]); // 座標変換
          const [x2,y2] = conv_coord(tra_rx[i],tra_ry[i]);
          ctx.moveTo(x1*LEN, y1*LEN);
          ctx.lineTo(x2*LEN, y2*LEN);
        }
        ctx.closePath();
        ctx.stroke();
      }
      // 計測線
      if(ope[turn]==='S'){
        ctx.beginPath();
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = 'hsla(60,100%,30%,.5)';
        const [x1,y1] = conv_coord(dro_x,dro_y); // 座標変換
        const [x2,y2] = conv_coord(mes_x[turn],mes_y[turn]); // 座標変換
        ctx.moveTo(x1*LEN, y1*LEN);
        ctx.lineTo(x2*LEN, y2*LEN);
        ctx.closePath();
        ctx.stroke();
      }
      // しっぽ
      if(showTail){
        if(tra_lx.length>0){
          for(let i=0; i<10; ++i){
            let t_turn=turn-i-1;
            if(t_turn<0) break;
            if(t_turn>tra_lx.length) continue;
            ctx.beginPath();
            // 太さ変更
            ctx.lineWidth = 3*(10-i)/10;
            ctx.strokeStyle = `hsla(205,100%,20%,1.0)`;
            // 透過度変更
            // ctx.lineWidth = 3.0;            
            // ctx.strokeStyle = `hsla(205,100%,20%,${(10-i)/10})`;
            const [x1,y1] = conv_coord(tra_lx[t_turn],tra_ly[t_turn]); // 座標変換
            const [x2,y2] = conv_coord(tra_rx[t_turn],tra_ry[t_turn]);
            ctx.moveTo(x1*LEN, y1*LEN);
            ctx.lineTo(x2*LEN, y2*LEN);
            ctx.closePath();
            ctx.stroke();
          }
        }
      }
      
      // ×印
      if(showCross){
        for(let i=0; i<tra_lx.length; ++i){
          if(is_col[i]){
            const [tx,ty] = conv_coord(col_x[i],col_y[i]);
            cross(ctx,tx*LEN,ty*LEN,3000*LEN,1.0);
          }
        }
        ctx.strokeStyle = 'rgba(0,0,0,1.0)'; // 線の色を戻す
      }else{
        // d_turnだけ表示
        const d_turn:number = 35;
        if(tra_lx.length>0){
          for(let i=0; i<d_turn; ++i){
            let t_turn=turn-i;
            if(t_turn<0) break;
            if(t_turn>=tra_lx.length) continue;
            if(is_col[t_turn]){
              const [tx,ty] = conv_coord(col_x[t_turn],col_y[t_turn]);
              // 最後10ターンで1.0から0.1まで減少
              let alpha=Math.min(1.0,(d_turn-i)/10)
              cross(ctx,tx*LEN,ty*LEN,3000*LEN,alpha);
            }
          }
          ctx.strokeStyle = 'rgba(0,0,0,1.0)'; // 線の色を戻す
        }
      }
      
      // ドローン
      ctx.fillStyle = 'hsla(205,100%,50%,0.5)';
      ctx.beginPath();
      const [x,y] = conv_coord(dro_x,dro_y); // 座標変換
      ctx.arc(x*LEN, y*LEN,3000*LEN, 0, Math.PI * 2, true); // x,y,半径,開始角度,終了角度,時計回り
      ctx.fill();
      // ドローン中心
      ctx.fillStyle = 'hsla(205,100%,50%,1.0)';
      ctx.beginPath();
      ctx.arc(x*LEN, y*LEN,1, 0, Math.PI * 2, true); // x,y,半径,開始角度,終了角度,時計回り
      ctx.fill();
    }
    // 枠線
    ctx.lineWidth=1;
    ctx.strokeStyle = 'rgba(0,0,0,1.0)'; // 線の色を戻す
    ctx.strokeRect(0,0,canv_w,canv_h);
  }
  // console.log(typeof(canvas));
  return canvas;
}