import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DashboardVisited {
  dashboardVisited: boolean;
}

const initialState: DashboardVisited = {
    dashboardVisited: false
};

export const dashboardSlice = createSlice({
  name: "dashboardVisited",
  initialState,
  reducers: {
    setDashboard: (state, action: PayloadAction<DashboardVisited>) => {
        state.dashboardVisited = action.payload.dashboardVisited;
    },
  },
});

export const { setDashboard } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;