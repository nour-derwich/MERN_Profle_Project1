import { useEffect, useState } from "react";
import {
  FiAlertCircle,
  FiBell,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiGlobe,
  FiLink,
  FiLock,
  FiSave,
  FiShield,
  FiUser,
} from "react-icons/fi";
import Sidebar from "../../components/admin/Sidebar";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";

const AdminSettings = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Profile Form
  const [profileForm, setProfileForm] = useState({
    full_name: "",
    email: "",
    username: "",
    bio: "",
    phone: "",
    location: "",
  });

  // Password Form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    email_notifications: true,
    new_registration: true,
    new_message: true,
    weekly_report: true,
    system_updates: false,
  });

  // Site Settings
  const [siteSettings, setSiteSettings] = useState({
    site_name: "My Portfolio",
    site_description: "Professional Portfolio & Training Platform",
    contact_email: "contact@example.com",
    phone: "+216 XX XXX XXX",
    address: "Tunis, Tunisia",
    facebook: "",
    twitter: "",
    linkedin: "",
    github: "",
    maintenance_mode: false,
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        full_name: user.full_name || "",
        email: user.email || "",
        username: user.username || "",
        bio: user.bio || "",
        phone: user.phone || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.updateProfile(profileForm);
      updateUser({ ...user, ...profileForm });
      showMessage("success", "Profile updated successfully!");
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showMessage("error", "New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      showMessage("error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await authService.updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      showMessage("success", "Password updated successfully!");
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setLoading(true);
    try {
      // API call to update notification settings
      // await settingsService.updateNotifications(notificationSettings);
      showMessage("success", "Notification settings updated!");
    } catch (error) {
      showMessage("error", "Failed to update notification settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSiteSettingsUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to update site settings
      // await settingsService.updateSiteSettings(siteSettings);
      showMessage("success", "Site settings updated successfully!");
    } catch (error) {
      showMessage("error", "Failed to update site settings");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: FiUser },
    { id: "security", label: "Security", icon: FiLock },
    { id: "notifications", label: "Notifications", icon: FiBell },
    { id: "site", label: "Site Settings", icon: FiGlobe },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r  from-blue-900 via-blue-800 to-blue-700  bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-gray-600">
            Manage your account and application settings
          </p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${
              message.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <FiCheck className="text-green-600 text-xl" />
            ) : (
              <FiAlertCircle className="text-red-600 text-xl" />
            )}
            <span
              className={
                message.type === "success" ? "text-green-800" : "text-red-800"
              }
            >
              {message.text}
            </span>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? " from-blue-900 via-blue-800 to-blue-700  border-b-2 border-purple-600 bg-purple-50/50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile Settings */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FiUser className="text-2xl  from-blue-900 via-blue-800 to-blue-700 " />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Profile Information
                </h2>
                <p className="text-gray-600 text-sm">
                  Update your personal details
                </p>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={profileForm.full_name}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        full_name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    value={profileForm.username}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        username: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        location: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="City, Country"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, bio: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50"
                >
                  <FiSave />
                  <span>{loading ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-red-100 rounded-xl">
                <FiLock className="text-2xl text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Security Settings
                </h2>
                <p className="text-gray-600 text-sm">
                  Manage your password and security
                </p>
              </div>
            </div>

            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password *
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password *
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 6 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50"
                >
                  <FiShield />
                  <span>{loading ? "Updating..." : "Update Password"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiBell className="text-2xl text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Notification Preferences
                </h2>
                <p className="text-gray-600 text-sm">
                  Choose what notifications you receive
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  key: "email_notifications",
                  label: "Email Notifications",
                  description: "Receive notifications via email",
                },
                {
                  key: "new_registration",
                  label: "New Registrations",
                  description:
                    "Get notified when someone registers for a formation",
                },
                {
                  key: "new_message",
                  label: "New Messages",
                  description:
                    "Get notified when you receive a new contact message",
                },
                {
                  key: "weekly_report",
                  label: "Weekly Reports",
                  description: "Receive weekly analytics reports",
                },
                {
                  key: "system_updates",
                  label: "System Updates",
                  description:
                    "Get notified about system updates and maintenance",
                },
              ].map((setting) => (
                <div
                  key={setting.key}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {setting.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {setting.description}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings[setting.key]}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          [setting.key]: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleNotificationUpdate}
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50"
              >
                <FiSave />
                <span>{loading ? "Saving..." : "Save Preferences"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Site Settings */}
        {activeTab === "site" && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-green-100 rounded-xl">
                <FiGlobe className="text-2xl text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Site Settings
                </h2>
                <p className="text-gray-600 text-sm">
                  Configure your website settings
                </p>
              </div>
            </div>

            <form onSubmit={handleSiteSettingsUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Site Name *
                  </label>
                  <input
                    type="text"
                    value={siteSettings.site_name}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        site_name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Site Description *
                  </label>
                  <textarea
                    value={siteSettings.site_description}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        site_description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    value={siteSettings.contact_email}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        contact_email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={siteSettings.phone}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={siteSettings.address}
                    onChange={(e) =>
                      setSiteSettings({
                        ...siteSettings,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <FiLink />
                  <span>Social Media Links</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      key: "facebook",
                      label: "Facebook",
                      placeholder: "https://facebook.com/yourpage",
                    },
                    {
                      key: "twitter",
                      label: "Twitter",
                      placeholder: "https://twitter.com/yourhandle",
                    },
                    {
                      key: "linkedin",
                      label: "LinkedIn",
                      placeholder: "https://linkedin.com/in/yourprofile",
                    },
                    {
                      key: "github",
                      label: "GitHub",
                      placeholder: "https://github.com/yourusername",
                    },
                  ].map((social) => (
                    <div key={social.key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {social.label}
                      </label>
                      <input
                        type="url"
                        value={siteSettings[social.key]}
                        onChange={(e) =>
                          setSiteSettings({
                            ...siteSettings,
                            [social.key]: e.target.value,
                          })
                        }
                        placeholder={social.placeholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Maintenance Mode
                    </h3>
                    <p className="text-sm text-gray-600">
                      Temporarily disable public access to your site
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={siteSettings.maintenance_mode}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          maintenance_mode: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50"
                >
                  <FiSave />
                  <span>{loading ? "Saving..." : "Save Settings"}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
