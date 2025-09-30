class ContactService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'contact_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "job_title_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "social_media_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "tags_c"}},
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
      
      // Parse nested JSON fields
      return response.data.map(contact => ({
        ...contact,
        address_c: contact.address_c ? JSON.parse(contact.address_c) : null,
        social_media_c: contact.social_media_c ? JSON.parse(contact.social_media_c) : null
      }));
    } catch (error) {
      console.error("Error fetching contacts:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "job_title_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "social_media_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "tags_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response?.data) {
        throw new Error(`Contact with Id ${id} not found`);
      }
      
      // Parse nested JSON fields
      const contact = response.data;
      return {
        ...contact,
        address_c: contact.address_c ? JSON.parse(contact.address_c) : null,
        social_media_c: contact.social_media_c ? JSON.parse(contact.social_media_c) : null
      };
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  }

  async create(contactData) {
    try {
      // Prepare data with only Updateable fields
      const recordData = {
        Name: `${contactData.first_name_c || ''} ${contactData.last_name_c || ''}`.trim(),
        first_name_c: contactData.first_name_c || '',
        last_name_c: contactData.last_name_c || '',
        email_c: contactData.email_c || '',
        phone_c: contactData.phone_c || '',
        company_c: contactData.company_c || '',
        job_title_c: contactData.job_title_c || '',
        notes_c: contactData.notes_c || '',
        tags_c: contactData.tags_c || ''
      };
      
      // Serialize nested objects as JSON strings for MultilineText fields
      if (contactData.address_c) {
        recordData.address_c = JSON.stringify(contactData.address_c);
      }
      if (contactData.social_media_c) {
        recordData.social_media_c = JSON.stringify(contactData.social_media_c);
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
          const errorMessage = failed[0].message || 'Failed to create contact';
          throw new Error(errorMessage);
        }
        
        if (successful.length > 0) {
          const createdContact = successful[0].data;
          return {
            ...createdContact,
            address_c: createdContact.address_c ? JSON.parse(createdContact.address_c) : null,
            social_media_c: createdContact.social_media_c ? JSON.parse(createdContact.social_media_c) : null
          };
        }
      }
      
      throw new Error('No contact created');
    } catch (error) {
      console.error("Error creating contact:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async update(id, contactData) {
    try {
      // Prepare data with only Updateable fields
      const recordData = {
        Id: id,
        Name: `${contactData.first_name_c || ''} ${contactData.last_name_c || ''}`.trim(),
        first_name_c: contactData.first_name_c || '',
        last_name_c: contactData.last_name_c || '',
        email_c: contactData.email_c || '',
        phone_c: contactData.phone_c || '',
        company_c: contactData.company_c || '',
        job_title_c: contactData.job_title_c || '',
        notes_c: contactData.notes_c || '',
        tags_c: contactData.tags_c || ''
      };
      
      // Serialize nested objects as JSON strings for MultilineText fields
      if (contactData.address_c) {
        recordData.address_c = JSON.stringify(contactData.address_c);
      }
      if (contactData.social_media_c) {
        recordData.social_media_c = JSON.stringify(contactData.social_media_c);
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
          const errorMessage = failed[0].message || 'Failed to update contact';
          throw new Error(errorMessage);
        }
        
        if (successful.length > 0) {
          const updatedContact = successful[0].data;
          return {
            ...updatedContact,
            address_c: updatedContact.address_c ? JSON.parse(updatedContact.address_c) : null,
            social_media_c: updatedContact.social_media_c ? JSON.parse(updatedContact.social_media_c) : null
          };
        }
      }
      
      throw new Error('Contact not updated');
    } catch (error) {
      console.error("Error updating contact:", error?.response?.data?.message || error);
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
          const errorMessage = failed[0].message || 'Failed to delete contact';
          throw new Error(errorMessage);
        }
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting contact:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async searchContacts(query) {
    try {
      if (!query) {
        return this.getAll();
      }
      
      const searchTerm = query.toLowerCase();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "job_title_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "social_media_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "tags_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "first_name_c", "operator": "Contains", "values": [searchTerm]},
                {"fieldName": "last_name_c", "operator": "Contains", "values": [searchTerm]},
                {"fieldName": "email_c", "operator": "Contains", "values": [searchTerm]},
                {"fieldName": "company_c", "operator": "Contains", "values": [searchTerm]},
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
      
      // Parse nested JSON fields
      return response.data.map(contact => ({
        ...contact,
        address_c: contact.address_c ? JSON.parse(contact.address_c) : null,
        social_media_c: contact.social_media_c ? JSON.parse(contact.social_media_c) : null
      }));
    } catch (error) {
      console.error("Error searching contacts:", error?.response?.data?.message || error);
      throw error;
    }
  }
}

export const contactService = new ContactService();