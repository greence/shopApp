import { Component } from "react"
import { gql } from "@apollo/client"
import { connect } from "react-redux"
import { getProducts, setActiveProduct } from "./productSlice"
import { addToCartList } from '../Cart/cartSlice'
import { Link } from "react-router-dom"
import classNames from "classnames"
import './Category.scss'

class Category extends Component {
	// constructor(props) {
	// 	super(props)
	// }

	getData = () => {
		this.props.client.query({
			query: gql`{
				category{
    				name
    				products{
      					name
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
							symbol
							}
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
		})
			.then(result => {
				this.props.dispatch(getProducts(result.data.category.products))
			})
	}



	componentDidMount() {
		this.getData()
	}

	addToCart = product => {
		this.props.dispatch(addToCartList(product))
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
		const filteredProducts = this.props.productList.filter(item => this.props.category === 'all' ? this.props.productList : item.category === this.props.category)

		const productList = filteredProducts.map(product => {
			const priceArr = product.prices
			let amount
			priceArr.forEach(price => {
				if (price.currency.symbol === this.props.currentCurrency) {
					amount = price.amount
				}
				return amount
			})
			const span = product.inStock ? null : <span className="item_not-avaliable">out of stock</span>

			return <li className="product__list-item" key={product.name + product.brand}>

				<img src={product.gallery[0]} alt={product.name} className={classNames("item__img", { "_out-of-stock_img": !product.inStock })} />
				<button
					//className="item__button-add-to-cart" 
					className={classNames("item__button-add-to-cart", { "hidden": !this.isTouchDevice() })}
					onClick={() => product.inStock ? this.addToCart(product) : null} />


				{span}
				<div className={classNames("item__description", { '_out-of-stock_text': !product.inStock })}>
					<div className="item__title">
						<Link to={product.id} className="item__title" onClick={() => this.props.dispatch(setActiveProduct(product))}>{product.brand} {product.name}</Link>
					</div>
					<div className="item__price">{this.props.currentCurrency} {amount}</div>
				</div>
			</li>
		}
		)

		return (
			<>
				<h1 className="title">{this.props.category}</h1>
				<ul className="product_list">
					{productList}
				</ul>
			</>
		)
	}

}

function mapStateToProps(state) {
	return {
		productList: state.products.products,
		currentCurrency: state.cart.currentCurrency,
		category: state.products.category
	}
}

export default connect(mapStateToProps)(Category)