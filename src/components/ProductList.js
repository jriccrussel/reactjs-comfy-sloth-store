import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  // "filtered_products: products" > "dispatch({ type: LOAD_PRODUCTS, payload: products })" = on "filter_reducer" > "action.type === LOAD_PRODUCTS" > "filtered_products: [...action.payload]"
  const { filtered_products: products, grid_view } = useFilterContext()

  // if no products then display text 
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search.
      </h5>
    )
  }

  // when Grid view is clicked then display List view
  if (grid_view === false) {
    return <ListView products={products} />
  }

  // Default View | when List view is clicked then display Grid view
  return <GridView products={products} />
}

export default ProductList
