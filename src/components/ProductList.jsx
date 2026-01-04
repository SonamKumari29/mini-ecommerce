import ProductCard from "./ProductCard.jsx"

function ProductList({ products, onAddToCart }) {
  // show empty state if no products
  if (products.length === 0) {
    console.log("no products to display")
    return <div className="no-products">No products found</div>
  }

  console.log("rendering", products.length, "products")

  // render product grid
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        )
      })}
    </div>
  )
}

export default ProductList
