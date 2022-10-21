import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Category from './components/Category/Category'
import ProductPage from './components/ProductPage/ProductPage'
import Cart from './components/Cart/Cart'

function App(props) {
  return (
    <Router>
      <div className="container">
        <Header client={props.client}></Header>
        <Switch>
          <Route exact path='/'>
            <Category client={props.client} />
          </Route>
          <Route path='/all'>
            <Category client={props.client} />
          </Route>
          <Route path='/clothes'>
            <Category client={props.client} />
          </Route>
          <Route path='/tech'>
            <Category client={props.client} />
          </Route>
          <Route path='/cart' component={Cart} />
          <Route path='/:productId' >
            <ProductPage client={props.client} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
