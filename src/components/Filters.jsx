function Filters({
  searchTerm,
  selectedCategory,
  sortOrder,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onClear,
}) {
  return (
    <div className="filters">
      <h2>Filters</h2>

      {/* search input */}
      <div className="filter-group">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* category dropdown */}
      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* sort dropdown */}
      <div className="filter-group">
        <label htmlFor="sort">Sort By</label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      {/* clear all filters */}
      <button className="clear-filters-button" onClick={onClear}>
        Clear Filters
      </button>
    </div>
  )
}

export default Filters
  