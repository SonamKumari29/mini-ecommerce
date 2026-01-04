function ProductCard({ product, onAddToCart }) {
  // check stock availability
  const inStock = product.stock > 0

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} className="product-image" />
      <h4 className="product-title">{product.title}</h4>
      <p className="product-category">{product.category}</p>
      {/* convert usd to inr (1 usd = 83 inr) */}
      <p className="product-price">₹{(product.price * 83).toFixed(2)}</p>
      <p className={`product-stock ${inStock ? "in-stock" : "out-of-stock"}`}>
        {inStock ? `In Stock (${product.stock})` : "Out of Stock"}
      </p>
      <button
        className="add-to-cart-button"
        onClick={() => {
          console.log("adding to cart:", product.title)
          onAddToCart(product)
        }}
        disabled={!inStock}
      >
        {inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  )
}

export default ProductCard
