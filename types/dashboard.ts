export type ViewKey =
  | "cau-hinh-dat-ban"
  | "khach-hang-thanh-vien"
  | "family-members"
  | "user"
  | "nha-cung-cap"
  | "bao-cao"
  | "gan-mat-hang"
  | "cau-hinh-he-thong";

export type SystemSubView = null | "cau-hinh-menu";

export interface BreadcrumbItem {
  label: string;
  active?: boolean;
}

export interface ViewMeta {
  breadcrumb: BreadcrumbItem[];
  title: string;
}

export const VIEW_KEYS: ViewKey[] = [
  "cau-hinh-dat-ban",
  "khach-hang-thanh-vien",
  "family-members",
  "user",
  "nha-cung-cap",
  "bao-cao",
  "gan-mat-hang",
  "cau-hinh-he-thong",
];

export function isViewKey(key: string): key is ViewKey {
  return VIEW_KEYS.includes(key as ViewKey);
}
