import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import CategoryContainer from './components/Category/CategoryContainer'
import ProductPageContainer from './components/ProductPage/ProductPageContainer'
import CartListContainer from './components/Cart/CartListContainer'

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route path='/cart' component={CartListContainer} />
          <Route exact path='/'>
            <CategoryContainer />
          </Route>
          <Route path='/all'>
            <CategoryContainer />
          </Route>
          <Route path='/clothes'>
            <CategoryContainer />
          </Route>
          <Route path='/tech'>
            <CategoryContainer />
          </Route>
          <Route path='/:productId' >
            <ProductPageContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App