import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from '../../fetches'

const initialState = {
	allCategories: [],
	category: 'all',
	products: [],
	activeProduct: {},
	// FIXME CHANGE INITIAL STATE OR NOT?? LESSON 60 13.40
	// activeProduct: null,
	selectedProduct: ''
}

//FIXME
export const fetchCategories = createAsyncThunk(
	'products/fetchCategories',
	() => {
		return getData('{categories{name}}')
	}
)

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		getProducts: (state, action) => { state.products = action.payload.products },
		setActiveProduct: (state, action) => { state.activeProduct = action.payload },
		setSelectedProduct: (state, action) => { state.selectedProduct = action.payload },
		setCategory: (state, action) => { state.category = action.payload },
		//new line here
		setCategories: (state, action) => { state.allCategories = action.payload },
	}
})
const { actions, reducer } = productSlice

export const {
	getProducts,
	setActiveProduct,
	setCategories,
	setCategory,
	setSelectedProduct,
} = actions

export default reducer