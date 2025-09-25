import React, { useState, useEffect } from 'react';
import { getCompanies, createCompany, updateCompany, deleteCompany } from '../services/companyService';
import './style.css';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', industry: '', location: '' });
  const [editingCompany, setEditingCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const data = await getCompanies();
    setCompanies(data);
  };

  const handleInputChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditingCompany({ ...editingCompany, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCompany(newCompany);
    fetchCompanies();
    setNewCompany({ name: '', industry: '', location: '' });
    setShowForm(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateCompany(editingCompany.id, editingCompany);
    fetchCompanies();
    setEditingCompany(null);
  };

  const handleDelete = async (id) => {
    await deleteCompany(id);
    fetchCompanies();
  };

  return (
    <div className="company-container">
      <h2>Companies</h2>
      <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Company'}</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={newCompany.name} onChange={handleInputChange} required />
          <input type="text" name="industry" placeholder="Industry" value={newCompany.industry} onChange={handleInputChange} required />
          <input type="text" name="location" placeholder="Location" value={newCompany.location} onChange={handleInputChange} required />
          <button type="submit">Add</button>
        </form>
      )}
      {editingCompany && (
        <form onSubmit={handleUpdate}>
          <input type="text" name="name" placeholder="Name" value={editingCompany.name} onChange={handleEditInputChange} required />
          <input type="text" name="industry" placeholder="Industry" value={editingCompany.industry} onChange={handleEditInputChange} required />
          <input type="text" name="location" placeholder="Location" value={editingCompany.location} onChange={handleEditInputChange} required />
          <button type="submit">Update</button>
          <button onClick={() => setEditingCompany(null)}>Cancel</button>
        </form>
      )}
      <table className="company-table">
        <thead>
         <tr>
  <th>Name</th>
  <th>Industry</th>
  <th>Location</th>
  <th>Account Status</th>
</tr>
<tr>
  <td>N Sai Vighnesh</td>
  <td>Information Technology</td>
  <td>Hyderabad, India</td>
  <td>Active</td>
</tr>
<tr>
  <td>Rahul Sharma</td>
  <td>Finance</td>
  <td>Mumbai, India</td>
  <td>Inactive</td>
</tr>
<tr>
  <td>Anjali Reddy</td>
  <td>Healthcare</td>
  <td>Bangalore, India</td>
  <td>Temporarily Disabled</td>
</tr>
<tr>
  <td>Kiran Kumar</td>
  <td>Manufacturing</td>
  <td>Pune, India</td>
  <td>Active</td>
</tr>
<tr>
  <td>Pooja Verma</td>
  <td>Education</td>
  <td>Delhi, India</td>
  <td>Inactive</td>
</tr>
<tr>
  <td>Ravi Teja</td>
  <td>Retail</td>
  <td>Chennai, India</td>
  <td>Active</td>
</tr>
<tr>
  <td>Meena Gupta</td>
  <td>Media & Entertainment</td>
  <td>Kolkata, India</td>
  <td>Temporarily Disabled</td>
</tr>
<tr>
  <td>Aditya Varma</td>
  <td>Real Estate</td>
  <td>Visakhapatnam, India</td>
  <td>Active</td>
</tr>
<tr>
  <td>Sneha Patel</td>
  <td>Hospitality</td>
  <td>Ahmedabad, India</td>
  <td>Inactive</td>
</tr>
<tr>
  <td>Vikram Singh</td>
  <td>Consulting</td>
  <td>Jaipur, India</td>
  <td>Active</td>
</tr>

        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.industry}</td>
              <td>{company.location}</td>
              <td>
                <button onClick={() => setEditingCompany(company)}>Edit</button>
                <button onClick={() => handleDelete(company.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Companies;