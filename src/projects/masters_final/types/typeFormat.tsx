// 入力フォーマット
export type Input_type = {
  is_valid: boolean;
  N: number;
  M: number;
  eps: number; // 風
  dlt: number; // 測定
  sx: number;
  sy: number;
  px: number[];
  py: number[];
  lx: number[];
  ly: number[];
  rx: number[];
  ry: number[];
  alp: number[];
  fx: number[];
  fy: number[];
}
// 出力フォーマット
export type Output_type = {
  is_valid: boolean;
  ope: string[];
  ax: number[];
  ay: number[];
}
// 結果フォーマット
export type Result_type = {
  tra_lx: number[],   // 軌跡の始点
  tra_ly: number[],   // 軌跡の始点
  tra_rx: number[],   // 軌跡の終点
  tra_ry: number[],   // 軌跡の終点
  is_col: boolean[],  // 衝突判定
  col_x: number[],    // 衝突座標
  col_y: number[],    // 衝突座標
  mes_x: number[],    // 計測線の到達位置
  mes_y: number[],    // 計測線の到達位置
  vis_turn: number[], // 各目的地が何ターン目に訪問されるか
  score: number[],
  mx_score: number[],
}