// src/components/CreateRecord.js
import React, { useState } from 'react';
import supabase from '../supabaseClient';

const CreateRecord = () => {
  const [clientName, setClientName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!clientName) {
      setError('Client name is required');
      return;
    }

    const { error } = await supabase
      .from('clients')
      .insert([{ client_name: clientName, contact_person: contactPerson, email, phone, address, city, country }]);
    if (error) setError(error.message);
  };

  return (
    <div>
      <h2>Create New Client</h2>
      <input type="text" placeholder="Client Name" onChange={(e) => setClientName(e.target.value)} required />
      <input type="text" placeholder="Contact Person" onChange={(e) => setContactPerson(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
      <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
      <input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} />
      <input type="text" placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
      <button onClick={handleCreate}>Create New</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateRecord;
