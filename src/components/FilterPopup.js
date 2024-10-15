import React from 'react';

const FilterPopup = ({ filters, onFilterChange, closePopup }) => {
  return (
    <div className="filterBoxWrapper">
      <ul className="checkBoxes">
        <li>
          <label id="all">
            <input
              type="radio"
              id="all"
              checked={filters.all}
              onChange={onFilterChange}
            />
            All
          </label>
        </li>
        {["yetToStart", "inProgress", "completed", "expired"].map((filter) => (
          <li key={filter}>
            <label id={filter}>
              <input
                type="checkbox"
                id={filter}
                checked={filters[filter]}
                onChange={onFilterChange}
              />
              {filter.charAt(0).toUpperCase() + filter.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={closePopup}>Close</button>
    </div>
  );
};

export default FilterPopup;
