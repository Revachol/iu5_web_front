import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

interface CartState {
  cartData: {
    id: number
    amount_of_orders: number
  }
  isLoading: boolean
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: {
      id: -1,
      amount_of_orders: 0
    },
    isLoading: false
  } as CartState,
  reducers: {
    setCartData(state, { payload }) {
      state.cartData = payload
    },
    setLoading(state, { payload }) {
      state.isLoading = payload
    }
  }
})

export const useCartData = () =>
  useSelector((state: any) => state.ourData.cart.cartData)

export const useCartLoading = () =>
  useSelector((state: any) => state.ourData.cart.isLoading)

export const {
  setCartData: setCartDataAction,
  setLoading: setLoadingAction
} = cartSlice.actions

export default cartSlice.reducer