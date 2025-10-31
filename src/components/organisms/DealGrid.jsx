import { useState, useEffect } from 'react';
import DealCard from '@/components/molecules/DealCard';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { dealService } from '@/services/api/dealService';
import { toast } from 'react-toastify';

function DealGrid({ onCreateDeal, onViewDeal, onEditDeal, refreshTrigger }) {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDeals();
  }, [refreshTrigger]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = deals.filter(deal => 
        (deal.deal_name_c?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (deal.Name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (deal.associated_company_c?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredDeals(filtered);
    } else {
      setFilteredDeals(deals);
    }
  }, [searchTerm, deals]);

  const loadDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dealService.getAll();
      setDeals(data);
      setFilteredDeals(data);
    } catch (err) {
      setError(err.message || 'Failed to load deals');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDeal = async (deal) => {
    if (!window.confirm(`Are you sure you want to delete "${deal.deal_name_c || deal.Name}"?`)) {
      return;
    }

    const success = await dealService.delete(deal.Id);
    if (success) {
      loadDeals();
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadDeals} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Deals</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your sales opportunities and pipeline
          </p>
        </div>
        <Button
          onClick={onCreateDeal}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          New Deal
        </Button>
      </div>

      {/* Search Bar */}
      <SearchBar
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search deals by name or company..."
      />

      {/* Deals Grid */}
      {filteredDeals.length === 0 ? (
        <Empty onCreateContact={onCreateDeal} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDeals.map((deal) => (
            <DealCard
              key={deal.Id}
              deal={deal}
              onView={() => onViewDeal(deal)}
              onEdit={() => onEditDeal(deal)}
              onDelete={() => handleDeleteDeal(deal)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DealGrid;