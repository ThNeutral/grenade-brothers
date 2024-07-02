import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    test: () => {}
  },
})

export const { test } = positionSlice.actions
export default positionSlice.reducer