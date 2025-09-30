import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const LeadDetail = ({ lead, onEdit, onDelete, onClose }) => {
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy hh:mm a');
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-2xl">
                {lead.name_c || 'Unnamed Lead'}
              </CardTitle>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lead.lead_status_c)}`}>
                {lead.lead_status_c || 'New'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={onEdit}
              variant="outline"
              className="inline-flex items-center gap-2"
            >
              <ApperIcon name="Edit" size={16} />
              Edit
            </Button>
            <Button
              onClick={onDelete}
              variant="outline"
              className="inline-flex items-center gap-2 text-red-600 hover:bg-red-50 border-red-200"
            >
              <ApperIcon name="Trash2" size={16} />
              Delete
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="inline-flex items-center gap-2"
            >
              <ApperIcon name="X" size={16} />
              Close
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <ApperIcon name="User" className="w-4 h-4 mr-2" />
                Lead Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Name</label>
                  <p className="text-sm text-gray-900 mt-1">{lead.name_c || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Email</label>
                  <p className="text-sm text-gray-900 mt-1">{lead.email_c || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Phone</label>
                  <p className="text-sm text-gray-900 mt-1">{lead.phone_c || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Company</label>
                  <p className="text-sm text-gray-900 mt-1">{lead.company_c || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Job Title</label>
                  <p className="text-sm text-gray-900 mt-1">{lead.job_title_c || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <ApperIcon name="Target" className="w-4 h-4 mr-2" />
                Lead Qualification
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Lead Source</label>
                  <p className="text-sm text-gray-900 mt-1">{lead.lead_source_c || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Lead Status</label>
                  <p className="text-sm mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.lead_status_c)}`}>
                      {lead.lead_status_c || 'New'}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Lead Score</label>
                  <p className="text-sm text-gray-900 mt-1 flex items-center">
                    {lead.lead_score_c !== null && lead.lead_score_c !== undefined ? (
                      <>
                        <ApperIcon name="Star" className="w-4 h-4 mr-1 text-yellow-500" />
                        {lead.lead_score_c}
                      </>
                    ) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <ApperIcon name="UserCheck" className="w-4 h-4 mr-2" />
                Assignment
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Assigned To</label>
                  <p className="text-sm text-gray-900 mt-1">
                    {lead.assigned_to_c?.Name || 'Unassigned'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <ApperIcon name="Clock" className="w-4 h-4 mr-2" />
                System Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Created On</label>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(lead.CreatedOn)}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Modified On</label>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(lead.ModifiedOn)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadDetail;