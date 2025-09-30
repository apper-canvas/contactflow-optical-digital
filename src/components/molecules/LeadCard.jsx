import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const LeadCard = ({ lead, onView, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    const colors = {
      'New': 'bg-blue-100 text-blue-800',
      'Contacted': 'bg-yellow-100 text-yellow-800',
      'Qualified': 'bg-green-100 text-green-800',
      'Unqualified': 'bg-red-100 text-red-800',
      'Converted': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getScoreColor = (score) => {
    if (score >= 75) return 'bg-green-100 text-green-800';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getSourceIcon = (source) => {
    const icons = {
      'Website': 'Globe',
      'Referral': 'Users',
      'Social Media': 'Share2'
    };
    return icons[source] || 'HelpCircle';
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 truncate">
              {lead.name_c || 'Unnamed Lead'}
            </CardTitle>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.lead_status_c)}`}>
              {lead.lead_status_c || 'New'}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {lead.email_c && (
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="Mail" className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
              <span className="truncate">{lead.email_c}</span>
            </div>
          )}
          
          {lead.phone_c && (
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="Phone" className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
              <span className="truncate">{lead.phone_c}</span>
            </div>
          )}
          
          {lead.company_c && (
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="Building2" className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
              <span className="truncate">{lead.company_c}</span>
            </div>
          )}
          
          {lead.job_title_c && (
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="Briefcase" className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
              <span className="truncate">{lead.job_title_c}</span>
            </div>
          )}

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {lead.lead_score_c !== null && lead.lead_score_c !== undefined && (
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getScoreColor(lead.lead_score_c)}`}>
                  <ApperIcon name="Star" className="w-3 h-3 mr-1" />
                  {lead.lead_score_c}
                </span>
              )}
              {lead.lead_source_c && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                  <ApperIcon name={getSourceIcon(lead.lead_source_c)} className="w-3 h-3 mr-1" />
                  {lead.lead_source_c}
                </span>
              )}
            </div>
          </div>

          {lead.assigned_to_c && (
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="UserCheck" className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
              <span className="truncate">{lead.assigned_to_c?.Name || 'Assigned'}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
          <button
            onClick={() => onView(lead)}
            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="View Details"
          >
            <ApperIcon name="Eye" className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(lead)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Lead"
          >
            <ApperIcon name="Edit" className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(lead)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Lead"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadCard;