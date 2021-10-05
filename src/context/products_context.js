import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {

  // reducer
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
    // dispatch({ type: 'SIDEBAR_OPEN' })
  }

  // close sidebar
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  // fetch products
  // the parameter "url" coming from the "/utils/constants"
  const fetchProducts = async (url) => {
    // product loading
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const response = await axios.get(url)
      const products = response.data
      // after loading data then the data is fetched
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
      // checking the data "products = response.data" on the console
      // console.log(products)
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }    
    // const response = await axios.get(url)
    // console.log(response)
  }

  // fetch single product
  const fetchSingleProduct = async (url) => {
    // single product loading
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const response = await axios.get(url)
      const singleProduct = response.data
      // data fetched name as "singleProduct" on the "payload" that measn the data has been passed to the payload
      // on the reducer "product_reducer.js" on "GET_SINGLE_PRODUCT_SUCCESS" the "payload: singleProduct" has pass to "single_product: action.payload" 
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  useEffect(() => {
    // checking the sidebar on the console
    // openSidebar()

    // checking if the products have been fetched
    fetchProducts(url)
  }, [])

  return (
    <ProductsContext.Provider value={{
        ...state, 
        openSidebar,
        closeSidebar,
        fetchSingleProduct,
      }}    
    >
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
