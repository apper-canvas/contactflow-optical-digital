import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <ApperIcon name="AlertCircle" className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-gray-600 mb-6">Page not found</p>
        <Link to="/" className="inline-block px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;