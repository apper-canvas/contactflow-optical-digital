import React, { useEffect, useState } from "react";
import { userService } from "@/services/api/userService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Loading from "@/components/ui/Loading";

const LeadForm = ({ lead, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name_c: '',
    email_c: '',
    phone_c: '',
    company_c: '',
    job_title_c: '',
    lead_source_c: '',
    lead_status_c: 'New',
    lead_score_c: '',
assigned_to_c: ''
  });

const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
useEffect(() => {
const loadUsers = async () => {
      try {
        setLoadingUsers(true);
        const data = await userService.getAll();
        setUsers(data);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    if (lead) {
      setFormData({
        name_c: lead.name_c || '',
        email_c: lead.email_c || '',
        phone_c: lead.phone_c || '',
        company_c: lead.company_c || '',
        job_title_c: lead.job_title_c || '',
        lead_source_c: lead.lead_source_c || '',
        lead_status_c: lead.lead_status_c || 'New',
        lead_score_c: lead.lead_score_c !== null && lead.lead_score_c !== undefined ? lead.lead_score_c : '',
assigned_to_c: lead.assigned_to_c?.Id || lead.assigned_to_c || ''
      });
    }
  }, [lead]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name_c.trim()) {
      newErrors.name_c = 'Name is required';
    }

    if (!formData.email_c.trim()) {
      newErrors.email_c = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_c)) {
      newErrors.email_c = 'Invalid email format';
    }

    if (formData.lead_score_c !== '' && formData.lead_score_c !== null && formData.lead_score_c !== undefined) {
      const score = parseInt(formData.lead_score_c);
      if (isNaN(score) || score < 0 || score > 100) {
        newErrors.lead_score_c = 'Lead score must be between 0 and 100';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = { ...formData };
      
      if (submitData.lead_score_c === '') {
        delete submitData.lead_score_c;
      }
      
if (!submitData.assigned_to_c) {
        delete submitData.assigned_to_c;
      }
      
      onSubmit(submitData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ApperIcon name="User" className="w-5 h-5 mr-2" />
          Lead Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name_c">Name *</Label>
            <Input
              id="name_c"
              type="text"
              value={formData.name_c}
              onChange={(e) => handleChange('name_c', e.target.value)}
              placeholder="Enter lead name"
              disabled={isLoading}
            />
            {errors.name_c && <p className="text-sm text-red-600 mt-1">{errors.name_c}</p>}
          </div>

          <div>
            <Label htmlFor="email_c">Email *</Label>
            <Input
              id="email_c"
              type="email"
              value={formData.email_c}
              onChange={(e) => handleChange('email_c', e.target.value)}
              placeholder="email@example.com"
              disabled={isLoading}
            />
            {errors.email_c && <p className="text-sm text-red-600 mt-1">{errors.email_c}</p>}
          </div>

          <div>
            <Label htmlFor="phone_c">Phone</Label>
            <Input
              id="phone_c"
              type="tel"
              value={formData.phone_c}
              onChange={(e) => handleChange('phone_c', e.target.value)}
              placeholder="+1 (555) 000-0000"
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="company_c">Company</Label>
            <Input
              id="company_c"
              type="text"
              value={formData.company_c}
              onChange={(e) => handleChange('company_c', e.target.value)}
              placeholder="Company name"
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="job_title_c">Job Title</Label>
            <Input
              id="job_title_c"
              type="text"
              value={formData.job_title_c}
              onChange={(e) => handleChange('job_title_c', e.target.value)}
              placeholder="Job title"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ApperIcon name="Target" className="w-5 h-5 mr-2" />
          Lead Qualification
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="lead_source_c">Lead Source</Label>
            <select
              id="lead_source_c"
              value={formData.lead_source_c}
              onChange={(e) => handleChange('lead_source_c', e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">Select source</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Social Media">Social Media</option>
            </select>
          </div>

          <div>
            <Label htmlFor="lead_status_c">Lead Status</Label>
            <select
              id="lead_status_c"
              value={formData.lead_status_c}
              onChange={(e) => handleChange('lead_status_c', e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Unqualified">Unqualified</option>
              <option value="Converted">Converted</option>
            </select>
          </div>

          <div>
            <Label htmlFor="lead_score_c">Lead Score (0-100)</Label>
            <Input
              id="lead_score_c"
              type="number"
              min="0"
              max="100"
              value={formData.lead_score_c}
              onChange={(e) => handleChange('lead_score_c', e.target.value)}
              placeholder="Enter score"
              disabled={isLoading}
            />
            {errors.lead_score_c && <p className="text-sm text-red-600 mt-1">{errors.lead_score_c}</p>}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ApperIcon name="UserCheck" className="w-5 h-5 mr-2" />
          Lead Assignment
        </h3>
        
<div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="assigned_to_c">Assigned To</Label>
            <select
              id="assigned_to_c"
              value={formData.assigned_to_c}
              onChange={(e) => handleChange('assigned_to_c', e.target.value)}
              disabled={isLoading || loadingUsers}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">Unassigned</option>
              {users.map(user => (
                <option key={user.Id} value={user.Id}>
                  {user.first_name_c} {user.last_name_c}
                </option>
              ))}
            </select>
            {loadingUsers && <p className="text-sm text-gray-500 mt-1">Loading sales reps...</p>}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </>
          ) : (
            <>
              <ApperIcon name="Save" size={16} />
              {lead ? 'Update Lead' : 'Create Lead'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;