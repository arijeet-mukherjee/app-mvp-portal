import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RouteVisited {
  routeVisited: string[];
};

const initialState: RouteVisited = {
    routeVisited: ['/training']
};

export const routeVisitedSlice = createSlice({
  name: "routeVisited",
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<string>) => {
        state.routeVisited = [...state.routeVisited, action.payload];
    },
    removeLastRoute: (state) => {
      if(state.routeVisited.length > 1) {
        state.routeVisited = state.routeVisited.slice(0, -1); // Remove the last element
      }
    },
  },
});

export const { setRoute, removeLastRoute } = routeVisitedSlice.actions;
export const routeReducer = routeVisitedSlice.reducer;