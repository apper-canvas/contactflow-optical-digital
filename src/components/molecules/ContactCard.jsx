import { Card, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ContactCard = ({ contact, onView, onEdit, onDelete }) => {
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const formatAddress = (address) => {
    if (!address) return "";
    if (typeof address === 'string') {
      try {
        address = JSON.parse(address);
      } catch (e) {
        return "";
      }
    }
    const parts = [address.city, address.state].filter(Boolean);
    return parts.join(", ");
  };
  
  const parseSocialMedia = (socialMedia) => {
    if (!socialMedia) return null;
    if (typeof socialMedia === 'string') {
      try {
        return JSON.parse(socialMedia);
      } catch (e) {
        return null;
      }
    }
    return socialMedia;
  };
  
  const socialMediaParsed = parseSocialMedia(contact.social_media_c);

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer group">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            {getInitials(contact.first_name_c, contact.last_name_c)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
              {contact.first_name_c} {contact.last_name_c}
            </h3>
            {contact.job_title_c && contact.company_c && (
              <p className="text-sm text-gray-600 mt-1">
                {contact.job_title_c} at {contact.company_c}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {contact.email_c && (
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="Mail" className="w-4 h-4 mr-2 text-gray-400" />
              <span className="truncate">{contact.email_c}</span>
            </div>
          )}
          {contact.phone_c && (
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="Phone" className="w-4 h-4 mr-2 text-gray-400" />
              <span>{contact.phone_c}</span>
            </div>
          )}
          {contact.address_c && formatAddress(contact.address_c) && (
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="MapPin" className="w-4 h-4 mr-2 text-gray-400" />
              <span className="truncate">{formatAddress(contact.address_c)}</span>
            </div>
          )}
          {socialMediaParsed && (
            <div className="flex items-center space-x-2 mt-2">
              {socialMediaParsed.linkedin && (
                <ApperIcon name="Linkedin" className="w-4 h-4 text-blue-600" />
              )}
              {socialMediaParsed.twitter && (
                <ApperIcon name="Twitter" className="w-4 h-4 text-blue-400" />
              )}
              {socialMediaParsed.facebook && (
                <ApperIcon name="Facebook" className="w-4 h-4 text-blue-700" />
              )}
              {socialMediaParsed.instagram && (
                <ApperIcon name="Instagram" className="w-4 h-4 text-pink-600" />
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Added {new Date(contact.CreatedOn).toLocaleDateString()}
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