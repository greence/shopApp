import { configureStore } from '@reduxjs/toolkit'
import cart from '../components/Cart/cartSlice'
import products from '../components/Category/productSlice'
import menuCategories from '../components/Header/MenuCategories/menuCategoriesSlice'

const store = configureStore({
	reducer: { products, cart, menuCategories },
	devTools: process.env.NODE_ENV !== 'production'
})

export default store
