import { useState, useEffect } from "react";
import ContactCard from "@/components/molecules/ContactCard";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { contactService } from "@/services/api/contactService";

const ContactGrid = ({ onCreateContact, onViewContact, onEditContact }) => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await contactService.getAll();
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      setError(err.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
if (!searchTerm) {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact => {
        const searchLower = searchTerm.toLowerCase();
        return (
          contact.first_name_c?.toLowerCase().includes(searchLower) ||
          contact.last_name_c?.toLowerCase().includes(searchLower) ||
          contact.email_c?.toLowerCase().includes(searchLower) ||
          contact.company_c?.toLowerCase().includes(searchLower) ||
          contact.phone_c?.includes(searchTerm)
        );
      });
      setFilteredContacts(filtered);
    }
  }, [contacts, searchTerm]);

const handleDeleteContact = async (contact) => {
    if (window.confirm(`Are you sure you want to delete ${contact.first_name_c} ${contact.last_name_c}?`)) {
      try {
        await contactService.delete(contact.Id);
        await loadContacts();
      } catch (err) {
        setError(err.message || "Failed to delete contact");
      }
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadContacts} />;
  }

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">All Contacts</h2>
          <p className="text-sm text-gray-600">
            {filteredContacts.length} of {contacts.length} contacts
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
        <Button onClick={onCreateContact} className="inline-flex items-center gap-2">
          <ApperIcon name="Plus" size={16} />
          Create New Contact
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search by name, email, company, or phone..."
        />
      </div>

      {/* Contacts Grid or Empty State */}
      {contacts.length === 0 ? (
        <Empty onCreateContact={onCreateContact} />
      ) : filteredContacts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Search" className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or create a new contact.
          </p>
          <Button onClick={() => setSearchTerm("")} variant="outline">
            Clear Search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.Id}
              contact={contact}
              onView={onViewContact}
              onEdit={onEditContact}
              onDelete={handleDeleteContact}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactGrid;