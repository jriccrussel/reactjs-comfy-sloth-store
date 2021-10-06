import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

  // Action Load Products(Fectch data)
  // "LOAD_PRODUCTS" > on "filter_context" | "dispatch({ type: LOAD_PRODUCTS, payload: products })"
  if (action.type === LOAD_PRODUCTS) {
    // Max Price
    let maxPrice = action.payload.map((prc) => prc.price)
    // console.log(maxPrice)
    maxPrice = Math.max(...maxPrice)
    // console.log(maxPrice)
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],

      // Max Price
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    }
  }
  
  // Action Grid View
  // "SET_GRIDVIEW" > on "filter_context" | "dispatch({ type: SET_GRIDVIEW })"
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }

  // Action List View
  // "SET_LISTVIEW" > on "filter_context" | "dispatch({ type: SET_LISTVIEW })"
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  
  // Action Update Sort 
  // "UPDATE_SORT" for > "updateSort" | "filter_context" on "dispatch({ type: UPDATE_SORT, payload: value })"
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }

  // Action Sort Products
  // "SORT_PRODUCTS" > "dispatch({ type: SORT_PRODUCTS })" | "filter_context"
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state
    let tempProducts = []
    if (sort === 'price-lowest') {
      tempProducts = filtered_products.sort((a, b) => {
        // if (a.price < b.price) {
        //   return -1
        // }
        // if (a.price > b.price) {
        //   return 1
        // }
        // return 0
        return a.price - b.price
      })
    }
    if (sort === 'price-highest') {
      tempProducts = filtered_products.sort((a, b) => {
        // if (b.price < a.price) {
        //   return -1
        // }
        // if (b.price > a.price) {
        //   return 1
        // }
        // return 0
        return b.price - a.price
      })
    }
    if (sort === 'name-a') {
      tempProducts = filtered_products.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      tempProducts = filtered_products.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }

    return { ...state, filtered_products: tempProducts }
  }

  // Action Update Filters
  // "UPDATE_FILTERS" > "updateFilters" | "filter_context"
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return { ...state, filters: { ...state.filters, [name]: value } } 
  }

  // Action Filter Products
  // "FILTER_PRODUCTS" > "dispatch({ type: FILTER_PRODUCTS })" | "filter_context"
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    const { text, category, company, color, price, shipping } = state.filters
    let tempProducts = [...all_products]

    if (text) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().startsWith(text)
      )
    }
    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      )
    }
    if (company !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      )
    }
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color)
      })
    }
    // filter by price
    tempProducts = tempProducts.filter((product) => product.price <= price)
    // filter by shipping
    if (shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping === true)
    }
    return { ...state, filtered_products: tempProducts }
  }

  // Action Clear Filters
  // "CLEAR_FILTERS" > "clearFilters" | "filter_context"
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    }
  }

  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
