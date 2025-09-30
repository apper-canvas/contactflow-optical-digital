import ApperIcon from "@/components/ApperIcon";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";

const DashboardPage = () => {
  const stats = [
    {
      title: "Total Contacts",
      value: "1,247",
      change: "+12.5%",
      changeType: "positive",
      icon: "Users",
    },
    {
      title: "Active Leads",
      value: "86",
      change: "+8.2%",
      changeType: "positive",
      icon: "Target",
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      change: "-2.1%",
      changeType: "negative",
      icon: "TrendingUp",
    },
    {
      title: "Revenue",
      value: "$54,320",
      change: "+18.9%",
      changeType: "positive",
      icon: "DollarSign",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "contact_added",
      message: "New contact Sarah Johnson added",
      time: "2 hours ago",
      icon: "UserPlus",
    },
    {
      id: 2,
      type: "lead_converted",
      message: "Lead Mark Wilson converted to customer",
      time: "4 hours ago",
      icon: "CheckCircle",
    },
    {
      id: 3,
      type: "contact_updated",
      message: "Contact Emily Davis updated",
      time: "6 hours ago",
      icon: "Edit",
    },
    {
      id: 4,
      type: "meeting_scheduled",
      message: "Meeting scheduled with John Smith",
      time: "8 hours ago",
      icon: "Calendar",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-primary-100 text-lg">
          Here's what's happening with your contacts today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center">
                    <span
                      className={`text-sm font-medium ${
                        stat.changeType === "positive"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      from last month
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ApperIcon name="Activity" className="w-5 h-5 text-primary-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4 p-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ApperIcon
                      name={activity.icon}
                      className="w-4 h-4 text-gray-600"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ApperIcon name="TrendingUp" className="w-5 h-5 text-primary-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <ApperIcon name="UserPlus" className="w-5 h-5 text-primary-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Add New Contact
                  </p>
                  <p className="text-xs text-gray-600">
                    Add a new person to your network
                  </p>
                </div>
              </button>
              <button className="w-full flex items-center space-x-3 p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <ApperIcon name="Import" className="w-5 h-5 text-primary-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Import Contacts
                  </p>
                  <p className="text-xs text-gray-600">
                    Import from CSV or other sources
                  </p>
                </div>
              </button>
              <button className="w-full flex items-center space-x-3 p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <ApperIcon name="BarChart3" className="w-5 h-5 text-primary-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    View Reports
                  </p>
                  <p className="text-xs text-gray-600">
                    Analyze your contact data
                  </p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;