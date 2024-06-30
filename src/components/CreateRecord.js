// src/components/CreateRecord.js
import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const CreateRecord = () => {
  const [clientName, setClientName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const handleCreate = async () => {
    if (!clientName) {
      setError('Client name is required');
      return;
    }

    const { error } = await supabase
      .from('clients')
      .insert([{ client_name: clientName, contact_person: contactPerson, email, phone, address, city, country }]);

    if (error) {
      setError(error.message);
    } else {
      setError('');
      setSuccess('Client has been created successfully');
      setTimeout(() => {
        window.close();
      }, 1000); // Close the window after 1 second
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '300px' }}>
      <h2>Create New Client</h2>
      <input
        type="text"
        placeholder="Client Name (Required)"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        required
        style={{ marginBottom: '0px', width: '100%' }}
      />
      <input
        type="text"
        placeholder="Contact Person"
        value={contactPerson}
        onChange={(e) => setContactPerson(e.target.value)}
        style={{ marginBottom: '0px', width: '100%' }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '0px', width: '100%' }}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ marginBottom: '0px', width: '100%' }}
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ marginBottom: '0px', width: '100%' }}
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ marginBottom: '0px', width: '100%' }}
      />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        style={{ marginBottom: '0px', width: '100%' }}
      />
      <button onClick={handleCreate} style={{ marginTop: '0px', alignSelf: 'flex-start' }}>Create New</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default CreateRecord;
