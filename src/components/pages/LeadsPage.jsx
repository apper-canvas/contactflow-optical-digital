import ApperIcon from "@/components/ApperIcon";
import { Card, CardContent } from "@/components/atoms/Card";

const LeadsPage = () => {
  return (
    <div className="p-6">
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="Target" className="w-12 h-12 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Leads Management
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Track and manage your sales leads. This feature will help you convert 
          prospects into customers.
        </p>
        <Card className="max-w-lg mx-auto">
          <CardContent className="p-8">
            <div className="text-left space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Coming Soon Features:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <ApperIcon name="CheckCircle" className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Lead Tracking</p>
                    <p className="text-xs text-gray-600">Monitor lead progress through sales pipeline</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ApperIcon name="CheckCircle" className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Lead Scoring</p>
                    <p className="text-xs text-gray-600">Automatically score leads based on engagement</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ApperIcon name="CheckCircle" className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Conversion Analytics</p>
                    <p className="text-xs text-gray-600">Track conversion rates and performance metrics</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeadsPage;