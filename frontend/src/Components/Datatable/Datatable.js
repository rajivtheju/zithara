import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Datatable.css';

const Datatable = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers');
        setCustomers(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setError('Error fetching data. Please try again.');
      }
    };
    fetchCustomers();
  }, []);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;

  // Change page
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  return (
    <div>
        <h1><u>Zithara Technologies Round-2</u></h1>
      <h2>Customers data</h2>
      {error && <div className="error">{error}</div>}
      <input type="text" className="search-input" value={searchTerm} onChange={handleSearchChange} placeholder="Search by name or location" /><br/>

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Created At (Date)(Time)</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.slice(indexOfFirstItem, indexOfLastItem).map((customer, index) => (
            <tr key={customer.sno}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{customer.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={nextPage} disabled={indexOfLastItem >= filteredCustomers.length}>Next</button>
      </div>
    </div>
  );
};

export default Datatable;
