import { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { calcTotal, increaseQuantity, decreaseQuantity, changeAttribute } from '../../Cart/cartSlice'
import CartHeader from './CartHeader/CartHeader'

class CartHeaderContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cartShown: false,
		}
	}

	domNodeRef = createRef();

	// handleDocumentClick = e => {
	// 	if (this.domNodeRef.current && !this.domNodeRef.current.contains(e.target)) {
	// 		this.setState({
	// 			cartShown: false
	// 		})
	// 	}
	// }

	showCartList = () => {
		this.setState({ cartShown: !this.state.cartShown });
		const body = document.getElementById('body')
		const header = document.querySelector('.header')
		const documentWidth = document.documentElement.clientWidth;
		const windowWidth = window.innerWidth;
		const scrollBarWidth = windowWidth - documentWidth;

		if (!this.state.cartShown) {
			body.style.overflow = "hidden"
			body.style.paddingRight = scrollBarWidth + 'px'
			header.style.paddingRight = scrollBarWidth + 'px'
		} else {
			body.style.overflow = "visible"
			body.style.paddingRight = '0px'
			header.style.paddingRight = '0px'
		}
	}

	increaseQuantity = item => {
		this.props.increaseQuantity(item)
		this.props.calcTotal()
	}

	decreaseQuantity = item => {
		this.props.decreaseQuantity(item)
		this.props.calcTotal()
	}

	changeAttribute = (data) => {
		this.props.changeAttribute(data)
	}

	componentDidUpdate(prevProps) {
		if (this.props.currentCurrency !== prevProps.currentCurrency) {
			this.props.calcTotal()
		}
	}

	render() {
		return (
			<CartHeader
				cartList={this.props.cartList}
				currentCurrency={this.props.currentCurrency}
				total={this.props.total}
				totalItems={this.props.totalItems}
				showCartList={this.showCartList}
				cartShown={this.state.cartShown}
				increaseQuantity={this.increaseQuantity}
				decreaseQuantity={this.decreaseQuantity}
				setSelected={this.changeAttribute}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
		cartList: state.cart.cartList,
		currentCurrency: state.cart.currentCurrency,
		total: state.cart.total,
		totalItems: state.cart.totalItems,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		increaseQuantity: item => dispatch(increaseQuantity(item)),
		decreaseQuantity: item => dispatch(decreaseQuantity(item)),
		calcTotal: () => dispatch(calcTotal()),
		changeAttribute: data => dispatch(changeAttribute(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CartHeaderContainer)