import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { BookOpen, Search, Plus, BookmarkCheck, CheckCircle2 } from 'lucide-react';

export const LibraryManager: React.FC = () => {
  const { books, addToast } = useOS();
  const [search, setSearch] = useState('');

  const filtered = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Library Catalog & Loan Management
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Digital catalog, active checkout queue, reservations, and inventory
          </p>
        </div>
        <button className="mac-btn mac-btn-primary" onClick={() => addToast('Book Added', 'Added new ISBN title to digital catalog', 'success')}>
          <Plus size={16} /> Register New Book Title
        </button>
      </div>

      {/* Search Bar */}
      <div className="glass-panel" style={{ padding: '14px', position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search catalog title, author, or ISBN..." 
          className="mac-input"
          style={{ paddingLeft: '38px' }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Books Table */}
      <div className="mac-table-container">
        <table className="mac-table">
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Book Title & Author</th>
              <th>Category</th>
              <th>Total Copies</th>
              <th>Borrowed</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(book => (
              <tr key={book.id}>
                <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}>{book.isbn}</td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{book.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>by {book.author}</div>
                </td>
                <td><span className="mac-badge mac-badge-primary">{book.category}</span></td>
                <td>{book.totalCopies}</td>
                <td style={{ color: 'var(--accent-warning)', fontWeight: 600 }}>{book.borrowedCopies}</td>
                <td style={{ color: 'var(--accent-success)', fontWeight: 700 }}>{book.availableCopies}</td>
                <td>
                  <button 
                    className="mac-btn mac-btn-sm" 
                    onClick={() => addToast('Book Issued', `Issued copy of "${book.title}" to student queue`, 'success')}
                  >
                    Issue Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
