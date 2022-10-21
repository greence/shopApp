import { configureStore } from '@reduxjs/toolkit'
import cart from '../components/Cart/cartSlice'
import products from '../components/Category/productSlice'

const store = configureStore({
	reducer: { products, cart },
	devTools: process.env.NODE_ENV !== 'production'
})

export default store
