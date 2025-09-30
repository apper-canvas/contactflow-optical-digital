import { Card, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ContactCard = ({ contact, onView, onEdit, onDelete }) => {
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const formatAddress = (address) => {
    if (!address) return "";
    const parts = [address.city, address.state].filter(Boolean);
    return parts.join(", ");
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer group">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            {getInitials(contact.firstName, contact.lastName)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
              {contact.firstName} {contact.lastName}
            </h3>
            {contact.jobTitle && contact.company && (
              <p className="text-sm text-gray-600 mt-1">
                {contact.jobTitle} at {contact.company}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {contact.email && (
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="Mail" className="w-4 h-4 mr-2 text-gray-400" />
              <span className="truncate">{contact.email}</span>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="Phone" className="w-4 h-4 mr-2 text-gray-400" />
              <span>{contact.phone}</span>
            </div>
          )}
          {contact.address && formatAddress(contact.address) && (
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="MapPin" className="w-4 h-4 mr-2 text-gray-400" />
              <span className="truncate">{formatAddress(contact.address)}</span>
            </div>
          )}
          {contact.socialMedia && (
            <div className="flex items-center space-x-2 mt-2">
              {contact.socialMedia.linkedin && (
                <ApperIcon name="Linkedin" className="w-4 h-4 text-blue-600" />
              )}
              {contact.socialMedia.twitter && (
                <ApperIcon name="Twitter" className="w-4 h-4 text-blue-400" />
              )}
              {contact.socialMedia.facebook && (
                <ApperIcon name="Facebook" className="w-4 h-4 text-blue-700" />
              )}
              {contact.socialMedia.instagram && (
                <ApperIcon name="Instagram" className="w-4 h-4 text-pink-600" />
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Added {new Date(contact.createdAt).toLocaleDateString()}
          </span>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onView(contact);
              }}
              className="text-gray-600 hover:text-primary-600"
            >
              <ApperIcon name="Eye" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(contact);
              }}
              className="text-gray-600 hover:text-primary-600"
            >
              <ApperIcon name="Edit2" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(contact);
              }}
              className="text-gray-600 hover:text-red-600"
            >
              <ApperIcon name="Trash2" size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;