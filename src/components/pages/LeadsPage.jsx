import React, { useState } from "react";
import { leadService } from "@/services/api/leadService";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import LeadGrid from "@/components/organisms/LeadGrid";
import LeadDetail from "@/components/molecules/LeadDetail";
import LeadForm from "@/components/molecules/LeadForm";

const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const LeadsPage = () => {
  const [currentView, setCurrentView] = useState("list");
  const [selectedLead, setSelectedLead] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateLead = () => {
    setSelectedLead(null);
    setCurrentView("create");
  };

  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setCurrentView("edit");
  };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setCurrentView("detail");
  };

  const handleDeleteLead = async (lead) => {
    if (window.confirm(`Are you sure you want to delete ${lead.name_c}?`)) {
      try {
        await leadService.delete(lead.Id);
        setCurrentView("list");
        toast.success("Lead deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete lead");
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setIsLoading(true);
      
      if (selectedLead) {
        await leadService.update(selectedLead.Id, formData);
        toast.success("Lead updated successfully!");
      } else {
        await leadService.create(formData);
        toast.success("Lead created successfully!");
      }
      
      setCurrentView("list");
    } catch (error) {
      toast.error(selectedLead ? "Failed to update lead" : "Failed to create lead");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormCancel = () => {
    setCurrentView("list");
    setSelectedLead(null);
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedLead(null);
  };

  if (currentView === "create" || currentView === "edit") {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-2">
              <button
                onClick={handleBackToList}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentView === "edit" ? "Edit Lead" : "Create New Lead"}
              </h1>
            </div>
            <p className="text-gray-600 ml-14">
              {currentView === "edit" 
                ? "Update lead information and save changes"
                : "Add a new lead to your CRM system"
              }
            </p>
          </div>

          <LeadForm
            lead={selectedLead}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }

  if (currentView === "detail" && selectedLead) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <button
            onClick={handleBackToList}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span>Back to Leads</span>
          </button>
        </div>
        
        <LeadDetail
          lead={selectedLead}
          onEdit={() => handleEditLead(selectedLead)}
          onDelete={() => handleDeleteLead(selectedLead)}
          onClose={handleBackToList}
        />
      </div>
    );
  }

  return (
    <LeadGrid
      onCreateLead={handleCreateLead}
      onViewLead={handleViewLead}
      onEditLead={handleEditLead}
    />
  );
};

export default LeadsPage;