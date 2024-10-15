import React from 'react';

const SelectedFilters = ({ filters }) => {
  const getSelectedFilters = () => {
    const selectedFilters = [];
    if (filters.all) selectedFilters.push("All");
    if (filters.yetToStart) selectedFilters.push("Yet to Start");
    if (filters.inProgress) selectedFilters.push("In Progress");
    if (filters.completed) selectedFilters.push("Completed");
    if (filters.expired) selectedFilters.push("Expired");

    return selectedFilters.length > 0 ? selectedFilters.join(", ") : "No filters selected";
  };

  return (
    <div className="selected-filters">
      <strong>Evaluation Status: </strong>{getSelectedFilters()}
    </div>
  );
};

export default SelectedFilters;
