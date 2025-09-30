import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ onCreateContact }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="Users" className="w-12 h-12 text-primary-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        No contacts yet
      </h3>
      <p className="text-gray-600 mb-8 max-w-md">
        Start building your contact network by adding your first contact. 
        You can store their contact details, company information, and notes.
      </p>
      <Button onClick={onCreateContact} className="inline-flex items-center gap-2">
        <ApperIcon name="Plus" size={16} />
        Add Your First Contact
      </Button>
    </div>
  );
};

export default Empty;