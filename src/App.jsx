import { useState, useEffect } from "react"
import "./App.css"
import Filters from "./components/Filters.jsx"
import ProductList from "./components/ProductList.jsx"
import Cart from "./components/Cart.jsx"

function App() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortOrder, setSortOrder] = useState("")
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then((res) => res.json())
      .then((data) => {
        console.log("fetched products", data.products.length)
        const productList = data.products.slice(0, 18)
        const productsWithStock = productList.map((p) => {
          if (p.stock && typeof p.stock === "number") {
            return p
          } else {
            const mockStock = Math.floor(Math.random() * 15) + 5
            console.log("missing stock for", p.title, "setting to", mockStock)
            return { ...p, stock: mockStock }
          }
        })
        setProducts(productsWithStock)
        setFilteredProducts(productsWithStock)
        const cats = []
        productsWithStock.forEach((p) => {
          if (!cats.includes(p.category)) {
            cats.push(p.category)
          }
        })
        cats.sort()
        setCategories(cats)
        setLoading(false)
      })
      .catch((err) => {
        console.log("error fetching products", err)
        setProducts([])
        setFilteredProducts([])
        setCategories([])
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let result = products

    if (searchTerm) {
      result = result.filter((p) => {
        return p.title.toLowerCase().includes(searchTerm.toLowerCase())
      })
      console.log("search filter applied", result.length, "results")
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (sortOrder === "low-to-high") {
      result = result.slice().sort((a, b) => {
        return a.price - b.price
      })
    }

    if (sortOrder === "high-to-low") {
      result = result.slice().sort((a, b) => {
        return b.price - a.price
      })
    }

    setFilteredProducts(result)
  }, [products, searchTerm, selectedCategory, sortOrder])

  function addToCart(product) {
    if (product.stock <= 0) {
      console.log("cannot add, out of stock", product.title)
      return
    }

    setCart((prevCart) => {
      const found = prevCart.find((item) => item.product.id === product.id)
      if (found) {
        const newQty = found.quantity + 1
        if (newQty > product.stock) {
          console.log("max stock reached for", product.title, "current:", found.quantity, "stock:", product.stock)
          return prevCart
        }
        console.log("increased quantity for", product.title, "to", newQty)
        return prevCart.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: newQty }
          }
          return item
        })
      } else {
        console.log("added new item to cart", product.title)
        return [...prevCart, { product: product, quantity: 1 }]
      }
    })
  }

  function updateQuantity(productId, change) {
    setCart((prevCart) => {
      const updated = prevCart.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + change
          if (newQty < 1) {
            console.log("removing item, quantity would be", newQty)
            return null
          }
          if (newQty > item.product.stock) {
            console.log("cant increase, stock limit", item.product.title, "qty:", item.quantity, "stock:", item.product.stock)
            return item
          }
          return { ...item, quantity: newQty }
        }
        return item
      })
      return updated.filter((item) => item !== null)
    })
  }

  function removeFromCart(productId) {
    setCart((prevCart) => {
      return prevCart.filter((item) => item.product.id !== productId)
    })
  }

  function clearFilters() {
    setSearchTerm("")
    setSelectedCategory("")
    setSortOrder("")
  }

  let totalItems = 0
  cart.forEach((item) => {
    totalItems += item.quantity
  })

  let totalPrice = 0
  cart.forEach((item) => {
    totalPrice += item.product.price * item.quantity
  })

  if (cart.length > 0) {
    console.log("cart total items:", totalItems, "total price:", totalPrice.toFixed(2))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>mini-ecommerce</h1>
        <button className="cart-button" onClick={() => setShowCart(true)}>
          Cart ({totalItems})
        </button>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <Filters
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            sortOrder={sortOrder}
            categories={categories}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSortOrder}
            onClear={clearFilters}
          />
        </aside>
        <main className="products-section">
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <ProductList products={filteredProducts} onAddToCart={addToCart} />
          )}
        </main>
      </div>

      {showCart && (
        <Cart
          cart={cart}
          totalItems={totalItems}
          totalPrice={totalPrice}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onClose={() => setShowCart(false)}
        />
      )}
    </div>
  )
}

export default App
