import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MessageState = {
  count: number;
  user: {
    name: string;
    age: string;
  };
};

const initialState = {
  count: -1,
  user: {
    name: "",
    age: "0",
  },
} as MessageState;

export const messageSlice = createSlice({
  name: "Messages",
  initialState,
  reducers: {
    addName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    addAge: (state, action: PayloadAction<string>) => {
      state.user.age = action.payload;
    },
    startCount: (state) => {
      state.count = 5;
    },
    decrementCount: (state) => {
      state.count -= 1;
    },
  },
});

export const { addName, addAge, startCount, decrementCount } =
  messageSlice.actions;
export default messageSlice.reducer;
