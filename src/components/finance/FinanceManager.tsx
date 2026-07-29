import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { GlassModal } from '../common/GlassModal';
import { DollarSign, ArrowUpRight, ArrowDownRight, Plus, FileSpreadsheet } from 'lucide-react';

export const FinanceManager: React.FC = () => {
  const { financeRecords, addFinanceRecord, addToast } = useOS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState<'Revenue' | 'Expense'>('Revenue');
  const [category, setCategory] = useState('Tuition Fees');
  const [amount, setAmount] = useState<number>(1000);
  const [description, setDescription] = useState('');

  const totalRevenue = financeRecords.filter(r => r.type === 'Revenue').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = financeRecords.filter(r => r.type === 'Expense').reduce((acc, curr) => acc + curr.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;
    addFinanceRecord({
      type,
      category,
      amount: Number(amount),
      description,
      status: 'Completed'
    });
    setIsModalOpen(false);
    setDescription('');
    setAmount(1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Financial Ledger & Payroll Management
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Real-time accounting, tuition fee collections, faculty salary disbursements, and financial reports
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="mac-btn" onClick={() => addToast('Export Ledger', 'Exported financial ledger to Excel .XLSX', 'success')}>
            <FileSpreadsheet size={16} /> Export Ledger
          </button>
          <button className="mac-btn mac-btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Record Transaction
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Gross Revenue</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--accent-success)', marginTop: '4px' }}>
            ${totalRevenue.toLocaleString()}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Expenses</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--accent-danger)', marginTop: '4px' }}>
            ${totalExpenses.toLocaleString()}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Net Operating Margin</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '4px' }}>
            ${netProfit.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Financial Ledger Table */}
      <div className="mac-table-container">
        <table className="mac-table">
          <thead>
            <tr>
              <th>Entry ID</th>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {financeRecords.map(item => (
              <tr key={item.id}>
                <td style={{ fontFamily: 'JetBrains Mono, monospace' }}>{item.id}</td>
                <td>{item.date}</td>
                <td>
                  <span className={`mac-badge mac-badge-${item.type === 'Revenue' ? 'success' : 'danger'}`}>
                    {item.type}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>{item.category}</td>
                <td>{item.description}</td>
                <td style={{ fontWeight: 700, color: item.type === 'Revenue' ? 'var(--accent-success)' : 'var(--accent-danger)' }}>
                  {item.type === 'Revenue' ? '+' : '-'}${item.amount.toLocaleString()}
                </td>
                <td><span className="mac-badge mac-badge-primary">{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Record Transaction Modal */}
      <GlassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Financial Transaction"
        subtitle="Log tuition collection or departmental expense entry"
      >
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Transaction Type
              </label>
              <select className="mac-input" value={type} onChange={e => setType(e.target.value as any)}>
                <option value="Revenue">Revenue (+)</option>
                <option value="Expense">Expense (-)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Category
              </label>
              <select className="mac-input" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="Tuition Fees">Tuition Fees</option>
                <option value="Faculty Payroll">Faculty Payroll</option>
                <option value="Transport Fees">Transport Fees</option>
                <option value="IT Infrastructure">IT Infrastructure</option>
                <option value="Laboratory Supplies">Laboratory Supplies</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Amount ($ USD)
            </label>
            <input type="number" className="mac-input" value={amount} onChange={e => setAmount(Number(e.target.value))} required />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Transaction Description
            </label>
            <input type="text" className="mac-input" placeholder="e.g. Q3 Physics Lab equipment procurement" value={description} onChange={e => setDescription(e.target.value)} required />
          </div>

          <div className="flex-between" style={{ marginTop: '10px' }}>
            <button type="button" className="mac-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="mac-btn mac-btn-primary">Record Ledger Entry</button>
          </div>
        </form>
      </GlassModal>
    </div>
  );
};
