import { Component } from 'react'
import { connect } from 'react-redux'
import { addToCartList } from '../Cart/cartSlice'
import { cutTags, id } from '../../services/service'
import AttributeButtons from './AttributeButtons'
import './ProductPage.scss'

class ProductPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeImage: this.props.product.gallery[0],
			activeAttr: {},
			errorMessage: ''
		}
	}

	// createCheckedObj = () => {
	// 	let inputs = document.querySelectorAll('input')
	// 	let object = {}
	// 	for (let input of inputs) {
	// 		if (input.checked) object = { ...object, [input.name]: input.value }
	// 	}
	// 	this.setState({ activeAttr: { ...object } })
	// }

	setAttr = data => {
		this.setState({
			activeAttr: data
		})
	}

	calcImgHeight = () => {
		let ratio = 610 / 511
		return window.innerWidth / ratio + "px"
	}

	componentDidMount() {
		this.calcImgHeight()
	}

	addToCart = () => {
		Object.keys(this.state.activeAttr).length === 0
			? this.setState({ errorMessage: <p style={{ marginBottom: "20px", color: "rgb(255, 0, 0)" }}>Please choose preferable options!</p> })
			: this.props.dispatch(addToCartList({ ...this.props.product, attr: this.state.activeAttr })) && this.setState({ errorMessage: '' })

	}

	render() {
		const product = this.props.product
		const priceArr = product.prices
		let amount
		priceArr.forEach(price => {
			if (price.currency.symbol === this.props.currentCurrency) {
				amount = price.amount
			}
			return amount
		})

		const images = this.props.product.gallery
		const imagesGallery = images.map(elem =>
			images.length > 1
				? <li className="list-item" key={id()}>
					<img src={elem} alt="product_image" className="product_img" key={elem} onClick={() => this.setState({ activeImage: elem })} />
				</li>
				: null)

		let productAttr = product.attributes
		let attributesList = productAttr.map(attribute => {
			return (
				<div className="product__attribute-block attribute-block" >
					<div className="attribute-block block__title" key={id()}>{attribute.name + ':'}</div>
					{/* <div className="attribute-block__list">
					{items}
				</div> */}
					<div className="attribute-block__list1">
						<AttributeButtons blockSize={{ height: "45px", width: '63px', fontSize: '16px', letterSpacing: '0.05em', }} gap={{ gap: '12px' }} attribute={attribute} setAttr={this.setAttr} />
					</div>
				</div>)
		})


		return (
			<>
				<div className="product-page">
					<div className="product__pics pics">
						<ul className="pics__list">
							{imagesGallery}
						</ul>
						<div className="img-wrapper" style={{ height: this.calcImgHeight() }}>
							<img src={this.state.activeImage} alt="product-img" className="product-img_bg" />
						</div>
					</div>

					<div className="product-info">
						<div className="product__description">
							<div className="product__title">{product.name}</div>
							<div className="product__subtitle">{product.brand}</div>
							{attributesList}
							<div className="product__price-block">
								<div className="price-block block__title">price:</div>
								<div className="product-price">{this.props.currentCurrency}{amount}</div>
							</div>
							{/* <button className="add-button _green-btn" onClick={() => this.props.dispatch(addToCartList({ ...product, attr: this.state.activeAttr }))}>ADD TO CART</button> */}
							<button className="add-button _green-btn" onClick={() => this.addToCart()}>ADD TO CART</button>
							{this.state.errorMessage}
							<div className="product-description-text">
								{cutTags(product.description)}
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

const mapStateToProps = state => {
	return {
		product: state.products.activeProduct,
		currentCurrency: state.cart.currentCurrency
	}
}

export default connect(mapStateToProps)(ProductPage)