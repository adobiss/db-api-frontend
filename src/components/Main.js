import React, { useState, useEffect, useCallback } from 'react';
import supabase from '../supabaseClient';
import useAuthCheck from '../hooks/useAuthCheck';

const Main = ({ onLogout }) => {
  useAuthCheck();

  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');

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

  const handleCreateNew = () => {
    window.open('/create', '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <h2>Main Page</h2>
      <input
        type="text"
        placeholder="Search by client name"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={fetchClients}>Search</button>
      <button onClick={handleCreateNew}>Create New</button>
      <button onClick={onLogout}>Logout</button>
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
