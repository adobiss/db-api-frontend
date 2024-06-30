// src/components/Main.js
import React, { useState, useEffect, useCallback } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Main = ({ onLogout }) => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Declare fetchClients before useEffect
  const fetchClients = useCallback(async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .ilike('client_name', `%${search}%`);
    if (error) console.error(error);
    else setClients(data);
  }, [search]); // Include search as a dependency

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate('/');
      } else {
        fetchClients();
      }
    };
    checkUser();
  }, [fetchClients, navigate]); // Include both dependencies

  return (
    <div>
      <h2>Main Page</h2>
      <input
        type="text"
        placeholder="Search by client name"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={fetchClients}>Search</button>
      <button onClick={() => navigate('/create')}>Create New</button>
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
