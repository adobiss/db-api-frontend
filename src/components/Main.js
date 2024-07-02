// src/components/Main.js
import React, { useState, useEffect, useCallback } from 'react';
import supabase from '../supabaseClient';
import useAuthCheck from '../hooks/useAuthCheck';

/**
 * Main component displays the main page with a list of clients and search functionality.
 * 
 * @param {Object} props - The component props
 * @param {Function} props.onLogout - Function to handle user logout
 */
const Main = ({ onLogout }) => {
  useAuthCheck();

  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');

  /**
   * Fetches the clients from the database based on the search criteria.
   */
  const fetchClients = useCallback(async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .ilike('client_name', `%${search}%`);
    if (error) console.error(error);
    else setClients(data);
  }, [search]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return (
    <div className="container align-left">
      <h2>Clients</h2>
      <input
        type="text"
        placeholder="Filter by client name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ height: '40px' }}
      />
      <button style={{ height: '40px' }} onClick={() => window.open('/create', '_blank', 'noopener,noreferrer')}>Create New</button>
      <button style={{ height: '40px' }} onClick={onLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client Name</th>
            <th>Contact Person</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.client_name}</td>
              <td>{client.contact_person}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.address}</td>
              <td>{client.city}</td>
              <td>{client.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Main;
