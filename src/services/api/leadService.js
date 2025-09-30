class LeadService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'leads_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "job_title_c"}},
          {"field": {"Name": "lead_source_c"}},
          {"field": {"Name": "lead_status_c"}},
          {"field": {"Name": "lead_score_c"}},
          {"field": {"Name": "assigned_to_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        orderBy: [{"fieldName": "ModifiedOn", "sorttype": "DESC"}],
        pagingInfo: {"limit": 1000, "offset": 0}
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (!response?.data?.length) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching leads:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "job_title_c"}},
          {"field": {"Name": "lead_source_c"}},
          {"field": {"Name": "lead_status_c"}},
          {"field": {"Name": "lead_score_c"}},
          {"field": {"Name": "assigned_to_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response?.data) {
        throw new Error(`Lead with Id ${id} not found`);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching lead ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  }

  async create(leadData) {
    try {
      const recordData = {
        Name: leadData.name_c || '',
        name_c: leadData.name_c || '',
        email_c: leadData.email_c || '',
        phone_c: leadData.phone_c || '',
        company_c: leadData.company_c || '',
        job_title_c: leadData.job_title_c || '',
        lead_source_c: leadData.lead_source_c || '',
        lead_status_c: leadData.lead_status_c || 'New',
        lead_score_c: leadData.lead_score_c !== undefined && leadData.lead_score_c !== null && leadData.lead_score_c !== '' ? parseInt(leadData.lead_score_c) : undefined
      };
      
      // Handle lookup field - convert to integer ID only
      if (leadData.assigned_to_c) {
        const assignedToId = leadData.assigned_to_c?.Id || leadData.assigned_to_c;
        if (assignedToId) {
          recordData.assigned_to_c = parseInt(assignedToId);
        }
      }
      
      // Remove fields with empty values
      Object.keys(recordData).forEach(key => {
        if (recordData[key] === '' || recordData[key] === null || recordData[key] === undefined) {
          delete recordData[key];
        }
      });
      
      const params = {
        records: [recordData]
      };
      
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records: ${JSON.stringify(failed)}`);
          const errorMessage = failed[0].message || 'Failed to create lead';
          throw new Error(errorMessage);
        }
        
        if (successful.length > 0) {
          return successful[0].data;
        }
      }
      
      throw new Error('No lead created');
    } catch (error) {
      console.error("Error creating lead:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async update(id, leadData) {
    try {
      const recordData = {
        Id: id,
        Name: leadData.name_c || '',
        name_c: leadData.name_c || '',
        email_c: leadData.email_c || '',
        phone_c: leadData.phone_c || '',
        company_c: leadData.company_c || '',
        job_title_c: leadData.job_title_c || '',
        lead_source_c: leadData.lead_source_c || '',
        lead_status_c: leadData.lead_status_c || '',
        lead_score_c: leadData.lead_score_c !== undefined && leadData.lead_score_c !== null && leadData.lead_score_c !== '' ? parseInt(leadData.lead_score_c) : undefined
      };
      
      // Handle lookup field - convert to integer ID only
      if (leadData.assigned_to_c) {
        const assignedToId = leadData.assigned_to_c?.Id || leadData.assigned_to_c;
        if (assignedToId) {
          recordData.assigned_to_c = parseInt(assignedToId);
        }
      }
      
      // Remove fields with empty values (except Id)
      Object.keys(recordData).forEach(key => {
        if (key !== 'Id' && (recordData[key] === '' || recordData[key] === null || recordData[key] === undefined)) {
          delete recordData[key];
        }
      });
      
      const params = {
        records: [recordData]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records: ${JSON.stringify(failed)}`);
          const errorMessage = failed[0].message || 'Failed to update lead';
          throw new Error(errorMessage);
        }
        
        if (successful.length > 0) {
          return successful[0].data;
        }
      }
      
      throw new Error('Lead not updated');
    } catch (error) {
      console.error("Error updating lead:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const params = { 
        RecordIds: [id]
      };
      
      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records: ${JSON.stringify(failed)}`);
          const errorMessage = failed[0].message || 'Failed to delete lead';
          throw new Error(errorMessage);
        }
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting lead:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async searchLeads(query) {
    try {
      if (!query) {
        return this.getAll();
      }
      
      const searchTerm = query.toLowerCase();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "job_title_c"}},
          {"field": {"Name": "lead_source_c"}},
          {"field": {"Name": "lead_status_c"}},
          {"field": {"Name": "lead_score_c"}},
          {"field": {"Name": "assigned_to_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "name_c", "operator": "Contains", "values": [searchTerm]},
                {"fieldName": "email_c", "operator": "Contains", "values": [searchTerm]},
                {"fieldName": "company_c", "operator": "Contains", "values": [searchTerm]},
                {"fieldName": "job_title_c", "operator": "Contains", "values": [searchTerm]},
                {"fieldName": "phone_c", "operator": "Contains", "values": [query]}
              ],
              "operator": "OR"
            }
          ]
        }],
        orderBy: [{"fieldName": "ModifiedOn", "sorttype": "DESC"}],
        pagingInfo: {"limit": 1000, "offset": 0}
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (!response?.data?.length) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error searching leads:", error?.response?.data?.message || error);
      throw error;
    }
  }
}

export const leadService = new LeadService();