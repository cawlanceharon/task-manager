"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../services/userService';
import { TextField, Button, Link } from '@mui/material';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await registerUser(username, password);
      if (response && response.id) {
        setSuccess(true);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
            {error}
        </div>
        )}
        {success && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
            Registration successful!{' '}
            <Link href="/login" className="text-blue-500 underline">
            Go to login
            </Link>
        </div>
        )}
        <TextField
        fullWidth
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />
        <TextField
        fullWidth
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
        </Button>
    </form>
  );
};
