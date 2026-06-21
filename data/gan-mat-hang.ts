import type { GanMatHangRow } from "@/types/gan-mat-hang";

export const GAN_MAT_HANG_DATA: GanMatHangRow[] = [
  { key: "1", name: "Khăn giấy", dvt: "", giavon: "0 đ", giaban: "20,000 đ" },
  { key: "2", name: "Kẹo Ong Chúa", dvt: "Hộp", giavon: "0 đ", giaban: "30,000 đ" },
  { key: "3", name: "Nước Suối Aqua", dvt: "chai", giavon: "0 đ", giaban: "20,000 đ" },
  {
    key: "4",
    name: "Cách chế biến",
    dvt: "",
    giavon: "2 giá",
    giaban: "2 giá",
    bold: true,
    children: [
      {
        key: "4-1",
        name: "Chiên",
        dvt: "",
        giavon: "0 đ",
        giaban: "0 đ",
        noIcon: true,
        children: [],
      },
      {
        key: "4-2",
        name: "Xào",
        dvt: "",
        giavon: "0 đ",
        giaban: "0 đ",
        noIcon: true,
        children: [
          {
            key: "4-2-1",
            name: "Xào chua ngọt",
            dvt: "",
            giavon: "0 đ",
            giaban: "0 đ",
            noIcon: true,
          },
          {
            key: "4-2-2",
            name: "Xào tỏi",
            dvt: "",
            giavon: "0 đ",
            giaban: "0 đ",
            noIcon: true,
          },
        ],
      },
    ],
  },
  {
    key: "5",
    name: "Bia largue",
    dvt: "Lon",
    giavon: "2 giá",
    giaban: "2 giá",
    bold: true,
    children: [
      { key: "5-1", name: "Bia 330ml", dvt: "Lon", giavon: "0 đ", giaban: "0 đ", noIcon: true },
      { key: "5-2", name: "Bia 500ml", dvt: "Lon", giavon: "0 đ", giaban: "0 đ", noIcon: true },
    ],
  },
  { key: "6", name: "Buffet 169K", dvt: "", giavon: "0 đ", giaban: "0 đ" },
  { key: "7", name: "Combo bún + nước", dvt: "", giavon: "0 đ", giaban: "59,000 đ" },
];
