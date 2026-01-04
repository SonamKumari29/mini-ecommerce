function Cart({ cart, totalItems, totalPrice, onUpdateQuantity, onRemove, onClose }) {
  // close cart when clicking overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      console.log("closing cart")
      onClose()
    }
  }

  return (
    <div className="cart-overlay" onClick={handleOverlayClick}>
      {/* prevent panel clicks from closing cart */}
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">Your cart is empty</div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => {
                // warn if quantity exceeds stock
                if (item.quantity > item.product.stock) {
                  console.log("warning: quantity exceeds stock", item.product.title, item.quantity, item.product.stock)
                }
                return (
                  <div key={item.product.id} className="cart-item">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <div className="cart-item-name">{item.product.title}</div>
                      {/* convert usd to inr */}
                      <div className="cart-item-price">₹{(item.product.price * 83).toFixed(2)}</div>
                      <div className="quantity-controls">
                        <button
                          className="quantity-button"
                          onClick={() => {
                            console.log("decreasing quantity for", item.product.title)
                            onUpdateQuantity(item.product.id, -1)
                          }}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="quantity-button"
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          +
                        </button>
                        <button
                          className="remove-button"
                          onClick={() => {
                            console.log("removing from cart", item.product.title)
                            onRemove(item.product.id)
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="cart-summary">
              <div className="cart-items-count">Total Items: {totalItems}</div>
              {/* convert usd to inr */}
              <div className="cart-total">Total: ₹{(totalPrice * 83).toFixed(2)}</div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
