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
// バツ印を描画する(ctx,中心のxy座標,大きさ)
const cross = function (ctx:any, cx:number, cy:number, siz:number){
  ctx.lineWidth=1.5;
  ctx.strokeStyle = 'rgba(255,0,0,1.0)'; // 赤
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
  tra:any,                   // 軌跡
  turn:number,               // ターン数
  cond:any,                  // 描画条件
  ){
  const [input_is_valid,N,M,eps,dlt,sx,sy,px,py,lx,ly,rx,ry,alp,fx,fy]=[input_body.is_valid,input_body.N,input_body.M,input_body.eps,input_body.dlt,input_body.sx,input_body.sy,input_body.px,input_body.py,input_body.lx,input_body.ly,input_body.rx,input_body.ry,input_body.alp,input_body.fx,input_body.fy];
  const [output_is_valid,ope,ax,ay]=[output_body.is_valid,output_body.ope,output_body.ax,output_body.ay];
  const [showTra,showTail,showCross]=[cond.showTra,cond.showTail,cond.showCross];
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
      ctx.fillStyle = 'hsla(100,100%,50%,1.0)';
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
        for(let i=0; i<tra.length; ++i){
          const [x1,y1] = conv_coord(tra[i].lx,tra[i].ly); // 座標変換
          const [x2,y2] = conv_coord(tra[i].rx,tra[i].ry);
          ctx.moveTo(x1*LEN, y1*LEN);
          ctx.lineTo(x2*LEN, y2*LEN);
        }
        ctx.closePath();
        ctx.stroke();
      }
      // しっぽ
      if(showTail){
        if(tra.length>0){
          for(let i=0; i<10; ++i){
            let t_turn=turn-i-1;
            if(t_turn<0) break;
            if(t_turn>tra.length) continue;
            ctx.beginPath();
            // 太さ変更
            ctx.lineWidth = 3*(10-i)/10;
            ctx.strokeStyle = `hsla(205,100%,20%,1.0)`;
            // 透過度変更
            // ctx.lineWidth = 3.0;            
            // ctx.strokeStyle = `hsla(205,100%,20%,${(10-i)/10})`;
            const [x1,y1] = conv_coord(tra[t_turn].lx,tra[t_turn].ly); // 座標変換
            const [x2,y2] = conv_coord(tra[t_turn].rx,tra[t_turn].ry);
            ctx.moveTo(x1*LEN, y1*LEN);
            ctx.lineTo(x2*LEN, y2*LEN);
            ctx.closePath();
            ctx.stroke();
          }
        }
      }
      
      // ×印
      if(showCross){
        for(let i=0; i<tra.length; ++i){
          if(tra[i].is_col){
            const [tx,ty] = conv_coord(tra[i].col_x,tra[i].col_y);
            cross(ctx,tx*LEN,ty*LEN,3000*LEN);
          }
        }
        ctx.strokeStyle = 'rgba(0,0,0,1.0)'; // 線の色を戻す
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