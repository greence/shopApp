import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getData } from '../../fetches'
import { setActiveProduct } from '../Category/productSlice'
import { addToCartList } from '../Cart/cartSlice'
import ProductPage from './ProductPage'

class ProductPageContainer extends Component {
	componentDidMount() {
		const query = `
		{product
			(id:"${this.props.match.params.productId}")
			{
				name 
				attributes{
					id 
					name 
					items{
						displayValue 
						value 
						id
					}
				} 
				gallery 
				brand 
				description 
				prices{
					currency{
						label 
						symbol
					} 
					amount
				}
			}
		}`
		getData(query, setActiveProduct, 'product')
	}

	render() {
		return (
			JSON.stringify(this.props.activeProduct) !== '{}'
			&& <ProductPage {...this.props.activeProduct}
				currentCurrency={this.props.currentCurrency}
				addToCartList={this.props.addToCartList} />
		)
	}
}

const mapStateToProps = state => {
	return {
		activeProduct: state.products.activeProduct,
		currentCurrency: state.cart.currentCurrency
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addToCartList: product => {
			dispatch(addToCartList(product))
		}
	}
}

const ProductPageContainerWithRouter = withRouter(ProductPageContainer)

export default connect(mapStateToProps, mapDispatchToProps)(ProductPageContainerWithRouter)