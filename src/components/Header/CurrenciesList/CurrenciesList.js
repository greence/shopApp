import classNames from 'classnames'
import './CurrenciesList.scss'

const CurrenciesList = props => {
	const currenciesList = props.allCurrencies.map(currency =>
		<li
			key={currency.label}
			className="currency-list_item"
			onClick={() => props.changeCurrentCurrency(currency.symbol)}>
			{currency.symbol} {currency.label}
		</li>)

	return (
		<>
			<div className="actions-header__item currency-header"
				onClick={() => props.changeCurrencyListState()}
				ref={props.domNodeRef}
			>
				<span className="currency-header__item_currency">{props.currentCurrency}</span>
				<span className={classNames("currency-header__item_vector-down", { 'is-opened': props.currencyShown }, { 'is-closed': !props.currencyShown })} />
				{props.currencyShown &&
					<div className='currency-header__body'>
						<ul className="currency-header__list currency-list">
							{currenciesList}
						</ul>
					</div>
				}
			</div>
		</>
	)
}

export default CurrenciesList