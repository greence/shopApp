import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

const initialState = {
	cartList: [],
	currentCurrency: '$',
	total: 0,
	totalItems: 0,
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCartList: {
			reducer: (state, action) => {
				//CHECK IF THE ITEM IS ALREADY IN THE CART WITH THE SAME ID AND ATTRIBUTE
				if (state.cartList.findIndex(element => element.id === action.payload.id && JSON.stringify(element.attr) === JSON.stringify(action.payload.attr)) !== -1) {
					//FIND CORRESPONDING ELEMENT IN THE CART
					const item = state.cartList.find(element => element.id === action.payload.id && JSON.stringify(element.attr) === JSON.stringify(action.payload.attr))
					item.quantity = item.quantity + 1
				}
				else {
					state.cartList.push(action.payload)
				}
				state.total = state.cartList.reduce((previousValue, currentValue) => {
					let amount
					currentValue.prices.forEach(item => {
						if (item.currency.symbol === state.currentCurrency) {
							amount = item.amount
							return amount
						}
					})
					return +(previousValue + amount * currentValue.quantity).toFixed(2)
				}, 0)
				state.totalItems = state.cartList.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
			},
			prepare: (text) => {
				const quantity = 1
				let attr
				if (!text.attr) {
					//attr = text.attributes[0].items[0].id
					attr = { [text.attributes[0].name]: text.attributes[0].items[0].id }
				} else attr = text.attr
				return { payload: { ...text, quantity, attr } }
			},
		},
		calcTotal: state => {
			state.total = state.cartList.reduce((previousValue, currentValue) => {
				let amount
				currentValue.prices.forEach(item => {
					if (item.currency.symbol === state.currentCurrency) {
						amount = item.amount
						return amount
					}
				})
				return +(previousValue + amount * currentValue.quantity).toFixed(2)
			}, 0)
			state.totalItems = state.cartList.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
		},
		changeCurrentCurrency: (state, action) => { state.currentCurrency = action.payload },
		increaseQuantity: (state, action) => {
			//console.log(current(state.cartList)) GET STATE
			state.cartList.forEach(item => {
				//CHECK EQULITY ID+ATTRIBUTE ADDED ITEM WITH EXISTING ITEM IN THE CART
				if (item.id === action.payload.id && JSON.stringify(item.attr) === JSON.stringify(action.payload.attr)) {
					item.quantity = item.quantity + 1
				}
			})
		},
		decreaseQuantity: (state, action) => {
			state.cartList.forEach(item => {
				if (item.id === action.payload.id && JSON.stringify(item.attr) === JSON.stringify(action.payload.attr) && item.quantity > 1) {
					item.quantity = item.quantity - 1
				}
				else if (item.id === action.payload.id && JSON.stringify(item.attr) === JSON.stringify(action.payload.attr) && item.quantity === 1) {
					state.cartList = state.cartList.filter(item => JSON.stringify(item.attr) !== JSON.stringify(action.payload.attr))
				}
			})
		},
		changeAttribute: (state, action) => {
			// let item = state.cartList.find(item => item.id === action.payload.item)
			// item.attr[Object.keys(item.attr)[0]] = action.payload.attr
			console.log(1);
		}
	},
})

const { actions, reducer } = cartSlice

export const {
	addToCartList,
	calcTotal,
	changeCurrentCurrency,
	increaseQuantity,
	decreaseQuantity,
	changeAttribute
} = actions

export default reducer