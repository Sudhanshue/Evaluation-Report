import React from "react";
import FilterPopup from "./FilterPopup";

const SearchBox = ({
  searchTerm,
  onSearchChange,
  openFilterPopup,
  filters,
  filterPopup,
  onFilterChange,
  closePopup,
}) => {
  return (
    <div className="filterSearchBox">
      <div className="filterSearchInput">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name & Status"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <em className="search">
          <img
            className="img-responsive"
            src="../../assets/images/search.svg"
            width="20"
            alt=""
          />
        </em>
      </div>
      <div className="filterBtnBox">
        <button className="btn filterSearch" onClick={openFilterPopup}>
          <em>
            <img
              className="img-responsive"
              src="../../assets/images/filter-tool.svg"
              width="16"
              alt=""
            />
          </em>
        </button>
        {filterPopup && (
        <FilterPopup
          filters={filters}
          onFilterChange={onFilterChange}
          closePopup={closePopup}
        />
        )}
      </div>
    </div>
  );
};

export default SearchBox;
