import { Component } from 'react'
import { cutTags } from '../../../services/service'
import AttributeBlock from './AttributeBlock/AttributeBlock'
import './ProductPageDescription.scss'

class ProductPageDescription extends Component {
	constructor(props) {
		super(props)
		this.state = {
			errorMessage: ''
		}
		this.selected = {}
	}

	setSelected = data => {
		let obj = { ...this.selected, ...data }
		this.selected = obj
	}

	addToCart = () => {
		const product = {
			id: this.props.id,
			prices: this.props.prices,
			attributes: this.props.attributes,
			gallery: this.props.gallery,
			name: this.props.name,
			brand: this.props.brand,
			description: this.props.description
		}
		this.props.addToCartList({ ...product, attr: this.selected })
		//FIXME
		// if (Object.keys(this.state.activeAttr).length === 0) {
		// 	this.setState({ errorMessage: <p style={{ marginBottom: "20px", color: "rgb(255, 0, 0)" }}>Please choose preferable options!</p> })
		// } else {
		// 	this.setState({ errorMessage: '' })
		// 	this.props.addToCartList({ ...product, attr: this.selected })
		// }
	}

	render() {
		const priceArr = this.props.prices
		//DEFINE CORRECT PRODUCT PRICE DUE TO CURRENT CURRENCY
		let amount
		priceArr.forEach(price => {
			if (price.currency.symbol === this.props.currentCurrency) {
				amount = price.amount
			}
			return amount
		})

		return (
			<div className="product__description">
				<div className="product__title">{this.props.name}</div>
				<div className="product__subtitle">{this.props.brand}</div>
				<AttributeBlock
					attributes={this.props.attributes}
					selected={this.selected}
					setSelected={this.setSelected} />
				<div className="product__price-block">
					<div className="price-block block__title">price:</div>
					<div className="product-price">{this.props.currentCurrency}{amount}</div>
				</div>
				<button className="add-button _green-btn" onClick={() => this.addToCart()}>ADD TO CART</button>
				{this.state.errorMessage}
				<div className="product-description-text">
					{cutTags(this.props.description)}
				</div>
			</div>
		)
	}
}

export default ProductPageDescription