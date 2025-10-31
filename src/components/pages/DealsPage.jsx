import React, { useState } from 'react';
import { dealService } from '@/services/api/dealService';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import DealGrid from '@/components/organisms/DealGrid';
import DealDetail from '@/components/molecules/DealDetail';
import DealForm from '@/components/molecules/DealForm';

function DealsPage() {
  const [view, setView] = useState('grid'); // 'grid', 'detail', 'form'
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreateDeal = () => {
    setSelectedDeal(null);
    setFormMode('create');
    setView('form');
  };

  const handleEditDeal = (deal) => {
    setSelectedDeal(deal);
    setFormMode('edit');
    setView('form');
  };

  const handleViewDeal = (deal) => {
    setSelectedDeal(deal);
    setView('detail');
  };

  const handleDeleteDeal = async (deal) => {
    if (!window.confirm(`Are you sure you want to delete "${deal.deal_name_c || deal.Name}"?`)) {
      return;
    }

    const success = await dealService.delete(deal.Id);
    if (success) {
      setView('grid');
      setSelectedDeal(null);
      setRefreshTrigger(prev => prev + 1);
    }
  };

  const handleFormSubmit = async (formData) => {
    let result;
    if (formMode === 'create') {
      result = await dealService.create(formData);
    } else {
      result = await dealService.update(selectedDeal.Id, formData);
    }

    if (result) {
      setView('grid');
      setSelectedDeal(null);
      setRefreshTrigger(prev => prev + 1);
    }
  };

  const handleFormCancel = () => {
    setView('grid');
    setSelectedDeal(null);
  };

  const handleBackToList = () => {
    setView('grid');
    setSelectedDeal(null);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'grid' && (
          <DealGrid
            onCreateDeal={handleCreateDeal}
            onViewDeal={handleViewDeal}
            onEditDeal={handleEditDeal}
            refreshTrigger={refreshTrigger}
          />
        )}

        {view === 'detail' && selectedDeal && (
          <DealDetail
            deal={selectedDeal}
            onEdit={handleEditDeal}
            onDelete={handleDeleteDeal}
            onBack={handleBackToList}
          />
        )}

        {view === 'form' && (
          <DealForm
            deal={formMode === 'edit' ? selectedDeal : null}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            mode={formMode}
          />
        )}
      </div>
    </div>
  );
}

export default DealsPage;