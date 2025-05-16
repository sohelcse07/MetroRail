import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { createWorker } from "tesseract.js";
import Tesseract from "tesseract.js";

const SettingsPage = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);
  const [nidFrontPreview, setNidFrontPreview] = useState("");
  const [nidBackPreview, setNidBackPreview] = useState("");
  const [extractedData, setExtractedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const { updateUser } = useUser();

  const handleImageUpload = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const extractTextFromImage = async (imageFile) => {
    try {
      const data = JSON.stringify({
        objectUrl: imageFile,
      });

      const response = await fetch(
        "https://text-in-images-recognition.p.rapidapi.com/prod",
        {
          method: "POST",
          headers: {
            "x-rapidapi-key":
              "48f6afcf2fmsh88a4ed6d97cf3dfp142998jsnadeb26f24d0e",
            "x-rapidapi-host": "text-in-images-recognition.p.rapidapi.com",
            "Content-Type": "application/json",
          },
          body: data,
        }
      );
      const result = await response.json();
      const ExtracteText = result.text;
      console.log(extractedData,"fmfmmf")
      return ExtracteText;
    } catch (err) {
      console.error("OCR Error:", err);
      throw err;
    }
  };
  const parseNIDData = (text) => {
    // Parse front side data
    const nameMatch =
      text.match(/Name: ([A-Za-z ]+)/i) || text.match(/নাম: ([^\n]+)/);
    const fatherMatch = text.match(/পিতা:\s*([^\n]+)/);
    const motherMatch = text.match(/মাতা:\s*([^\n]+)/);
    const dobMatch = text.match(/Date of Birth : (\d{2} [A-Za-z]+ \d{4})/);
    const nidMatch =
      text.match(/ID NO: (\d+)/) || text.match(/NID No[\s:]*(\d+)/);

    // Parse back side data
    const addressMatch = text.match(/ঠিকানা: ([^\n]+)/);
    const bloodGroupMatch =
      text.match(/Blood Group : ([ABO][+-])/i) ||
      text.match(/রক্তের গ্রুপ\s*:\s*([ABO][+-])/i);

    return {
      name: nameMatch ? nameMatch[1].trim() : "",
      fatherName: fatherMatch ? fatherMatch[1].trim() : "",
      motherName: motherMatch ? motherMatch[1].trim() : "",
      dateOfBirth: dobMatch ? dobMatch[1].trim() : "",
      nidNumber: nidMatch ? nidMatch[1].trim() : "",
      address: addressMatch ? addressMatch[1].trim() : "",
      bloodGroup: bloodGroupMatch ? bloodGroupMatch[1].trim() : "",
    };
  };

  const handleUpdateSubmit = async () => {
    if (!nidFront || !nidBack) return;

    setIsProcessing(true);
    setProcessingProgress(0);

    try {
      // Process front image
      const frontText = await extractTextFromImage(nidFront);
      // Process back image
      const backText = await extractTextFromImage(nidBack);

      // Combine results
      const combinedText = frontText + "\n" + backText;
      const parsedData = parseNIDData(combinedText);

      console.log("Extracted NID Data:", parsedData);
      setExtractedData(parsedData);
    } catch (error) {
      console.error("OCR Error:", error);
      alert("Error processing NID images. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDataUpdate = () => {
    if (!extractedData) return;

    // Update user data in context/backend
    updateUser(extractedData);
    setShowUpdateModal(false);
    setExtractedData(null);
    setNidFront(null);
    setNidBack(null);
    setNidFrontPreview("");
    setNidBackPreview("");
  };

  const handleFieldChange = (field, value) => {
    setExtractedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDelete = () => {
    // TODO: Delete user from DB
    console.log("User deleted.");
    setShowDeleteModal(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-warning mb-4">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Update Profile Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-2">Update Profile</h2>
          <p className="text-sm text-gray-600 mb-4">
            Upload your NID to update your profile.
          </p>
          <button
            className="bg-warning text-white px-4 py-2 rounded-md hover:bg-warning/90"
            onClick={() => setShowUpdateModal(true)}
          >
            Update Profile
          </button>
        </div>

        {/* Delete Profile Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-2 text-red-600">
            Delete Profile
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Once deleted, you cannot recover your data.
          </p>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Profile
          </button>
        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-warning">
              Upload NID to Update Profile
            </h2>

            {!extractedData ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* NID Front Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NID Front
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e, setNidFront, setNidFrontPreview)
                      }
                      className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                    />
                    {nidFrontPreview && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-1">
                          Front Preview:
                        </p>
                        <img
                          src={nidFrontPreview}
                          alt="NID Front Preview"
                          className="max-w-full h-auto border border-gray-200 rounded"
                        />
                      </div>
                    )}
                  </div>

                  {/* NID Back Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NID Back
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e, setNidBack, setNidBackPreview)
                      }
                      className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                    />
                    {nidBackPreview && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-1">
                          Back Preview:
                        </p>
                        <img
                          src={nidBackPreview}
                          alt="NID Back Preview"
                          className="max-w-full h-auto border border-gray-200 rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                    onClick={() => {
                      setShowUpdateModal(false);
                      setNidFront(null);
                      setNidBack(null);
                      setNidFrontPreview("");
                      setNidBackPreview("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-warning text-white px-4 py-2 rounded-md flex items-center"
                    onClick={handleUpdateSubmit}
                    disabled={!nidFront || !nidBack || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span>Processing ({processingProgress}%)</span>
                      </>
                    ) : (
                      "Extract Data"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Verify Extracted Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={extractedData.name}
                      onChange={(e) =>
                        handleFieldChange("name", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Father's Name
                    </label>
                    <input
                      type="text"
                      value={extractedData.fatherName}
                      onChange={(e) =>
                        handleFieldChange("fatherName", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mother's Name
                    </label>
                    <input
                      type="text"
                      value={extractedData.motherName}
                      onChange={(e) =>
                        handleFieldChange("motherName", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="text"
                      value={extractedData.dateOfBirth}
                      onChange={(e) =>
                        handleFieldChange("dateOfBirth", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NID Number
                    </label>
                    <input
                      type="text"
                      value={extractedData.nidNumber}
                      onChange={(e) =>
                        handleFieldChange("nidNumber", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Group
                    </label>
                    <input
                      type="text"
                      value={extractedData.bloodGroup}
                      onChange={(e) =>
                        handleFieldChange("bloodGroup", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    value={extractedData.address}
                    onChange={(e) =>
                      handleFieldChange("address", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="3"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                    onClick={() => setExtractedData(null)}
                  >
                    Back
                  </button>
                  <button
                    className="bg-warning text-white px-4 py-2 rounded-md"
                    onClick={handleDataUpdate}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
            <h2 className="text-lg font-semibold text-red-600 mb-4">
              Are you sure?
            </h2>
            <p className="mb-4">
              Do you really want to delete your profile? This action cannot be
              undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
