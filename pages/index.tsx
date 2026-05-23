import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with placeholder anon key
const supabaseUrl = 'https://your-project.supabase.co'; // replace with your Supabase project URL
const supabaseKey = 'public-anon-key-placeholder';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { data, error } = await supabase.from('leads').insert([{ email }]);
      if (error) throw error;
      setStatus('success');
      setMessage('Thanks for signing up!');
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-4">
          AutoPost‑AI: AI‑generated social media posts in seconds
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Join the waitlist and be the first to experience effortless content creation.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
          >
            {status === 'loading' ? 'Submitting...' : 'Sign Up'}
          </button>
        </form>
        {status === 'success' && (
          <p className="mt-4 text-green-600 text-center">{message}</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-600 text-center">{message}</p>
        )}
      </div>
    </div>
  );
}
