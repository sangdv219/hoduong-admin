export interface GanMatHangRow {
  key: string;
  name: string;
  dvt: string;
  giavon: string;
  giaban: string;
  bold?: boolean;
  noIcon?: boolean;
  children?: GanMatHangRow[];
}
