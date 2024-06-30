import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SidebarOpen {
  sidebarOpen: boolean;
};

const initialState: SidebarOpen = {
    sidebarOpen: false
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebar: (state, action: PayloadAction<SidebarOpen>) => {
        state.sidebarOpen = action.payload.sidebarOpen;
    },
  },
});

export const { setSidebar } = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;