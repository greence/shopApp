import { Component } from 'react'
import './ProductPageImages.scss'

class ProductPageImages extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeImage: this.props.images[0]
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.images[0] !== this.props.images[0])
			this.setState({
				activeImage: this.props.images[0]
			})
	}

	calcImgHeight = () => {
		let ratio = 610 / 511
		return window.innerWidth / ratio + "px"
	}

	handleClick = index => {
		const activeImage = this.props.images[index]
		this.setState({ activeImage })
	}

	render() {
		const images = this.props.images
		const imagesGallery = images.map((data, i) =>
			<div className="list-item" key={i}>
				{images.length > 1 &&
					<img src={data} onClick={() => this.handleClick(i)} className="product_img" height="70" width="100" alt="product_image" />}
			</div>
		)

		return (
			<div className="product__pics pics">
				<ul className="pics__list">
					{imagesGallery}
				</ul>
				<div className="img-wrapper"
					style={{ height: this.calcImgHeight() }}
				>
					<img src={this.state.activeImage} alt="product-img" className="product-img_bg" />
				</div>
			</div>
		)
	}
}

export default ProductPageImages