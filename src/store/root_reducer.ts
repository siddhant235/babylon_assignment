import { combineReducers } from "@reduxjs/toolkit";
import TableActionReducer from "@/slices/table_action_slices"

export const rootReducer: any = combineReducers({
    tableSlice:TableActionReducer
});
export type RootState = ReturnType<typeof rootReducer>