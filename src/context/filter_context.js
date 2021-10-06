import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [], // "dispatch({ type: LOAD_PRODUCTS, payload: products })" > "(action.type === LOAD_PRODUCTS)" > "filtered_products: [...action.payload]"
  all_products: [], // "dispatch({ type: LOAD_PRODUCTS, payload: products })" > "(action.type === LOAD_PRODUCTS)" > "all_products: [...action.payload],"
  grid_view: true, // "filter_context" | "dispatch({ type: SET_GRIDVIEW })" and "dispatch({ type: SET_LISTVIEW })" > "filter_reducer" | "grid_view" is updated "(action.type === SET_GRIDVIEW)" and "(action.type === SET_LISTVIEW)"
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  
  // "products" > "useProductsContext" > "fetchProducts" > "payload: products" | "dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })"
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)

  // Fetching product data
  useEffect(() => {
    // "payload" = "action.payload" > "payload: products" = "filtered_products: [...action.payload]" 
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  useEffect(() => {
    // Dispatch Filter | Filter
    // EX. select Category "Bedroom" > "(action.type === FILTER_PRODUCTS)" ~ "(category !== 'all')" + then updates "updateFilters" & "(action.type === UPDATE_FILTERS)" ( <button key={index} onClick={updateFilters}></button> ) > then display the filtered products
    dispatch({ type: FILTER_PRODUCTS })

    // Dispatch Sort | Sort By 
    // Display and Return a new data that is sorted
    // EX. select "price-highest" > "(action.type === SORT_PRODUCTS)" ~ "(sort === 'price-highest')" + then updates "updateSort" & "(action.type === UPDATE_SORT)" (<selected value={sort} onChange={updateSort}> | Sort.js) > then display sorted products
    dispatch({ type: SORT_PRODUCTS })
  }, [state.sort, state.filters ])

  // Dispatch Action Grid View Toggle
  // "dispatch({ type: SET_GRIDVIEW })" > on "filter_reducer" > "(action.type === SET_GRIDVIEW)" set "{ grid_view: true }"
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }

  // Dispatch Action List View Toggle
  // "dispatch({ type: SET_LISTVIEW })" > on "filter_reducer" > "(action.type === SET_LISTVIEW)" set "{ grid_view: false }"
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  // Dispatch Sort By Drop Down | Event Handler | onChange 
  // After Selecting in "Sort By" > dispatch "UPDATE_SORT" is activativated > is "(action.type === UPDATE_SORT)" updated
  const updateSort = (e) => {
    // just for demonstration;
    // const name = e.target.name
    const value = e.target.value
    // console.log(name, value)
    dispatch({ type: UPDATE_SORT, payload: value })
  }

  // onChange | Event Handler for all Filters
  // Everytime theres a changes in the filter(button, slide or typed) we dispatch action then reducer immediately updates 
  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
    console.log(name, value)

    if (name === 'category') {
      value = e.target.textContent
    }
    if (name === 'color') {
      value = e.target.dataset.color
    }
    if (name === 'price') {
      value = Number(value)
    }
    if (name === 'shipping') {
      value = e.target.checked
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }

  // Clear Filter Button function
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  return (
    <FilterContext.Provider value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
