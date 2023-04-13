import { TableData } from "@/data/table_data";
import { TableDataInterface } from "@/interface/table_data_inreface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableSortEnum } from "src/helpers/enums/table_actions_enums";
import { sortArrayByKey } from "src/helpers/utils";
import { SortingFilters } from "@/data/header"
import { SortingFilterInterface } from "@/interface/table_component_interface";
interface TableDataState {
  tableData: TableDataInterface[],
  sortingFiltersData: SortingFilterInterface[]

}

const initialState: TableDataState = {
  tableData: TableData,
  sortingFiltersData: SortingFilters

};

export const tableActionsSlice = createSlice({
  name: "tableDataActions",
  initialState,
  reducers: {
    setTableDataToInitial: (state, action: PayloadAction<void>) => {
      state.tableData = TableData
    },
    editUser: (state, action: PayloadAction<{ editedData: TableDataInterface }>) => {

      const indexToUpdate = state.tableData.findIndex((data) => data.userId == action.payload.editedData.userId)
      const tableData = state.tableData
      tableData[indexToUpdate] = action.payload.editedData
      state.tableData = tableData
    },
    deleteUser: (state, action: PayloadAction<{ userId: string }>) => {
      const userId = action.payload.userId
      const newTableData = state.tableData.filter((data) => data.userId !== userId)
      state.tableData = newTableData
    },
    sortTableData: (state, action: PayloadAction<{ headerKey: string, sortType: TableSortEnum, persistFilter: boolean }>) => {
      const headerKey = action.payload.headerKey
      const sortType = action.payload.sortType
      const persistFilter = action.payload.persistFilter

      if (persistFilter) {
        const indexOfFilter = state.sortingFiltersData.findIndex((data) => data.key == headerKey)

        const newFiltersState = state.sortingFiltersData
        newFiltersState[indexOfFilter] = {
          key: headerKey,
          sortType: sortType
        }
        state.sortingFiltersData = newFiltersState
      }

      if (sortType == TableSortEnum.NONE) {
        state.tableData = TableData
        return;
      }
      const sortedData = sortArrayByKey(state.tableData, headerKey, sortType)
      state.tableData = sortedData
    }
  }
});

export const { editUser, deleteUser, sortTableData, setTableDataToInitial } = tableActionsSlice.actions;

export default tableActionsSlice.reducer;
