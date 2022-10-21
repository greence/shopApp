import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	category: 'all',
	products: [],
	activeProduct: {}
}

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		getProducts: (state, action) => { state.products = action.payload },
		setActiveProduct: (state, action) => { state.activeProduct = action.payload },
		setCategory: (state, action) => { state.category = action.payload }
	}
})
const { actions, reducer } = productSlice

export const {
	getProducts,
	setActiveProduct,
	setCategory,
} = actions

export default reducer