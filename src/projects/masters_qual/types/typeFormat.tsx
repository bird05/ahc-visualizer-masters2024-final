// 入力フォーマット
export type Input_type = {
  is_valid: boolean;
  t: number;
  N: number;
  v: string[];
  h: string[];
  a: number[][];
}
// 出力フォーマット
export type Ope_type = {
  s: number;
  d: string;
  e: string;
}
export type Output_type = {
  is_valid: boolean;
  pi: number;
  pj: number;
  qi: number;
  qj: number;
  s: number[];
  d: string[];
  e: string[];
  // ope: Ope_type[];
}