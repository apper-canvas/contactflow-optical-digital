import React from 'react';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { format } from 'date-fns';

function DealDetail({ deal, onEdit, onDelete, onBack }) {
  const getStageColor = (stage) => {
    const colors = {
      'Prospecting': 'bg-blue-100 text-blue-800',
      'Qualification': 'bg-yellow-100 text-yellow-800',
      'Proposal': 'bg-purple-100 text-purple-800',
      'Negotiation': 'bg-orange-100 text-orange-800',
      'Closed Won': 'bg-green-100 text-green-800',
      'Closed Lost': 'bg-red-100 text-red-800'
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (value) => {
    if (!value) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not set';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy hh:mm a');
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
          Back to Deals
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {deal.deal_name_c || deal.Name || 'Untitled Deal'}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Deal ID: {deal.Id}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => onEdit(deal)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              onClick={() => onDelete(deal)}
              className="inline-flex items-center px-4 py-2 border border-red-300 rounded-lg shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50"
            >
              <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Deal Information</h2>
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Deal Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {deal.deal_name_c || deal.Name || 'Not provided'}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Deal Value</dt>
                  <dd className="mt-1 text-xl font-semibold text-emerald-600">
                    {formatCurrency(deal.deal_value_c)}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Stage</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStageColor(deal.deal_stage_c)}`}>
                      {deal.deal_stage_c || 'Not set'}
                    </span>
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Probability</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {deal.probability_c !== null && deal.probability_c !== undefined 
                      ? `${deal.probability_c}%` 
                      : 'Not set'}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Expected Close Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatDate(deal.expected_close_date_c)}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Associated Company</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {deal.associated_company_c || 'Not provided'}
                  </dd>
                </div>
              </dl>
            </div>
          </Card>
        </div>

        {/* Sidebar Information */}
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Relationships</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Associated Contact</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {deal.associated_contact_c?.Name || 'Not assigned'}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Owner</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {deal.owner_c?.Name || deal.Owner?.Name || 'Not assigned'}
                  </dd>
                </div>
              </dl>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">System Information</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created On</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatDateTime(deal.CreatedOn)}
                  </dd>
                </div>

                {deal.CreatedBy && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Created By</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {deal.CreatedBy.Name || 'Unknown'}
                    </dd>
                  </div>
                )}

                <div>
                  <dt className="text-sm font-medium text-gray-500">Modified On</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatDateTime(deal.ModifiedOn)}
                  </dd>
                </div>

                {deal.ModifiedBy && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Modified By</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {deal.ModifiedBy.Name || 'Unknown'}
                    </dd>
                  </div>
                )}

                {deal.Tags && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Tags</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {deal.Tags || 'No tags'}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DealDetail;