import React, { useState, useEffect } from 'react';
import { getDeals, createDeal, updateDeal, deleteDeal } from '../services/dealService';
import './style.css';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDeal, setNewDeal] = useState({ name: '', stage: '', amount: '' });
  const [editingDeal, setEditingDeal] = useState(null);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    const data = await getDeals();
    setDeals(data);
  };

  const handleInputChange = (e) => {
    setNewDeal({ ...newDeal, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditingDeal({ ...editingDeal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createDeal(newDeal);
    fetchDeals();
    setNewDeal({ name: '', stage: '', amount: '' });
    setShowForm(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateDeal(editingDeal.id, editingDeal);
    fetchDeals();
    setEditingDeal(null);
  };

  const handleDelete = async (id) => {
    await deleteDeal(id);
    fetchDeals();
  };

  return (
    <div className="deal-container">
      <h2>Deals</h2>
      <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Deal'}</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={newDeal.name} onChange={handleInputChange} required />
          <input type="text" name="stage" placeholder="Stage" value={newDeal.stage} onChange={handleInputChange} required />
          <input type="number" name="amount" placeholder="Amount" value={newDeal.amount} onChange={handleInputChange} required />
          <button type="submit">Add</button>
        </form>
      )}
      {editingDeal && (
        <form onSubmit={handleUpdate}>
          <input type="text" name="name" placeholder="Name" value={editingDeal.name} onChange={handleEditInputChange} required />
          <input type="text" name="stage" placeholder="Stage" value={editingDeal.stage} onChange={handleEditInputChange} required />
          <input type="number" name="amount" placeholder="Amount" value={editingDeal.amount} onChange={handleEditInputChange} required />
          <button type="submit">Update</button>
          <button onClick={() => setEditingDeal(null)}>Cancel</button>
        </form>
      )}
      <table className="deal-table">
        <thead>
          <tr>
  <th>Name</th>
  <th>Stage</th>
  <th>Amount</th>
  <th>Account Status</th>
</tr>
<tr>
  <td>N Sai Vighnesh</td>
  <td>Prospect</td>
  <td>₹50,000</td>
  <td>Active</td>
</tr>
<tr>
  <td>Rahul Sharma</td>
  <td>Negotiation</td>
  <td>₹1,20,000</td>
  <td>Inactive</td>
</tr>
<tr>
  <td>Anjali Reddy</td>
  <td>Qualified</td>
  <td>₹75,000</td>
  <td>Temporarily Disabled</td>
</tr>
<tr>
  <td>Kiran Kumar</td>
  <td>Closed Won</td>
  <td>₹2,50,000</td>
  <td>Active</td>
</tr>
<tr>
  <td>Pooja Verma</td>
  <td>Proposal</td>
  <td>₹95,000</td>
  <td>Inactive</td>
</tr>
<tr>
  <td>Ravi Teja</td>
  <td>Closed Lost</td>
  <td>₹60,000</td>
  <td>Temporarily Disabled</td>
</tr>
<tr>
  <td>Meena Gupta</td>
  <td>Negotiation</td>
  <td>₹1,80,000</td>
  <td>Active</td>
</tr>
<tr>
  <td>Aditya Varma</td>
  <td>Prospect</td>
  <td>₹40,000</td>
  <td>Active</td>
</tr>
<tr>
  <td>Sneha Patel</td>
  <td>Qualified</td>
  <td>₹1,10,000</td>
  <td>Inactive</td>
</tr>
<tr>
  <td>Vikram Singh</td>
  <td>Proposal</td>
  <td>₹2,00,000</td>
  <td>Active</td>
</tr>

        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr key={deal.id}>
              <td>{deal.name}</td>
              <td>{deal.stage}</td>
              <td>{deal.amount}</td>
              <td>
                <button onClick={() => setEditingDeal(deal)}>Edit</button>
                <button onClick={() => handleDelete(deal.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Deals;