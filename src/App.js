import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Manual Page import
// import Footer from './components/Footer'
// import Navbar from './components/Navbar'

// Group import
import { Navbar, Sidebar, Footer } from './components'
import {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  Checkout,
  PrivateRoute
} from './pages'

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/cart'>
          <Cart />
        </Route>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route path='/products/:id' children={<SingleProduct />} />
        <Route path='/checkout'>
          <Checkout />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
