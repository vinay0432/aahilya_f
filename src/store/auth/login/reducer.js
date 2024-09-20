import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {hello:'@123'}
  },
  reducers: {
    login: (state, action) => {
      // console.log('calling login', state, action?.payload);
      state.user = action.payload
    }
  }
});

export const { login } = userSlice.actions;
export default userSlice.reducer;

// import {
//   LOGIN_USER,
//   LOGIN_SUCCESS,
//   LOGOUT_USER,
//   LOGOUT_USER_SUCCESS,
//   API_ERROR,
// } from "./actionTypes"

// const initialState = {
//   error: "",
//   loading: false,
// }

// const login = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_USER:
//       state = {
//         ...state,
//         loading: true,
//       }
//       break
//     case LOGIN_SUCCESS:
//       state = {
//         ...state,
//         loading: false,
//       }
//       break
//     case LOGOUT_USER:
//       state = { ...state }
//       break
//     case LOGOUT_USER_SUCCESS:
//       state = { ...state }
//       break
//     case API_ERROR:
//       state = { ...state, error: action.payload, loading: false }
//       break
//     default:
//       state = { ...state }
//       break
//   }
//   return state
// }

// export default login
