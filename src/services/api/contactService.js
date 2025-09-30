import contactsData from "@/services/mockData/contacts.json";

// Simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ContactService {
  constructor() {
    this.contacts = [...contactsData];
  }

  async getAll() {
    await delay(300);
    return [...this.contacts].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }

  async getById(id) {
    await delay(200);
    const contact = this.contacts.find(c => c.Id === id);
    if (!contact) {
      throw new Error(`Contact with Id ${id} not found`);
    }
    return { ...contact };
  }

  async create(contactData) {
    await delay(400);
    
    // Find the highest existing Id and add 1
    const maxId = Math.max(...this.contacts.map(c => c.Id), 0);
    const newContact = {
      ...contactData,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    this.contacts.push(newContact);
    return { ...newContact };
  }

  async update(id, contactData) {
    await delay(350);
    
    const index = this.contacts.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error(`Contact with Id ${id} not found`);
    }
    
    const updatedContact = {
      ...contactData,
      Id: id,
      createdAt: this.contacts[index].createdAt,
      updatedAt: new Date().toISOString(),
    };
    
    this.contacts[index] = updatedContact;
    return { ...updatedContact };
  }

  async delete(id) {
    await delay(250);
    
    const index = this.contacts.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error(`Contact with Id ${id} not found`);
    }
    
    const deletedContact = { ...this.contacts[index] };
    this.contacts.splice(index, 1);
    return deletedContact;
  }

  async searchContacts(query) {
    await delay(200);
    
    if (!query) {
      return this.getAll();
    }
    
    const searchTerm = query.toLowerCase();
    const filteredContacts = this.contacts.filter(contact => 
      contact.firstName?.toLowerCase().includes(searchTerm) ||
      contact.lastName?.toLowerCase().includes(searchTerm) ||
      contact.email?.toLowerCase().includes(searchTerm) ||
      contact.company?.toLowerCase().includes(searchTerm) ||
      contact.phone?.includes(query)
    );
    
    return [...filteredContacts].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }
}

export const contactService = new ContactService();