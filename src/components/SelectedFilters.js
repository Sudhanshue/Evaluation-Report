import React from 'react';

const SelectedFilters = ({ filters }) => {
  const getSelectedFilters = () => {
    const selectedFilters = [];
    if (filters.all) selectedFilters.push("All");
    if (filters.yetToStart) selectedFilters.push("Yet to Start");
    if (filters.inProgress) selectedFilters.push("In Progress");
    if (filters.completed) selectedFilters.push("Completed");
    if (filters.expired) selectedFilters.push("Expired");

    return selectedFilters ;
  };

  return (
    <div className="selected-filters">
    <strong>Evaluation Status: </strong>
    <div className="selected-filters-options">
      {getSelectedFilters().map((filter, index) => (
        <div key={index} className="filter-box">
          {filter}
        </div>
      ))}
    </div>
  </div>
  );
};

export default SelectedFilters;
