import React, { useState } from "react";
import ContactGrid from "@/components/organisms/ContactGrid";
import ContactForm from "@/components/molecules/ContactForm";
import ContactDetail from "@/components/molecules/ContactDetail";
import ApperIcon from "@/components/atoms/ApperIcon";
import { contactService } from "@/services/api/contactService";
import { toast } from "react-toastify";

const ContactsPage = () => {
  const [currentView, setCurrentView] = useState("list"); // "list", "create", "edit", "detail"
  const [selectedContact, setSelectedContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateContact = () => {
    setSelectedContact(null);
    setCurrentView("create");
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setCurrentView("edit");
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setCurrentView("detail");
  };

  const handleDeleteContact = async (contact) => {
    if (window.confirm(`Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`)) {
      try {
        await contactService.delete(contact.Id);
        setCurrentView("list");
        toast.success("Contact deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete contact");
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setIsLoading(true);
      
      if (selectedContact) {
        // Update existing contact
        await contactService.update(selectedContact.Id, formData);
        toast.success("Contact updated successfully!");
      } else {
        // Create new contact
        await contactService.create(formData);
        toast.success("Contact created successfully!");
      }
      
      setCurrentView("list");
    } catch (error) {
      toast.error(selectedContact ? "Failed to update contact" : "Failed to create contact");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormCancel = () => {
    setCurrentView("list");
    setSelectedContact(null);
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedContact(null);
  };

  if (currentView === "create" || currentView === "edit") {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-2">
              <button
                onClick={handleBackToList}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentView === "edit" ? "Edit Contact" : "Create New Contact"}
              </h1>
            </div>
            <p className="text-gray-600 ml-14">
              {currentView === "edit" 
                ? "Update contact information and save changes"
                : "Add a new contact to your CRM system"
              }
            </p>
          </div>

          <ContactForm
            contact={selectedContact}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }

  if (currentView === "detail" && selectedContact) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <button
            onClick={handleBackToList}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span>Back to Contacts</span>
          </button>
        </div>
        
        <ContactDetail
          contact={selectedContact}
          onEdit={() => handleEditContact(selectedContact)}
          onDelete={() => handleDeleteContact(selectedContact)}
          onClose={handleBackToList}
        />
      </div>
    );
  }

  return (
    <ContactGrid
      onCreateContact={handleCreateContact}
      onViewContact={handleViewContact}
      onEditContact={handleEditContact}
    />
  );
};

export default ContactsPage;