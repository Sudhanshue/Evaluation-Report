import React, { useEffect, useRef } from 'react';

const FilterPopup = ({ filters, onFilterChange, closePopup }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleMouseLeave = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.relatedTarget)) {
        closePopup();
      }
    };

    const filterBox = popupRef.current;

    if (filterBox) {
      filterBox.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (filterBox) {
        filterBox.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [closePopup]);

  return (
    <div className="filterBoxWrapper" ref={popupRef}>
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
    </div>
  );
};

export default FilterPopup;
