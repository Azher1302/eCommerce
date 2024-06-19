import React from 'react';
import Uploader from '../../components/Uploder';
import SideBar from './SideBar';
import Input from './../../components/Input';

function UpdateProfile() {
  return (
    <SideBar>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Profile</h2>
        <Uploader />
        <div className="grid sm:grid-cols-2 gap-4">
          <Input type="text" placeHolder="EcommerSio" label="First Name" />
          <Input type="text" placeHolder="User" label="Last Name" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input type="email" placeHolder="user@gmail.com" label="Email" />
          <Input type="number" placeHolder="0754661424" label="Phone Number" />
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button className="bg-flash font-medium text-white py-3 px-6 rounded sm:w-auto w-full">
            Delete Account
          </button>
          <button className="bg-main font-medium text-white py-3 px-6 rounded sm:w-auto w-full">
            Update Profile
          </button>
        </div>
      </div>
    </SideBar>
  );
}

export default UpdateProfile;
