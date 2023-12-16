import { createAction, createSlice } from '@reduxjs/toolkit';

import { TOGGLE_ACCOUNT_OVERLAY } from './AccountOverlayReducer.config';

const getInitialState = () => ({
  isAccountOverlayToggled: false,
});

export const updateToggleAccountOverlay = createAction(TOGGLE_ACCOUNT_OVERLAY);

export const AccountOverlaySlice = createSlice({
  name: 'AccountOverlayReducer',
  initialState: getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateToggleAccountOverlay, (state, action) => {
      const {
        payload,
      } = action;

      state.isAccountOverlayToggled = payload;
    },
    );
  },
});

export default AccountOverlaySlice.reducer;
