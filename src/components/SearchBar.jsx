import { useState } from 'react';

export const SearchBar = ({ onSearch }) => {
  const [turn, setTurn] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(turn);
    setTurn('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-1 mb-4">
      <input
        type="text"
        value={turn}
        onChange={(e) => setTurn(e.target.value)}
        placeholder="Search movies..."
        className="input input-success text-amber-950"
      />
      <button className='btn btn-success'>Search</button>
    </form>
  );
};
