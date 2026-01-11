import React from "react";

const SearchBox = ({ search, setSearch, onSearch }) => {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search anime..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBox;   // ✅ THIS IS REQUIRED
