import React, { useState } from "react";
import UploadBox from './UploadBox';
import SearchBox from './SearchBox';
import Table from './Table';
import SelectedFilters from './SelectedFilters';

const EvaluationReport = () => {
    const [jsonData, setJsonData] = useState(null);
    const [keys, setKeys] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [popupMessage, setPopupMessage] = useState(null);
    const [popupType, setPopupType] = useState("");
    const [sortConfig, setSortConfig] = useState({
      key: "name",
      direction: "",
    });
  
    const [filters, setFilters] = useState({
      all: true,
      yetToStart: false,
      inProgress: false,
      completed: false,
      expired: false,
    });
  
    const [filterPopup, setFilterPopup] = useState(false);
  
    const handleFileChange = (file) => {
      if (file && file.type === "application/json") {
        const reader = new FileReader();
  
        reader.onload = (event) => {
          try {
            const parsedData = JSON.parse(event.target.result);
  
            if (
              Array.isArray(parsedData) &&
              parsedData.every(
                (item) => item.id && item.name && item.evaluationStatus
              )
            ) {
              setJsonData(parsedData);
              console.log("::::::::::",Object.keys(parsedData[0]));
              setKeys(Object.keys(parsedData[0]));
              setPopupMessage("JSON file uploaded successfully!");
              setPopupType("success");
            } else {
              console.log("Error while uploading invalid dooument", error);
              throw new Error("Invalid JSON format");
            }
  
            setError(null);
  
            setTimeout(() => {
              setPopupMessage(null);
            }, 3000);
          } catch (error) {
            console.error("Error parsing JSON:", error,"KEYS:-", keys);
            setPopupMessage("Error: Empty or invalid JSON uploaded");
            setPopupType("error");
            setJsonData(null);
            setKeys([]);
          }
        };
  
        reader.readAsText(file);
      } else {
        setPopupMessage("Please upload a valid JSON file.");
        setPopupType("error");
  
        setTimeout(() => {
          setPopupMessage(null);
        }, 3000);
      }
    };
    
    const sortedData = React.useMemo(() => {
      if (!jsonData) return [];
      console.log("ssssss",sortConfig);
      
      if (!sortConfig) return jsonData;
      let sortableData = [...jsonData];

      if (sortConfig.direction) {
        sortableData.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableData;
    }, [jsonData, sortConfig]);
  
    const handleFilterChange = (event) => {
      const { id, checked } = event.target;
  
      if (id === "all") {
        setFilters({
          all: true,
          yetToStart: false,
          inProgress: false,
          completed: false,
          expired: false,
        });
      } else {
        setFilters((prevFilters) => ({
          ...prevFilters,
          all: false,
          [id]: checked,
        }));
      }
    };

    const filteredData = React.useMemo(() => {
      if (!jsonData) return [];
      return sortedData.filter((item) => {
        const matchesSearchTerm =
          item.name.toLowerCase().includes(searchTerm) ||
          item.evaluationStatus.toLowerCase().includes(searchTerm);
  
        if (filters.all) return matchesSearchTerm; 
  
        const statusFilter =
          (filters.yetToStart && item.evaluationStatus === "YET_TO_START") ||
          (filters.inProgress && item.evaluationStatus === "IN_PROGRESS") ||
          (filters.completed && item.evaluationStatus === "COMPLETED") ||
          (filters.expired && item.evaluationStatus === "EXPIRED");
  
        return matchesSearchTerm && statusFilter;
      });
    }, [sortedData, filters, searchTerm]);
  
    const requestSort = (key) => {
      let direction = "ascending";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value.toLowerCase());
    };
  
    const openFilterPopup = () => {
      console.log("popup filter click");
      setFilterPopup(true); 
    };

    const closeFilterPopup = () => {
        setFilterPopup(false);
      };
  

  return (
    <>
      {popupMessage && (
        <div className={`popup ${popupType}`}>
          <p>{popupMessage}</p>
        </div>
      )}

      <div className="evalutionBox">
        <div className="container">
          <h1 className="mainHeading">Evaluation Table</h1>
          <p className="subHeading">Candidate Evaluation Data</p>
          
          <UploadBox onFileChange={handleFileChange} />
          
          <SearchBox 
            searchTerm={searchTerm} 
            onSearchChange={handleSearchChange} 
            openFilterPopup={openFilterPopup} 
            filters={filters}
            filterPopup={filterPopup} 
            onFilterChange={handleFilterChange} 
            closePopup={closeFilterPopup} 
          />
          
          {jsonData && (
            <SelectedFilters filters={filters} />
          )}

            <Table 
              data={filteredData} 
              onRequestSort={requestSort} 
              sortConfig={sortConfig}
            />
        </div>
      </div>
    </>
  );
};

export default EvaluationReport;
