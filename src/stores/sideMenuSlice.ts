import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  badge?: number;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | string>;
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: "ActivitySquare",
      pathname: "/",
      title: "Home",
    },
    {
      icon: "Film",
      pathname: "/film",
      title: "Film",
    },
    {
      icon: "Theater",
      pathname: "/theater",
      title: "Theater",
    },
    {
      icon: "Popcorn",
      pathname: "/file-manager-grid",
      title: "Food",
    },
    {
      icon: "CalendarRange",
      pathname: "/point-of-sale",
      title: "Schedule",
    },
    {
      icon: "Newspaper",
      pathname: "/chat",
      title: "News",
    },
    {
      icon: "UserSquare",
      pathname: "/calendar",
      title: "User",
    },

  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
