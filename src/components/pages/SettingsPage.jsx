import ApperIcon from "@/components/ApperIcon";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

const SettingsPage = () => {
  const settingsSections = [
    {
      title: "Profile Settings",
      description: "Update your personal information and preferences",
      icon: "User",
      items: [
        "Personal Information",
        "Email Preferences",
        "Notification Settings",
        "Privacy Controls"
      ]
    },
    {
      title: "CRM Settings",
      description: "Configure your CRM system preferences",
      icon: "Settings",
      items: [
        "Contact Fields",
        "Import/Export Settings",
        "Data Backup",
        "Integration Settings"
      ]
    },
    {
      title: "Team Management",
      description: "Manage team members and permissions",
      icon: "Users",
      items: [
        "Team Members",
        "Role Permissions",
        "Access Controls",
        "Activity Logs"
      ]
    },
    {
      title: "Billing & Plans",
      description: "Manage your subscription and billing information",
      icon: "CreditCard",
      items: [
        "Current Plan",
        "Billing History",
        "Payment Methods",
        "Usage Statistics"
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingsSections.map((section, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name={section.icon} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {section.description}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{item}</span>
                    <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                Configure {section.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ApperIcon name="Zap" className="w-5 h-5 text-primary-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
              <ApperIcon name="Download" className="w-6 h-6 mb-2 text-primary-500" />
              <span className="text-sm">Export Data</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
              <ApperIcon name="Upload" className="w-6 h-6 mb-2 text-primary-500" />
              <span className="text-sm">Import Data</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
              <ApperIcon name="Shield" className="w-6 h-6 mb-2 text-primary-500" />
              <span className="text-sm">Security</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
              <ApperIcon name="HelpCircle" className="w-6 h-6 mb-2 text-primary-500" />
              <span className="text-sm">Get Help</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;