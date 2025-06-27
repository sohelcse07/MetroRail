import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { GoogleGenAI } from "@google/genai";

const SettingsPage = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);
  const [nidFrontPreview, setNidFrontPreview] = useState("");
  const [nidBackPreview, setNidBackPreview] = useState("");
  const [extractedData, setExtractedData] = useState({
    name: "",
    date_of_birth: "",
    nid_no: "",
    blood_group: "",
    address: "",
    gender:""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [error, setError] = useState(null);

  const { updateUser } = useUser();
  
  const genAI = new GoogleGenAI({
    apiKey: "AIzaSyDmQzNQ5Nlc6rUCbZe5_slUZRJq8X5HcBI",
  });

  const handleImageUpload = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    
    // Try to parse various date formats
    const formats = [
      { regex: /(\d{1,2})\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s*(\d{4})/i, 
        handler: (match) => `${match[3]}-${String(match[2]).padStart(2, '0')}-${String(match[1]).padStart(2, '0')}` },
      { regex: /(\d{1,2})\/(\d{1,2})\/(\d{4})/, 
        handler: (match) => `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}` },
      { regex: /(\d{4})-(\d{1,2})-(\d{1,2})/, 
        handler: (match) => `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}` }
    ];

    for (const format of formats) {
      const match = dateStr.match(format.regex);
      if (match) return format.handler(match);
    }

    return dateStr; // Return original if no format matched
  };

  const extractTextFromImage = async (imageFile, isFrontSide) => {
    setIsProcessing(true);
    setError(null);
    try {
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(imageFile);
      });

      const prompt = isFrontSide ? `
        Extract from Bangladeshi NID FRONT:
        1. Name (English)
        2. Date of Birth (convert to YYYY-MM-DD)
        3. NID Number (digits only)
        4.gender (based on the image )
        
        Return JSON:
        {
          "name": "",
          "dateOfBirth": "",
          "nidNumber": ""
        }
        Only return the JSON object.
      ` : `
        Extract from Bangladeshi NID BACK:
        1. Blood Group (A+, B-, etc.)
        2. Full Address
        
        Return JSON:
        {
          "bloodGroup": "",
          "address": ""
        }
        Only return the JSON object.
      `;

      const response = await genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: {
          role: "user",
          parts: [
            { inlineData: { mimeType: imageFile.type, data: base64Data } },
            { text: prompt }
          ],
        },
      });

      let result = typeof response.text === 'string' ? 
        JSON.parse(response.text.match(/\{[\s\S]*\}/)?.[0] || response.text) : 
        response.text;

      if (isFrontSide && result.dateOfBirth) {
        result.dateOfBirth = formatDate(result.dateOfBirth);
      }

      return result;
    } catch (error) {
      console.error("OCR Error:", error);
      setError("Failed to extract data. Please ensure clear images.");
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateSubmit = async () => {
    if (!nidFront || !nidBack) {
      setError("Please upload both NID images");
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);
    setError(null);

    try {
      const frontData = await extractTextFromImage(nidFront, true);
      setProcessingProgress(50);
      const backData = await extractTextFromImage(nidBack, false);
      setProcessingProgress(100);

      setExtractedData(prev => ({
        ...prev,
        name: frontData.name || prev.name,
        date_of_birth: frontData.dateOfBirth || prev.date_of_birth,
        nid_no: frontData.nidNumber?.replace(/\D/g, "") || prev.nid_no,
        blood_group: backData.bloodGroup || prev.blood_group,
        address: backData.address || prev.address,
        gender:frontData.gender|| prev.gender,
      }));

      if (!frontData.nidNumber || !frontData.name) {
        throw new Error("Couldn't extract required NID information");
      }
    } catch (error) {
      setError(error.message || "Processing failed. Check image quality.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDataUpdate = () => {
    if (!extractedData.nid_no || !extractedData.name) {
      setError("Name and NID Number are required");
      return;
    }

    updateUser(extractedData);
    setShowUpdateModal(false);
    resetForm();
  };

  const resetForm = () => {
    setNidFront(null);
    setNidBack(null);
    setNidFrontPreview("");
    setNidBackPreview("");
    setError(null);
  };

  const handleFieldChange = (field, value) => {
    setExtractedData(prev => ({ ...prev, [field]: value }));
  };

  const handleDelete = () => {
    console.log("User deleted");
    setShowDeleteModal(false);
  };
  

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-blue-50 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-800">Profile Information</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">Update your personal details using your NID card</p>
          <button
            onClick={() => setShowUpdateModal(true)}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Update Profile
          </button>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-red-50 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-800">Delete Account</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">Permanently remove your account and all data</p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Update Profile</h2>
            </div>

            <div className="p-5 overflow-y-auto max-h-[80vh]">
              {!extractedData.name ? (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">NID Front Side *</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setNidFront, setNidFrontPreview)}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        disabled={isProcessing}
                      />
                      {nidFrontPreview && (
                        <div className="mt-2">
                          <img
                            src={nidFrontPreview}
                            alt="NID Front Preview"
                            className="max-w-full h-40 object-contain border border-gray-200 rounded"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">NID Back Side *</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setNidBack, setNidBackPreview)}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        disabled={isProcessing}
                      />
                      {nidBackPreview && (
                        <div className="mt-2">
                          <img
                            src={nidBackPreview}
                            alt="NID Back Preview"
                            className="max-w-full h-40 object-contain border border-gray-200 rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                      {error}
                    </div>
                  )}

                  {isProcessing && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${processingProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        Processing images... {processingProgress}%
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setShowUpdateModal(false);
                        resetForm();
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      disabled={isProcessing}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateSubmit}
                      disabled={!nidFront || !nidBack || isProcessing}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing
                        </>
                      ) : 'Extract Data'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-800">Verify Your Information</h3>

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
                      <textarea
                        value={extractedData.gender}
                        onChange={(e) => handleFieldChange("gender", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        rows="2"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setExtractedData({
                        name: "",
                        date_of_birth: "",
                        nid_no: "",
                        blood_group: "",
                        address: "",
                        gender:""
                      })}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleDataUpdate}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Delete Account</h2>
            </div>

            <div className="p-5">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-3">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Confirm Account Deletion</h3>
                <p className="text-sm text-gray-500">
                  This will permanently delete your account and all data. This action cannot be undone.
                </p>
              </div>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;