import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ContactDetail = ({ contact, onEdit, onDelete, onClose }) => {
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const formatAddress = (address) => {
    if (!address) return "";
    const parts = [
      address.street,
      address.city,
      address.state,
      address.zipCode,
      address.country
    ].filter(Boolean);
    return parts.join(", ");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-t-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
              {getInitials(contact.firstName, contact.lastName)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {contact.firstName} {contact.lastName}
              </h1>
              {contact.jobTitle && contact.company && (
                <p className="text-primary-100 text-lg">
                  {contact.jobTitle} at {contact.company}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <ApperIcon name="X" size={20} />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-3">
          <Button
            onClick={onEdit}
            className="bg-white text-primary-600 hover:bg-gray-50"
          >
            <ApperIcon name="Edit2" size={16} className="mr-2" />
            Edit Contact
          </Button>
          <Button
            variant="ghost"
            onClick={onDelete}
            className="text-white hover:bg-white/20"
          >
            <ApperIcon name="Trash2" size={16} className="mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-b-lg border border-gray-200 p-6 space-y-8">
        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ApperIcon name="User" className="w-5 h-5 text-primary-500" />
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contact.email && (
              <div className="flex items-start space-x-3">
                <ApperIcon name="Mail" className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{contact.email}</p>
                </div>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-start space-x-3">
                <ApperIcon name="Phone" className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">{contact.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Company Information */}
        {(contact.company || contact.jobTitle) && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ApperIcon name="Building" className="w-5 h-5 text-primary-500" />
              Company Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contact.company && (
                <div className="flex items-start space-x-3">
                  <ApperIcon name="Building2" className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Company</p>
                    <p className="text-gray-900">{contact.company}</p>
                  </div>
                </div>
              )}
              {contact.jobTitle && (
                <div className="flex items-start space-x-3">
                  <ApperIcon name="Briefcase" className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Job Title</p>
                    <p className="text-gray-900">{contact.jobTitle}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Address */}
        {contact.address && formatAddress(contact.address) && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ApperIcon name="MapPin" className="w-5 h-5 text-primary-500" />
              Address
            </h2>
            <div className="flex items-start space-x-3">
              <ApperIcon name="MapPin" className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-gray-900">{formatAddress(contact.address)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Social Media */}
        {contact.socialMedia && Object.values(contact.socialMedia).some(url => url) && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ApperIcon name="Share2" className="w-5 h-5 text-primary-500" />
              Social Media
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contact.socialMedia.linkedin && (
                <a
                  href={contact.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ApperIcon name="Linkedin" className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900">LinkedIn Profile</span>
                </a>
              )}
              {contact.socialMedia.twitter && (
                <a
                  href={contact.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ApperIcon name="Twitter" className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-900">Twitter Profile</span>
                </a>
              )}
              {contact.socialMedia.facebook && (
                <a
                  href={contact.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ApperIcon name="Facebook" className="w-5 h-5 text-blue-700" />
                  <span className="text-gray-900">Facebook Profile</span>
                </a>
              )}
              {contact.socialMedia.instagram && (
                <a
                  href={contact.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ApperIcon name="Instagram" className="w-5 h-5 text-pink-600" />
                  <span className="text-gray-900">Instagram Profile</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Notes */}
        {contact.notes && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ApperIcon name="FileText" className="w-5 h-5 text-primary-500" />
              Notes
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900 whitespace-pre-wrap">{contact.notes}</p>
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-500">
            <div>
              <span className="font-medium">Created:</span> {formatDate(contact.createdAt)}
            </div>
            <div>
              <span className="font-medium">Last Updated:</span> {formatDate(contact.updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;