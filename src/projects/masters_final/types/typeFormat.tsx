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
export type Ope_type = {
  s: number;
  d: string;
  e: string;
}
export type Output_type = {
  is_valid: boolean;
  ope: string[];
  ax: number[];
  ay: number[];
}