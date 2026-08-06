import { SIDEBAR_GROUP_CLR, SIDEBAR_ITEM_BG, GREEN_ACCENT } from "@/constants/colors";

export function GlobalStyles() {
  return (
    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.5; }
      }
      .ant-menu-dark.ant-menu-inline .ant-menu-item-group-title {
        font-size: 10px !important;
        font-weight: 700 !important;
        letter-spacing: 0.08em !important;
        padding: 14px 16px 4px !important;
        color: ${SIDEBAR_GROUP_CLR} !important;
        text-transform: uppercase;
      }
      .ant-menu-dark .ant-menu-sub.ant-menu-inline {
        background: ${SIDEBAR_ITEM_BG} !important;
      }
      .ant-layout-sider .ant-menu-dark {
        padding: 0 4px;
      }
      .row-odd td { background: #f8fffe !important; }
      .row-even td { background: #ffffff !important; }
      .ant-table-thead > tr > th {
        font-weight: 700 !important;
        font-size: 12px !important;
        letter-spacing: 0.02em !important;
      }
      .gmh-table .ant-table-thead > tr > th {
        background: #b4c4c2 !important;
        color: #1f2937 !important;
        font-weight: 700 !important;
        font-size: 12px !important;
        border-right: 1px solid #a8b9b6 !important;
      }
      .gmh-table .ant-table-thead > tr > th:last-child {
        border-right: none !important;
      }
      .gmh-child-row > td {
        background: #f8faf9 !important;
      }
      .gmh-child-row:hover > td {
        background: #f0fdf4 !important;
      }
      .gmh-table .ant-table-row-expand-icon {
        border-color: ${GREEN_ACCENT}88 !important;
        color: ${GREEN_ACCENT} !important;
      }
      .ncc-table .ant-table-thead > tr > th {
        background: #b4c4c2 !important;
        color: #1f2937 !important;
        font-weight: 700 !important;
        font-size: 12px !important;
      }

      /* Mobile safety net: the shell hands the full viewport width to the
         content below lg, so wide tables must scroll inside their own
         container instead of stretching the whole document. */
      @media (max-width: 991px) {
        html, body { overflow-x: hidden; }
        .ant-table-wrapper,
        .ant-table-content,
        .ant-table-body {
          max-width: 100%;
          overflow-x: auto !important;
          -webkit-overflow-scrolling: touch;
        }
        .ant-table-wrapper table { min-width: 640px; }
        .ant-tabs-nav-wrap { overflow-x: auto; }
        .ant-modal { max-width: calc(100vw - 24px); margin: 8px auto; }
        .ant-picker-dropdown, .ant-dropdown { max-width: 100vw; }
      }
    `}</style>
  );
}
