import { Component } from "react"
import classNames from "classnames"
import { addToCartList } from "../Cart/cartSlice"
import './AttributeButtons.scss'
import { connect } from "react-redux"

class AttributeButtons extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: ''
		}
	}

	setSelected = e => {
		this.state.selected === e.target.id
			? this.setState({ selected: '' })
			: this.setState({ selected: e.target.id })
	}

	render() {
		const blockSize = this.props.blockSize
		const attributes = this.props.attribute.items

		const attributesList = attributes.map(attr =>
			<li
				className={classNames('attr-button', { 'selected': this.state.selected === attr.id })}
				id={attr.id}
				style={blockSize}
				onClick={(e) => { this.props.setAttr(e.target.id) }}>
				{attr.displayValue}
			</li>
		)

		return <ul className="attr-buttons" style={this.props.gap} onClick={this.setSelected}>
			{attributesList}
		</ul>
	}
}

// const mapStateToProps = state => {
// 	return {
// 		product: state.products.activeProduct
// 	}
// }

export default AttributeButtons
// export default connect(mapStateToProps)(AttributeButtons)