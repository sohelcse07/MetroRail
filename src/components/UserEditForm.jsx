import PropTypes from 'prop-types';

const UserEditForm = ({
  extractedData,
  handleFieldChange,
  handleDataUpdate,
  error,
  setShowUpdateModal
}) => {

  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium text-gray-800">Edit Your Information</h3>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Full Name *</label>
          <input
            type="text"
            value={extractedData.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Date of Birth (YYYY-MM-DD)</label>
          <input
            type="text"
            value={extractedData.date_of_birth}
            onChange={(e) => handleFieldChange("date_of_birth", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="YYYY-MM-DD"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">NID Number *</label>
          <input
            type="text"
            value={extractedData.nid_no}
            onChange={(e) => handleFieldChange("nid_no", e.target.value.replace(/\D/g, ""))}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Blood Group</label>
          <input
            type="text"
            value={extractedData.blood_group}
            onChange={(e) => handleFieldChange("blood_group", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="A+, B-, O+, etc."
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
          <textarea
            value={extractedData.address}
            onChange={(e) => handleFieldChange("address", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            rows="2"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Gender</label>
          <input
            type="text"
            value={extractedData.gender}
            onChange={(e) => handleFieldChange("gender", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="pt-2 flex justify-end gap-2">
        <button
          onClick={() => setShowUpdateModal(false)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => handleDataUpdate(extractedData)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
UserEditForm.propTypes = {
  user: PropTypes.shape({
    nid_no: PropTypes.string
  }),
  extractedData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    date_of_birth: PropTypes.string,
    nid_no: PropTypes.string,
    blood_group: PropTypes.string,
    address: PropTypes.string,
    gender: PropTypes.string
  }).isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleDataUpdate: PropTypes.func.isRequired,
  error: PropTypes.string,
  setShowUpdateModal: PropTypes.func.isRequired
};

export default UserEditForm;
