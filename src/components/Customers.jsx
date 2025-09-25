import React, { useState, useEffect } from 'react';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../services/customerService';
import './style.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  const handleInputChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditingCustomer({ ...editingCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('New customer:', newCustomer);
    await createCustomer(newCustomer);
    fetchCustomers();
    setNewCustomer({ name: '', email: '', phone: '' });
    setShowForm(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateCustomer(editingCustomer.id, editingCustomer);
    fetchCustomers();
    setEditingCustomer(null);
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    fetchCustomers();
  };

  return (
    <div className="customer-container">
      <h2>Customers</h2>
      <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Customer'}</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={newCustomer.name} onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Email" value={newCustomer.email} onChange={handleInputChange} required />
          <input type="text" name="phone" placeholder="Phone" value={newCustomer.phone} onChange={handleInputChange} required />
          <button type="submit">Add</button>
        </form>
      )}
      {editingCustomer && (
        <form onSubmit={handleUpdate}>
          <input type="text" name="name" placeholder="Name" value={editingCustomer.name} onChange={handleEditInputChange} required />
          <input type="email" name="email" placeholder="Email" value={editingCustomer.email} onChange={handleEditInputChange} required />
          <input type="text" name="phone" placeholder="Phone" value={editingCustomer.phone} onChange={handleEditInputChange} required />
          <button type="submit">Update</button>
          <button onClick={() => setEditingCustomer(null)}>Cancel</button>
        </form>
      )}
      <table className="customer-table">
        <thead>
          <tr>
  <th>Name</th>
  <th>Email</th>
  <th>Phone</th>
  <th>Account Status</th>
</tr>
<tr>
  <td>N Sai Vighnesh</td>
  <td>nsv2190@gmail.com</td>
  <td>9059854218</td>
  <td>Active</td>
</tr>
<tr>
  <td>Rahul Sharma</td>
  <td>rahul.sharma@example.com</td>
  <td>9876543210</td>
  <td>Inactive</td>
</tr>
<tr>
  <td>Anjali Reddy</td>
  <td>anjali.reddy@example.com</td>
  <td>9123456789</td>
  <td>Temporarily Disabled</td>
</tr>
<tr>
  <td>Kiran Kumar</td>
  <td>kiran.kumar@example.com</td>
  <td>9988776655</td>
  <td>Active</td>
</tr>
<tr>
  <td>Pooja Verma</td>
  <td>pooja.verma@example.com</td>
  <td>9090909090</td>
  <td>Inactive</td>
</tr>
<tr>
  <td>Ravi Teja</td>
  <td>ravi.teja@example.com</td>
  <td>9012345678</td>
  <td>Temporarily Disabled</td>
</tr>
<tr>
  <td>Meena Gupta</td>
  <td>meena.gupta@example.com</td>
  <td>9345678123</td>
  <td>Active</td>
</tr>

        </thead>
        
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button onClick={() => setEditingCustomer(customer)}>Edit</button>
                <button onClick={() => handleDelete(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;