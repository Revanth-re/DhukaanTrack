import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", mobileNum: "" });
  const Navigate=useNavigate()

  useEffect(() => {
    const dataFromLs = JSON.parse(localStorage.getItem("userToken"));
    if (dataFromLs) {
      setUser(dataFromLs);
      setFormData({
        name: dataFromLs.name || "",
        mobileNum: dataFromLs.mobileNum || ""
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    setUser(formData);
    localStorage.setItem("userToken", JSON.stringify(formData));
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 mt-10">
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />
          {!editMode ? (
            <>
              <h2 className="text-xl font-bold mt-4">{user.name}</h2>
              <p className="text-gray-600">{user.mobileNum}</p>
              <button
                className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <div className="mt-4 w-full">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2"
                placeholder="Enter name"
              />
              <input
                type="text"
                name="mobileNum"
                value={formData.mobileNum}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2"
                placeholder="Enter mobile number"
              />
              <div className="flex gap-2">
                <button
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subscription Section */}
      <div className="bg-indigo-50 shadow-md rounded-xl w-full max-w-md p-6 mt-6 text-center">
        <h3 className="text-lg font-semibold">Track Endless Items</h3>
        <p className="text-gray-600 mt-2">
          Upgrade to premium to track unlimited items, manage expiry dates, and access all features of DukaanTrack.
        </p>
        <button onClick={()=>Navigate("/payment")} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Take Subscription
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
