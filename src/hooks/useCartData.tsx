import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCartDraft } from "../services/chargingApi"
import { setCartDataAction, setLoadingAction } from "../slices/cartSlice"

export function useCartData() {
    const dispatch = useDispatch()

    const loadCartData = async () => {
        dispatch(setLoadingAction(true))
        try {
            const data = await getCartDraft()
            dispatch(setCartDataAction(data))
        } catch (err) {
            console.error('Error loading cart data:', err)
            dispatch(setCartDataAction({ 
                orderID: 0, 
                itemCount: 0, 
                status: 'error' 
            }))
        } finally {
            dispatch(setLoadingAction(false))
        }
    }

    useEffect(() => {
        loadCartData()
    }, [])

    return { loadCartData }
}