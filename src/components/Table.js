import React from "react";

const Table = ({ data, onRequestSort, sortConfig }) => {
  const getRandomClass = () => {
    const classes = ["clr1", "clr2", "clr3", "clr4"];
    return classes[Math.floor(Math.random() * classes.length)];
  };

  const readableDate = (date) => {
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata", 
    });
  };

  return (
    <div className="tableBox">
      <table className="table-responsive">
        <thead>
          <tr>
            <th className="pointer" onClick={() => onRequestSort("name")}>
              Name
              <em
                className={`arrow ${
                  sortConfig.key === "name" ? sortConfig.direction : ""
                }`}
              >
                <img src="../../assets/images/angel-bold-right.svg" alt="" />
              </em>
            </th>
            <th className="pointer" onClick={() => onRequestSort("startDate")}>
              Task Start Date
              <em
                className={`arrow ${
                  sortConfig.key === "startDate" ? sortConfig.direction : ""
                }`}
              >
                <img src="../../assets/images/angel-bold-right.svg" alt="" />
              </em>
            </th>
            <th
              className="pointer"
              onClick={() => onRequestSort("evaluationStatus")}
            >
              Evaluation Status
              <em
                className={`arrow ${
                  sortConfig.key === "evaluationStatus"
                    ? sortConfig.direction
                    : ""
                }`}
              >
                <img src="../../assets/images/angel-bold-right.svg" alt="" />
              </em>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>
                  <span className="name">
                    <figure>
                      <span className={`clr ${getRandomClass()}`}>
                        {item.name
                          .split(" ")
                          .map((word, index, arr) =>
                            index === 0 || index === arr.length - 1
                              ? word.charAt(0)
                              : null
                          )
                          .join("")}
                      </span>
                    </figure>
                    <span>{item.name}</span>
                  </span>
                </td>
                <td>{readableDate(new Date(item.startDate))}</td>
                <td
                  className={`status ${
                    item.evaluationStatus === "YET_TO_START"
                      ? "start"
                      : item.evaluationStatus === "IN_PROGRESS"
                      ? "progress"
                      : item.evaluationStatus === "COMPLETED"
                      ? "completed"
                      : "expired"
                  }`}
                >
                  <span>{item.evaluationStatus}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
