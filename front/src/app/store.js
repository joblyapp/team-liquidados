import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlices";

export default configureStore({
    reducer:
    {
        user: userReducer,
    }
});