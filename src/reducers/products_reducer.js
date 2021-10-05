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

const products_reducer = (state, action) => {
  // Sidebar Open for mobile
  if (action.type === 'SIDEBAR_OPEN') {
    // console.log(action)
    return { ...state, isSidebarOpen: true }
  }
  // Sidebar close for mobile
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false }
  }

  // Fetching loading
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true }
  }

  // Fetching the data 
  // TAKE NOTE !!! in the "FeaturedProducts.js" component "featured_products" is used to map the data 
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const featured_products = action.payload.filter(
      (product) => product.featured === true
    )
    return {
      ...state,
      products_loading: false,
      products: action.payload,
      featured_products,
    }
  }

  // product error
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true }
  }

  // Single product loading 
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    }
  }

  // Fetching the data 
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    }
  }

  // Fetching the data error
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    }
  }

  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
