import React from 'react';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { format } from 'date-fns';

function DealCard({ deal, onView, onEdit, onDelete }) {
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
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-gray-50">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {deal.deal_name_c || deal.Name || 'Untitled Deal'}
            </h3>
            {deal.associated_company_c && (
              <p className="text-sm text-gray-500 truncate">
                {deal.associated_company_c}
              </p>
            )}
          </div>
        </div>

        {/* Deal Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Value</span>
            <span className="text-lg font-semibold text-emerald-600">
              {formatCurrency(deal.deal_value_c)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Stage</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(deal.deal_stage_c)}`}>
              {deal.deal_stage_c || 'Not set'}
            </span>
          </div>

          {deal.probability_c !== null && deal.probability_c !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Probability</span>
              <span className="text-sm font-medium text-gray-900">
                {deal.probability_c}%
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Close Date</span>
            <span className="text-sm text-gray-900">
              {formatDate(deal.expected_close_date_c)}
            </span>
          </div>

          {deal.associated_contact_c && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Contact</span>
              <span className="text-sm text-gray-900 truncate max-w-[150px]">
                {deal.associated_contact_c.Name || 'Unknown'}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
          <Button
            onClick={onView}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <ApperIcon name="Eye" className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button
            onClick={onEdit}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <ApperIcon name="Edit" className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            onClick={onDelete}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default DealCard;