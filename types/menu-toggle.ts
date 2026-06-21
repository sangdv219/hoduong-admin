export interface MenuToggleItem {
  key: string;
  label: string;
  depth: number;
  expanded?: boolean;
  children?: MenuToggleItem[];
}
