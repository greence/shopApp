import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	allCategories: [],
	activeCategory: 'all'
}

const menuCategoriesSlice = createSlice({
	name: 'menuCategories',
	initialState,
	reducers: {
		setCategories: (state, action) => { state.allCategories = action.payload },
		setActiveCategory: (state, action) => { state.activeCategory = action.payload },
	}
})

export const { setCategories, setActiveCategory } = menuCategoriesSlice.actions
export default menuCategoriesSlice.reducer