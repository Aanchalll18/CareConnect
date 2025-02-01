
import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
// import { toast } from 'react-toastify';
import toast from "react-hot-toast";
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null); // State to store image data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [specialty, setSpecialty] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocImg(file);
    }
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    try {
      console.log('Submitting form...');

      // Create FormData
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', fees ? Number(fees) : 0); 
      formData.append('about', about);
      formData.append('speciality', specialty);
      formData.append('degree', degree);
      formData.append(
        'address',
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // Log FormData
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: { aToken },
        }
      );
      

      // Handle API Response
      if (data.success) {
        toast.success(data.message);
        setDocImg(false)
        setName('')
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.error('Error occurred:', e.response || e.message || e);
      toast.error(
        e.response?.data?.message || 'An error occurred while submitting.'
      );
    }
  };

  return (
    <form
      onSubmit={onsubmitHandler}
      className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add Doctor</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Upload Section */}
        <div className="flex flex-col items-center">
          <label
            htmlFor="doc-img"
            className="cursor-pointer w-32 h-32 flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg"
          >
            {docImg ? (
              <img
                src={URL.createObjectURL(docImg)}
                alt="Uploaded Doctor"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={assets.upload_area}
                alt="Upload Doctor"
                className="w-full h-full object-cover"
              />
            )}
          </label>
          <input
            type="file"
            id="doc-img"
            className="hidden"
            onChange={handleImagePreview}
          />
          <p className="text-sm text-gray-500 mt-2">Upload doctor picture</p>
        </div>

        <div>
          <div className="space-y-6">
            <div>
              <p className="font-medium text-gray-700">Doctor Name</p>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <p className="font-medium text-gray-700">Doctor Email</p>
              <input
              autoComplete='current-email'
                type="email"
                placeholder="Email"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <p className="font-medium text-gray-700">Password</p>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='current-password'
              />
            </div>

            <div>
              <p className="font-medium text-gray-700">Experience</p>
              <select
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i + 1} year`}>
                    {i + 1} year
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="font-medium text-gray-700">Fee</p>
              <input
                type="number"
                placeholder="Fee"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-6">
            <div>
              <p className="font-medium text-gray-700">Specialty</p>
              <select
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p className="font-medium text-gray-700">Education</p>
              <input
                type="text"
                placeholder="Education"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>

            <div>
              <p className="font-medium text-gray-700">Address 1</p>
              <input
                type="text"
                placeholder="Address"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </div>

            <div>
              <p className="font-medium text-gray-700">Address 2</p>
              <input
                type="text"
                placeholder="Address"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="font-medium text-gray-700">About Doctor</p>
        <textarea
          placeholder="Write about the doctor"
          rows={5}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full p-4 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDoctor;

