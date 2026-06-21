import type React from "react";

export interface SysCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick?: () => void;
}

export interface SysSection {
  heading: string;
  cols: number;
  cards: SysCard[];
}
