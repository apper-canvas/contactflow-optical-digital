import ApperIcon from "@/components/ApperIcon";
import { Card, CardContent } from "@/components/atoms/Card";

const ReportsPage = () => {
  return (
    <div className="p-6">
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="BarChart3" className="w-12 h-12 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Reports & Analytics
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Get insights into your contact data and sales performance with 
          comprehensive reports and analytics.
        </p>
        <Card className="max-w-lg mx-auto">
          <CardContent className="p-8">
            <div className="text-left space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Available Reports:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <ApperIcon name="Users" className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Contact Growth</p>
                    <p className="text-xs text-gray-600">Track how your contact database is growing</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ApperIcon name="Building" className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Company Analysis</p>
                    <p className="text-xs text-gray-600">Analyze contacts by company and industry</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ApperIcon name="MapPin" className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Geographic Distribution</p>
                    <p className="text-xs text-gray-600">See where your contacts are located</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ApperIcon name="TrendingUp" className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Engagement Metrics</p>
                    <p className="text-xs text-gray-600">Track contact engagement and activity</p>
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

export default ReportsPage;