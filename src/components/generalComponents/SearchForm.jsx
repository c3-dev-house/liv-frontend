import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchForm({ placeholder, searchTerm, setSearchTerm }) {
  const searchFunc = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="relative">
      <div style={{ display: "flex" }}>
        <label htmlFor="action-search" className="sr-only">
          <SearchIcon />
        </label>
        <input
          id="action-search"
          className="form-input"
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={searchFunc}
          style={{
            borderRadius:'0.25rem',
          }}
        />
      </div>
    </form>
  );
}

SearchForm.defaultProps = {
  placeholder: "Search…",
};

export default SearchForm;
