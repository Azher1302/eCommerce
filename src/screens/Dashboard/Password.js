import React from 'react';
import Input from '../../components/Input';
import SideBar from './SideBar';

function Password() {
  return (
    <SideBar>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Change Password</h2>
        <Input type="text" placeHolder="*******" label="Previous Password" />
        <Input type="text" placeHolder="********" label="New Password" />
        <Input type="text" placeHolder="********" label="Confirm Password" />
        <div className="flex justify-end items-center my-4">
          <button className="bg-main sm:w-auto w-full font-medium text-white py-3 px-6 rounded">
            Change Password
          </button>
        </div>
      </div>
    </SideBar>
  );
}

export default Password;
