// export const val_to_hue = (val:number) => {
//   const N:number=10;
//   return 205-val/(N*N-1)*205;
// }
// 値を色に変換する関数
export const val_to_hue = function(N:number, val:number){
  return 205-val/(N*N-1)*205;
}
// 数値を0埋めして桁数を合わせる関数(num:数値, len:桁数)
export const zeroPadding = function(num, len){
  return ( Array(len).join('0') + num ).slice( -len );
}