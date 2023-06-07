import { id } from '../../../../services/service'
import AttributeButtons from '../AttributeButtons/AttributeButtons'
import './AttributeBlock.scss'

const AttributeBlock = props => {
	const productAttr = props.attributes
	console.log(props);

	return (
		productAttr.map(attribute => {
			return (
				<div className="product__attribute-block attribute-block" key={id()}>
					<div className="attribute-block block__title">{attribute.name + ':'}</div>
					<div className="attribute-block__list">
						<AttributeButtons
							blockSize={{ height: "45px", width: '63px', fontSize: '16px', letterSpacing: '0.05em', }}
							gap={{ gap: '12px' }}
							attribute={attribute}
							selected={props.selected}
							setSelected={props.setSelected}
						/>
					</div>
				</div>)
		}))
}

export default AttributeBlock