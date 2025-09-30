import { useState, useEffect } from "react";
import LeadCard from "@/components/molecules/LeadCard";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { leadService } from "@/services/api/leadService";

const LeadGrid = ({ onCreateLead, onViewLead, onEditLead }) => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadLeads = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await leadService.getAll();
      setLeads(data);
      setFilteredLeads(data);
    } catch (err) {
      setError(err.message || "Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredLeads(leads);
    } else {
      const filtered = leads.filter(lead => {
        const searchLower = searchTerm.toLowerCase();
        return (
          lead.name_c?.toLowerCase().includes(searchLower) ||
          lead.email_c?.toLowerCase().includes(searchLower) ||
          lead.company_c?.toLowerCase().includes(searchLower) ||
          lead.job_title_c?.toLowerCase().includes(searchLower) ||
          lead.lead_status_c?.toLowerCase().includes(searchLower) ||
          lead.phone_c?.includes(searchTerm)
        );
      });
      setFilteredLeads(filtered);
    }
  }, [leads, searchTerm]);

  const handleDeleteLead = async (lead) => {
    if (window.confirm(`Are you sure you want to delete ${lead.name_c}?`)) {
      try {
        await leadService.delete(lead.Id);
        await loadLeads();
      } catch (err) {
        setError(err.message || "Failed to delete lead");
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
    return <Error message={error} onRetry={loadLeads} />;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">All Leads</h2>
          <p className="text-sm text-gray-600">
            {filteredLeads.length} of {leads.length} leads
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
        <Button onClick={onCreateLead} className="inline-flex items-center gap-2">
          <ApperIcon name="Plus" size={16} />
          Create New Lead
        </Button>
      </div>

      <div className="mb-6">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search by name, email, company, job title, or status..."
        />
      </div>

      {leads.length === 0 ? (
        <Empty onCreateContact={onCreateLead} />
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Search" className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or create a new lead.
          </p>
          <Button onClick={() => setSearchTerm("")} variant="outline">
            Clear Search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeads.map((lead) => (
            <LeadCard
              key={lead.Id}
              lead={lead}
              onView={onViewLead}
              onEdit={onEditLead}
              onDelete={handleDeleteLead}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadGrid;