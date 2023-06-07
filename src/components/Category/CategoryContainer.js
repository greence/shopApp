import { Component } from 'react'
import { getData } from '../../fetches'
import { connect } from 'react-redux'
import { getProducts, setSelectedProduct } from './productSlice'
import { addToCartList } from '../Cart/cartSlice'
import Category from './Category'


class CategoryContainer extends Component {
	componentDidMount() {
		const query = `
		{category
			{products
				{name 
				brand 
				gallery 
				description 
				id 
				inStock 
				category 
				prices{
					amount 
					currency{
						label 
						symbol}
					} 
					attributes{
						id 
						name 
						type 
						items{
							displayValue 
							value 
							id
						}
					}
				}
			}
		}`
		getData(query, getProducts, 'category')
	}

	addToCart = product => {
		this.props.addToCart(product)
	}

	setSelectedProduct = id => {
		this.props.setSelectedProduct(id)
	}

	// checkDevice = (func1, func2) => {
	// 	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	// 		// код для мобильных устройств
	// 		console.log(navigator);
	// 		func1()
	// 	} else {
	// 		// код для обычных устройств
	// 		func2()
	// 	}
	// }
	isTouchDevice = () => {
		return ('ontouchstart' in window) ||
			(navigator.maxTouchPoints > 0) ||
			(navigator.msMaxTouchPoints > 0)
	}

	render() {
		return (
			<>
				{this.props.products.length > 0 &&
					<Category
						products={this.props.products}
						currentCurrency={this.props.currentCurrency}
						category={this.props.category}
						isTouchDevice={this.isTouchDevice}
						addToCart={this.addToCart}
						setSelectedProduct={this.setSelectedProduct}
					/>}
			</>
		)
	}
}

const mapStateToProps = state => {
	return {
		products: state.products.products,
		currentCurrency: state.cart.currentCurrency,
		category: state.products.category
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addToCart: product => dispatch(addToCartList(product)),
		setSelectedProduct: id => dispatch(setSelectedProduct(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer)