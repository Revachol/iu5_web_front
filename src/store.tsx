import { combineReducers, configureStore } from "@reduxjs/toolkit"
import filtersReducer from "./slices/searchSlice"
import cartReducer from "./slices/cartSlice"

export default configureStore({
  reducer: combineReducers({
    ourData: combineReducers({
      filters: filtersReducer,
      cart: cartReducer
    })
  })
})