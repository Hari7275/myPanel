import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  showDeleteModal: false,
  selectedData: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setShowDeleteModal: (state, action) => {
      state.showDeleteModal = action.payload; 
    },
    setSelectedData: (state, action) => {
      state.selectedData = action.payload;
    },
  },
});

export const { setShowModal, setShowDeleteModal, setSelectedData } =
  modalSlice.actions;

export default modalSlice.reducer;
