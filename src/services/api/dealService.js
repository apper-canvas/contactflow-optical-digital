import { getApperClient } from '@/services/apperClient';
import { toast } from 'react-toastify';

class DealService {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not initialized');
      }

      const response = await apperClient.fetchRecords('deals_c', {
        fields: [
          { field: { Name: 'Id' } },
          { field: { Name: 'Name' } },
          { field: { Name: 'deal_name_c' } },
          { field: { Name: 'deal_value_c' } },
          { field: { Name: 'deal_stage_c' } },
          { field: { Name: 'probability_c' } },
          { field: { Name: 'expected_close_date_c' } },
          { field: { Name: 'associated_contact_c' } },
          { field: { Name: 'associated_company_c' } },
          { field: { Name: 'owner_c' } },
          { field: { Name: 'Tags' } },
          { field: { Name: 'CreatedOn' } },
          { field: { Name: 'ModifiedOn' } }
        ],
        orderBy: [{ fieldName: 'ModifiedOn', sorttype: 'DESC' }],
        pagingInfo: { limit: 100, offset: 0 }
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error('Error fetching deals:', error?.response?.data?.message || error);
      toast.error('Failed to load deals');
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not initialized');
      }

      const response = await apperClient.getRecordById('deals_c', id, {
        fields: [
          { field: { Name: 'Id' } },
          { field: { Name: 'Name' } },
          { field: { Name: 'deal_name_c' } },
          { field: { Name: 'deal_value_c' } },
          { field: { Name: 'deal_stage_c' } },
          { field: { Name: 'probability_c' } },
          { field: { Name: 'expected_close_date_c' } },
          { field: { Name: 'associated_contact_c' } },
          { field: { Name: 'associated_company_c' } },
          { field: { Name: 'owner_c' } },
          { field: { Name: 'Tags' } },
          { field: { Name: 'CreatedOn' } },
          { field: { Name: 'CreatedBy' } },
          { field: { Name: 'ModifiedOn' } },
          { field: { Name: 'ModifiedBy' } }
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching deal ${id}:`, error?.response?.data?.message || error);
      toast.error('Failed to load deal details');
      return null;
    }
  }

  async create(dealData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not initialized');
      }

      // Only include Updateable fields
      const payload = {
        records: [{
          Name: dealData.Name || dealData.deal_name_c || 'New Deal',
          deal_name_c: dealData.deal_name_c,
          deal_value_c: dealData.deal_value_c ? parseFloat(dealData.deal_value_c) : 0,
          deal_stage_c: dealData.deal_stage_c,
          probability_c: dealData.probability_c ? parseInt(dealData.probability_c) : 0,
          expected_close_date_c: dealData.expected_close_date_c,
          associated_contact_c: dealData.associated_contact_c ? parseInt(dealData.associated_contact_c) : null,
          associated_company_c: dealData.associated_company_c,
          owner_c: dealData.owner_c ? parseInt(dealData.owner_c) : null
        }]
      };

      // Remove null values
      Object.keys(payload.records[0]).forEach(key => {
        if (payload.records[0][key] === null || payload.records[0][key] === undefined || payload.records[0][key] === '') {
          delete payload.records[0][key];
        }
      });

      const response = await apperClient.createRecord('deals_c', payload);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} deals:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }

        if (successful.length > 0) {
          toast.success('Deal created successfully');
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error('Error creating deal:', error?.response?.data?.message || error);
      toast.error('Failed to create deal');
      return null;
    }
  }

  async update(id, dealData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not initialized');
      }

      // Only include Updateable fields plus Id
      const payload = {
        records: [{
          Id: parseInt(id),
          Name: dealData.Name || dealData.deal_name_c || 'New Deal',
          deal_name_c: dealData.deal_name_c,
          deal_value_c: dealData.deal_value_c ? parseFloat(dealData.deal_value_c) : 0,
          deal_stage_c: dealData.deal_stage_c,
          probability_c: dealData.probability_c ? parseInt(dealData.probability_c) : 0,
          expected_close_date_c: dealData.expected_close_date_c,
          associated_contact_c: dealData.associated_contact_c ? parseInt(dealData.associated_contact_c) : null,
          associated_company_c: dealData.associated_company_c,
          owner_c: dealData.owner_c ? parseInt(dealData.owner_c) : null
        }]
      };

      // Remove null/undefined/empty values except Id
      Object.keys(payload.records[0]).forEach(key => {
        if (key !== 'Id' && (payload.records[0][key] === null || payload.records[0][key] === undefined || payload.records[0][key] === '')) {
          delete payload.records[0][key];
        }
      });

      const response = await apperClient.updateRecord('deals_c', payload);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} deals:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }

        if (successful.length > 0) {
          toast.success('Deal updated successfully');
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error('Error updating deal:', error?.response?.data?.message || error);
      toast.error('Failed to update deal');
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not initialized');
      }

      const response = await apperClient.deleteRecord('deals_c', {
        RecordIds: [parseInt(id)]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} deals:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return false;
        }

        toast.success('Deal deleted successfully');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error deleting deal:', error?.response?.data?.message || error);
      toast.error('Failed to delete deal');
      return false;
    }
  }

  async searchDeals(query) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not initialized');
      }

      const response = await apperClient.fetchRecords('deals_c', {
        fields: [
          { field: { Name: 'Id' } },
          { field: { Name: 'Name' } },
          { field: { Name: 'deal_name_c' } },
          { field: { Name: 'deal_value_c' } },
          { field: { Name: 'deal_stage_c' } },
          { field: { Name: 'probability_c' } },
          { field: { Name: 'expected_close_date_c' } },
          { field: { Name: 'associated_contact_c' } },
          { field: { Name: 'associated_company_c' } },
          { field: { Name: 'owner_c' } }
        ],
        whereGroups: [{
          operator: 'OR',
          subGroups: [{
            conditions: [
              { fieldName: 'deal_name_c', operator: 'Contains', values: [query] },
              { fieldName: 'associated_company_c', operator: 'Contains', values: [query] }
            ],
            operator: 'OR'
          }]
        }],
        orderBy: [{ fieldName: 'ModifiedOn', sorttype: 'DESC' }],
        pagingInfo: { limit: 100, offset: 0 }
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error('Error searching deals:', error?.response?.data?.message || error);
      return [];
    }
  }
}

export const dealService = new DealService();