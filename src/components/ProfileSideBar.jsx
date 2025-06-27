import { User, Phone, Calendar, FileText, Droplet } from "lucide-react";
import MaleAvatar from "../assets/maleavatar.jpg";
import FemaleAvatar from "../assets/FemaleAvatar.jpg";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const { user, isLoading } = useUser();

  const profileFields = [
    { 
      label: "NID", 
      value: user?.nid_no, 
      icon: <FileText className="w-5 h-5 text-amber-500" />,
      color: "amber"
    },
    { 
      label: "Telegram", 
      value: user?.phone_number, 
      icon: <Phone className="w-5 h-5 text-emerald-500" />,
      color: "emerald"
    },
    { 
      label: "Date of Birth", 
      value: user?.date_of_birth, 
      icon: <Calendar className="w-5 h-5 text-violet-500" />,
      color: "violet"
    },
    { 
      label: "Gender", 
      value: user?.gender, 
      icon: <User className="w-5 h-5 text-pink-500" />,
      color: "pink"
    },
    { 
      label: "Blood Group", 
      value: user?.blood_group, 
      icon: <Droplet className="w-5 h-5 text-rose-500" />,
      color: "rose"
    }
  ];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Skeleton Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse mb-4" />
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Skeleton Profile Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-white p-5 rounded-xl border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-gray-200 rounded-lg animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-3" />
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!user) return <div className="text-center py-10">No user data available</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <img
            src={user.gender?.toLowerCase() === 'female' ? FemaleAvatar : MaleAvatar} 
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-indigo-100 shadow-lg object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-indigo-200 transition-all duration-300" />
        </div>
        <h1 className="mt-4 text-xl md:text-3xl font-bold text-gray-800">
          {user.name || "N/A"}
        </h1>
        <p className="text-indigo-600 mt-1">User Profile</p>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profileFields.map((field, index) => (
          <ProfileField 
            key={index}
            label={field.label}
            value={field.value}
            icon={field.icon}
            color={field.color}
          />
        ))}
      </div>
    </div>
  );
};

const ProfileField = ({ label, value, icon, color }) => (
  <div className={`bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow`}>
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-lg bg-${color}-50`}>
        {icon}
      </div>
      <div>
        <h3 className={`text-sm font-medium text-${color}-600`}>{label}</h3>
        <p className="text-lg font-semibold text-gray-800 mt-1">
          {value || (
            <span className="text-gray-400">N/A</span>
          )}
        </p>
      </div>
    </div>
  </div>
);

export default Profile;