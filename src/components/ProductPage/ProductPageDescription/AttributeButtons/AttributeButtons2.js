import { Component } from "react"
import { id } from "../../../../services/service"
import classNames from "classnames"
import './AttributeButtons.scss'

class AttributeButtons2 extends Component {
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

	render() {

		const blockSize = this.props.blockSize
		const attributes = this.props.attribute.items



		return (
			<ul className="attr-buttons" style={this.props.gap}>
				{Object.values(this.props.selected).forEach(item => {

				})
				}
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
				}
				)
				}
			</ul>)
	}
}

export default AttributeButtons2