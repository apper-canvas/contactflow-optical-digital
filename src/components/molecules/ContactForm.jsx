import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import ApperIcon from "@/components/ApperIcon";

const ContactForm = ({ contact, onSubmit, onCancel, isLoading }) => {
const [formData, setFormData] = useState({
    first_name_c: "",
    last_name_c: "",
    email_c: "",
    phone_c: "",
    company_c: "",
    job_title_c: "",
    address_c: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    social_media_c: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
    notes_c: "",
    tags_c: "",
  });

  const [errors, setErrors] = useState({});

useEffect(() => {
    if (contact) {
      setFormData({
        first_name_c: contact.first_name_c || "",
        last_name_c: contact.last_name_c || "",
        email_c: contact.email_c || "",
        phone_c: contact.phone_c || "",
        company_c: contact.company_c || "",
        job_title_c: contact.job_title_c || "",
        address_c: contact.address_c || {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
        social_media_c: contact.social_media_c || {
          linkedin: "",
          twitter: "",
          facebook: "",
          instagram: "",
        },
        notes_c: contact.notes_c || "",
        tags_c: contact.tags_c || "",
      });
    }
  }, [contact]);

const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name_c.trim()) {
      newErrors.first_name_c = "First name is required";
    }
    if (!formData.last_name_c.trim()) {
      newErrors.last_name_c = "Last name is required";
    }
    if (!formData.email_c.trim()) {
      newErrors.email_c = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_c)) {
      newErrors.email_c = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const updateNestedData = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ApperIcon name="User" className="w-5 h-5 text-primary-500" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              type="text"
value={formData.first_name_c}
              onChange={(e) => updateFormData("first_name_c", e.target.value)}
              placeholder="Enter first name"
              className={errors.first_name_c ? "border-red-300" : ""}
            />
            {errors.first_name_c && (
<p className="text-sm text-red-500 mt-1">{errors.first_name_c}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
<Input
              id="lastName"
              type="text"
              value={formData.last_name_c}
              onChange={(e) => updateFormData("last_name_c", e.target.value)}
              placeholder="Enter last name"
className={errors.last_name_c ? "border-red-300" : ""}
            />
            {errors.last_name_c && (
              <p className="text-sm text-red-500 mt-1">{errors.last_name_c}</p>
            )}
</div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email_c}
              onChange={(e) => updateFormData("email_c", e.target.value)}
              placeholder="Enter email address"
              className={errors.email_c ? "border-red-300" : ""}
            />
            {errors.email_c && (
              <p className="text-sm text-red-500 mt-1">{errors.email_c}</p>
            )}
          </div>
          <div>
<Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone_c}
              onChange={(e) => updateFormData("phone_c", e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ApperIcon name="Building" className="w-5 h-5 text-primary-500" />
          Company Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company">Company</Label>
<Input
              id="company"
              type="text"
              value={formData.company_c}
              onChange={(e) => updateFormData("company_c", e.target.value)}
              placeholder="Enter company name"
            />
          </div>
          <div>
            <Label htmlFor="jobTitle">Job Title</Label>
<Input
              id="jobTitle"
              type="text"
              value={formData.job_title_c}
              onChange={(e) => updateFormData("job_title_c", e.target.value)}
              placeholder="Enter job title"
            />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ApperIcon name="MapPin" className="w-5 h-5 text-primary-500" />
          Address Information
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="street">Street Address</Label>
<Input
              id="street"
              type="text"
              value={formData.address_c.street}
              onChange={(e) => updateNestedData("address_c", "street", e.target.value)}
              placeholder="Enter street address"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
value={formData.address_c.city}
                onChange={(e) => updateNestedData("address_c", "city", e.target.value)}
                placeholder="Enter city"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
type="text"
                value={formData.address_c.state}
                onChange={(e) => updateNestedData("address_c", "state", e.target.value)}
                placeholder="Enter state"
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
id="zipCode"
                type="text"
                value={formData.address_c.zipCode}
                onChange={(e) => updateNestedData("address_c", "zipCode", e.target.value)}
                placeholder="Enter ZIP code"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
value={formData.address_c.country}
              onChange={(e) => updateNestedData("address_c", "country", e.target.value)}
              placeholder="Enter country"
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ApperIcon name="Share2" className="w-5 h-5 text-primary-500" />
          Social Media
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              type="url"
value={formData.social_media_c.linkedin}
              onChange={(e) => updateNestedData("social_media_c", "linkedin", e.target.value)}
              placeholder="Enter LinkedIn profile URL"
            />
          </div>
          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
type="url"
              value={formData.social_media_c.twitter}
              onChange={(e) => updateNestedData("social_media_c", "twitter", e.target.value)}
              placeholder="Enter Twitter profile URL"
            />
          </div>
          <div>
            <Label htmlFor="facebook">Facebook</Label>
            <Input
id="facebook"
              type="url"
              value={formData.social_media_c.facebook}
              onChange={(e) => updateNestedData("social_media_c", "facebook", e.target.value)}
              placeholder="Enter Facebook profile URL"
            />
          </div>
          <div>
            <Label htmlFor="instagram">Instagram</Label>
<Input
              id="instagram"
              type="url"
              value={formData.social_media_c.instagram}
              onChange={(e) => updateNestedData("social_media_c", "instagram", e.target.value)}
              placeholder="Enter Instagram profile URL"
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ApperIcon name="FileText" className="w-5 h-5 text-primary-500" />
          Additional Notes
        </h3>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <textarea
            id="notes"
rows={4}
            value={formData.notes_c}
            onChange={(e) => updateFormData("notes_c", e.target.value)}
            placeholder="Enter any additional notes or comments..."
            className="flex w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <ApperIcon name="Loader2" size={16} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <ApperIcon name="Save" size={16} />
              {contact ? "Update Contact" : "Create Contact"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;