


import React, { useState } from "react";
import { assets } from "../assets/assets";

const Myprofile = () => {
  const [userData, setUserData] = useState({
    name: "Aanchal Mahato",
    image: assets.profile_pic,
    email: "aanchal@gmail.com",
    phone: "+91 23456-17855",
    address: {
      line1: "46, Champasari",
      line2: "Block C",
    },
    gender: "Female",
    DOB: "2002-04-18",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-3xl shadow-2xl transform hover:scale-105 transition duration-300 text-grey-500">
      <div className="flex flex-col items-center">
        <img

          src={userData.image}
          alt="Profile"
        />
        {isEdit ? (
          <input
            className="w-full px-4 py-2 border border-light-grey rounded-md focus:outline-none focus:border-primary text-center font-bold text-grey-100"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="text-2xl font-bold text-purple2">{userData.name}</p>
        )}
      </div>

      <hr className="my-6 border-light-grey" />

      <div>
        <p className="text-lg font-medium text-primary mb-4">Contact Information</p>
        <div className="space-y-3">
          <div>
            <p className="font-medium">Email:</p>
            <p>{userData.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="w-full px-4 py-2 border border-light-grey rounded-md focus:outline-none focus:border-primary"
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>
          <div>
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <>
                <input
                  className="w-full px-4 py-2 border border-light-grey rounded-md focus:outline-none focus:border-primary mb-2"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                  type="text"
                />
                <input
                  className="w-full px-4 py-2 border border-light-grey rounded-md focus:outline-none focus:border-primary"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                  type="text"
                />
              </>
            ) : (
              <p>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-lg font-medium text-primary mb-4">Basic Information</p>
        <div className="space-y-3">
          <div>
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="w-full px-4 py-2 border border-light-grey rounded-md focus:outline-none focus:border-primary"
                value={userData.gender}
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>
          <div>
            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="w-full px-4 py-2 border border-light-grey rounded-md focus:outline-none focus:border-primary"
                type="date"
                value={userData.DOB}
                onChange={(e) => setUserData((prev) => ({ ...prev, DOB: e.target.value }))}
              />
            ) : (
              <p>{userData.DOB}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          className="w-full px-4 py-2 bg-purple2 text-white rounded-md shadow-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-purple2 transform hover:translate-y-1 transition-all"
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? "Save Information" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default Myprofile;
