import { Component } from 'react'
import { id } from '../../../services/service'
import './SliderComponent.scss'

class SliderComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeImage: 0,
			length: this.props.product.gallery.length,
		}
	}

	nextImage = () => {
		this.setState({
			activeImage: this.state.activeImage >= this.state.length - 1 ? 0 : this.state.activeImage + 1
		})
	}

	prevImage = () => {
		this.setState({
			activeImage: this.state.activeImage === 0 ? this.state.length - 1 : this.state.activeImage - 1
		})
	}


	render() {
		//FIXME pass props here
		const images = this.props.product.gallery.map((elem, index) => {
			let activeImage = index === this.state.activeImage ? 'cart__image active' : 'cart__image'
			return (
				<div key={id()}>
					<img src={elem} alt={elem} className={activeImage} />
				</div>)
		})

		const arrows = this.state.length === 1
			? null
			: <div className="img_arrows">
				<button className="arrow arrow_left" onClick={this.prevImage}></button>
				<button className="arrow arrow_right" onClick={this.nextImage}></button>
			</div>

		return (
			<>
				<div className="cart-page_item__img">
					{images}
				</div>
				{arrows}
			</>
		)
	}
}

export default SliderComponent