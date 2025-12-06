import React, { useState } from "react";

const XTable = () => {
  const [data, setData] = useState([
    { date: "2022-09-01", views: 100, article: "Article 1" },
    { date: "2023-09-01", views: 100, article: "Article 1" },
    { date: "2023-09-02", views: 150, article: "Article 2" },
    { date: "2023-09-02", views: 120, article: "Article 3" },
    { date: "2020-09-03", views: 200, article: "Article 4" }
  ]);

  // --- Sort By Date (desc), then views desc ---
  const sortByDate = () => {
    const sorted = [...data].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateB - dateA !== 0) return dateB - dateA; // latest first

      return b.views - a.views; // if same date → higher views first
    });

    setData(sorted);
  };

  // --- Sort By Views (desc), then date desc ---
  const sortByViews = () => {
    const sorted = [...data].sort((a, b) => {
      if (b.views - a.views !== 0) return b.views - a.views; // highest first

      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateB - dateA; // if same views → latest date first
    });

    setData(sorted);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Date and Views Table</h1>

      <button onClick={sortByDate} style={{ marginRight: "10px" }}>
        Sort by Date
      </button>

      <button onClick={sortByViews}>
        Sort by Views
      </button>

      <table border="1" style={{ marginTop: "20px", width: "60%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Views</th>
            <th>Article</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.views}</td>
              <td>{row.article}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default XTable;
