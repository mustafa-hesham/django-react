import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => ({
  isAccountOverlayToggled: false,
});

export const AccountOverlaySlice = createSlice({
  name: 'AccountOverlayReducer',
  initialState: getInitialState(),
  reducers: {
    updateToggleAccountOverlay: (state, action) => {
      const {
        payload,
      } = action;

      state.isAccountOverlayToggled = payload;
    },
  },
});

export const { updateToggleAccountOverlay } = AccountOverlaySlice.actions;

export default AccountOverlaySlice.reducer;
