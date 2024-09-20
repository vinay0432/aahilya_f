import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/login/reducer';
export default configureStore({
  reducer: {
    user:authReducer
  },
})
