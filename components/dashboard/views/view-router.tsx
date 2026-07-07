"use client";

import dynamic from "next/dynamic";
import type { ViewKey, SystemSubView } from "@/types/dashboard";

const CauHinhDatBanView = dynamic(() =>
  import("./reservation/cau-hinh-dat-ban-view").then(
    (m) => m.CauHinhDatBanView,
  ),
);
const KhachHangThanhVienView = dynamic(() =>
  import("./customers/khach-hang-thanh-vien-view").then(
    (m) => m.KhachHangThanhVienView,
  ),
);
const NguoiDungView = dynamic(() =>
  import("./persons/nguoi-dung-view").then((m) => m.NguoiDungView),
);
const NhaCungCapView = dynamic(() =>
  import("./suppliers/nha-cung-cap-view").then((m) => m.NhaCungCapView),
);
const BaoCaoView = dynamic(() =>
  import("./reports/bao-cao-view").then((m) => m.BaoCaoView),
);
const GanMatHangView = dynamic(() =>
  import("./products/gan-mat-hang-view").then((m) => m.GanMatHangView),
);
const CauHinhHeThongView = dynamic(() =>
  import("./system/cau-hinh-he-thong-view").then((m) => m.CauHinhHeThongView),
);

interface ViewRouterProps {
  currentView: ViewKey;
  activeTab: string;
  setActiveTab: (key: string) => void;
  systemSubView: SystemSubView;
  setSystemSubView: (view: SystemSubView) => void;
  onNavigateHome: () => void;
}

export function ViewRouter({
  currentView,
  activeTab,
  setActiveTab,
  systemSubView,
  setSystemSubView,
  onNavigateHome,
}: ViewRouterProps) {
  switch (currentView) {
    case "cau-hinh-dat-ban":
      return (
        <CauHinhDatBanView activeTab={activeTab} setActiveTab={setActiveTab} />
      );
    case "khach-hang-thanh-vien":
      return <KhachHangThanhVienView />;
    case "nguoi-dung":
      return <NguoiDungView />;
    case "nha-cung-cap":
      return <NhaCungCapView />;
    case "bao-cao":
      return <BaoCaoView onNavigateHome={onNavigateHome} />;
    case "gan-mat-hang":
      return <GanMatHangView />;
    case "cau-hinh-he-thong":
      return (
        <CauHinhHeThongView
          systemSubView={systemSubView}
          setSystemSubView={setSystemSubView}
        />
      );
    default:
      return null;
  }
}
