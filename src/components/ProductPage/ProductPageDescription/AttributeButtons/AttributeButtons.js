import { Component } from "react"
import { id } from "../../../../services/service"
import classNames from "classnames"
import './AttributeButtons.scss'

class AttributeButtons extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: this.props.selected || ''
		}
	}

	setSelected = data => {
		this.state.selected === Object.values(data)[0]
			? this.setState({ selected: '' })
			: this.setState({ selected: Object.values(data)[0] })
		this.props.setSelected(data)
	}

	setSelected2 = () => {
		let content = []
		for (let i = 0; i < Object.values(this.props.selected).length; i++) {
			content.push(this.props.attribute.items.map(attr =>
				<li
					key={id()}
					className={classNames('attr-button', { 'selected': Object.values(this.props.selected)[i] === attr.id })}
					id={attr.id}
					style={this.props.blockSize}
					onClick={() => { this.setSelected({ [this.props.attribute.id]: attr.id }) }}
				>
					{attr.displayValue}
				</li>
			))
		}
		return content
	}



	render() {
		const blockSize = this.props.blockSize
		const attributes = this.props.attribute.items
		this.setSelected2()


		return (
			<ul className="attr-buttons" style={this.props.gap}>
				{attributes.map(attr => {
					return (
						<li
							key={id()}
							className={classNames('attr-button', { 'selected': this.state.selected === attr.id })}
							id={attr.id}
							style={blockSize}
							onClick={() => { this.setSelected({ [this.props.attribute.id]: attr.id }) }}
						>
							{attr.displayValue}
						</li>
					)
				})}
			</ul>)


		// Object.values(this.props.selected).length > 0
		// 	? <ul className="attr-buttons" style={this.props.gap}>


		// 		{this.setSelected2()}
		// 	</ul>
		// 	: <ul className="attr-buttons" style={this.props.gap}>
		// 		{attributes.map(attr => {
		// 			return (
		// 				<li
		// 					key={id()}
		// 					className={classNames('attr-button', { 'selected': this.state.selected === attr.id })}
		// 					id={attr.id}
		// 					style={blockSize}
		// 					onClick={() => { this.setSelected({ [this.props.attribute.id]: attr.id }) }}
		// 				>
		// 					{attr.displayValue}
		// 				</li>
		// 			)
		// 		})}
		// 	</ul>)
	}
}

export default AttributeButtons