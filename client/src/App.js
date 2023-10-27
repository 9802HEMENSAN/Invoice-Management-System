import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    // Fetch all invoices when the component mounts
    axios.get('http://localhost:8080/api/invoices').then((response) => {
      setInvoices(response.data);
    });
  }, []);

  const handleFilterChange = (e) => {
    // Update the filter state based on user input
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filterInvoices = () => {
    axios
      .get('/api/invoices/filter', { params: filter })
      .then((response) => {
        setInvoices(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Invoice Dashboard</h1>

      {/* UI elements for creating, updating, and deleting invoices */}
      
      <div>
        <label>Filter by Financial Year:</label>
        <input type="text" name="financialYear" onChange={handleFilterChange} />
      </div>

      <div>
        <label>Filter by Invoice Number:</label>
        <input type="text" name="invoiceNumber" onChange={handleFilterChange} />
      </div>

      <div>
        <label>Filter by Date Range:</label>
        <input type="date" name="startDate" onChange={handleFilterChange} />
        <input type="date" name="endDate" onChange={handleFilterChange} />
      </div>

      <button onClick={filterInvoices}>Filter Invoices</button>

      {/* Display filtered invoices */}
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.invoiceNumber}>
            Invoice Number: {invoice.invoiceNumber} | Invoice Date: {invoice.invoiceDate} | Invoice Amount: {invoice.invoiceAmount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
