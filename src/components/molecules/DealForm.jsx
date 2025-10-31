import React, { useEffect, useState } from 'react';
import { userService } from '@/services/api/userService';
import { contactService } from '@/services/api/contactService';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import Loading from '@/components/ui/Loading';

function DealForm({ deal, onSubmit, onCancel, mode = 'create' }) {
  const [formData, setFormData] = useState({
    Name: '',
    deal_name_c: '',
    deal_value_c: '',
    deal_stage_c: 'Prospecting',
    probability_c: '0',
    expected_close_date_c: '',
    associated_contact_c: '',
    associated_company_c: '',
    owner_c: ''
  });

  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const stageOptions = [
    'Prospecting',
    'Qualification',
    'Proposal',
    'Negotiation',
    'Closed Won',
    'Closed Lost'
  ];

  useEffect(() => {
    loadUsers();
    loadContacts();
  }, []);

  useEffect(() => {
    if (deal && mode === 'edit') {
      setFormData({
        Name: deal.Name || '',
        deal_name_c: deal.deal_name_c || '',
        deal_value_c: deal.deal_value_c?.toString() || '',
        deal_stage_c: deal.deal_stage_c || 'Prospecting',
        probability_c: deal.probability_c?.toString() || '0',
        expected_close_date_c: deal.expected_close_date_c || '',
        associated_contact_c: deal.associated_contact_c?.Id?.toString() || '',
        associated_company_c: deal.associated_company_c || '',
        owner_c: deal.owner_c?.Id?.toString() || ''
      });
    }
  }, [deal, mode]);

  const loadUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const loadContacts = async () => {
    try {
      const data = await contactService.getAll();
      setContacts(data);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.deal_name_c.trim()) {
      newErrors.deal_name_c = 'Deal name is required';
    }

    if (!formData.deal_value_c || parseFloat(formData.deal_value_c) < 0) {
      newErrors.deal_value_c = 'Please enter a valid deal value';
    }

    if (!formData.deal_stage_c) {
      newErrors.deal_stage_c = 'Please select a deal stage';
    }

    const probability = parseInt(formData.probability_c);
    if (isNaN(probability) || probability < 0 || probability > 100) {
      newErrors.probability_c = 'Probability must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      Name: formData.deal_name_c || formData.Name
    };

    onSubmit(submitData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Create New Deal' : 'Edit Deal'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deal Name */}
            <div className="md:col-span-2">
              <Label htmlFor="deal_name_c">
                Deal Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="deal_name_c"
                type="text"
                value={formData.deal_name_c}
                onChange={(e) => handleChange('deal_name_c', e.target.value)}
                placeholder="Enter deal name"
                className={errors.deal_name_c ? 'border-red-500' : ''}
              />
              {errors.deal_name_c && (
                <p className="mt-1 text-sm text-red-600">{errors.deal_name_c}</p>
              )}
            </div>

            {/* Deal Value */}
            <div>
              <Label htmlFor="deal_value_c">
                Deal Value <span className="text-red-500">*</span>
              </Label>
              <Input
                id="deal_value_c"
                type="number"
                step="0.01"
                min="0"
                value={formData.deal_value_c}
                onChange={(e) => handleChange('deal_value_c', e.target.value)}
                placeholder="0.00"
                className={errors.deal_value_c ? 'border-red-500' : ''}
              />
              {errors.deal_value_c && (
                <p className="mt-1 text-sm text-red-600">{errors.deal_value_c}</p>
              )}
            </div>

            {/* Probability */}
            <div>
              <Label htmlFor="probability_c">
                Probability (%) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="probability_c"
                type="number"
                min="0"
                max="100"
                value={formData.probability_c}
                onChange={(e) => handleChange('probability_c', e.target.value)}
                placeholder="0-100"
                className={errors.probability_c ? 'border-red-500' : ''}
              />
              {errors.probability_c && (
                <p className="mt-1 text-sm text-red-600">{errors.probability_c}</p>
              )}
            </div>

            {/* Deal Stage */}
            <div>
              <Label htmlFor="deal_stage_c">
                Deal Stage <span className="text-red-500">*</span>
              </Label>
              <select
                id="deal_stage_c"
                value={formData.deal_stage_c}
                onChange={(e) => handleChange('deal_stage_c', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.deal_stage_c ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                {stageOptions.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
              {errors.deal_stage_c && (
                <p className="mt-1 text-sm text-red-600">{errors.deal_stage_c}</p>
              )}
            </div>

            {/* Expected Close Date */}
            <div>
              <Label htmlFor="expected_close_date_c">Expected Close Date</Label>
              <Input
                id="expected_close_date_c"
                type="date"
                value={formData.expected_close_date_c}
                onChange={(e) => handleChange('expected_close_date_c', e.target.value)}
              />
            </div>

            {/* Associated Company */}
            <div className="md:col-span-2">
              <Label htmlFor="associated_company_c">Associated Company</Label>
              <Input
                id="associated_company_c"
                type="text"
                value={formData.associated_company_c}
                onChange={(e) => handleChange('associated_company_c', e.target.value)}
                placeholder="Company name"
              />
            </div>

            {/* Associated Contact */}
            <div>
              <Label htmlFor="associated_contact_c">Associated Contact</Label>
              <select
                id="associated_contact_c"
                value={formData.associated_contact_c}
                onChange={(e) => handleChange('associated_contact_c', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select a contact</option>
                {contacts.map((contact) => (
                  <option key={contact.Id} value={contact.Id}>
                    {contact.Name || `${contact.first_name_c} ${contact.last_name_c}`.trim() || 'Unnamed Contact'}
                  </option>
                ))}
              </select>
            </div>

            {/* Owner */}
            <div>
              <Label htmlFor="owner_c">Owner</Label>
              <select
                id="owner_c"
                value={formData.owner_c}
                onChange={(e) => handleChange('owner_c', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select an owner</option>
                {users.map((user) => (
                  <option key={user.Id} value={user.Id}>
                    {user.Name || `${user.first_name_c} ${user.last_name_c}`.trim() || 'Unnamed User'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="px-4 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700"
            >
              {mode === 'create' ? 'Create Deal' : 'Update Deal'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DealForm;