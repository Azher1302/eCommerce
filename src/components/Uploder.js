import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';

const Uploader = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    maxSize: 100000, //the size of image,
    onDrop: (acceptedFiles) => {
      alert('Sorry you cant preview image');
    },
  });

  return (
    <div className="w-full text-center">
      <div
        className="px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex justify-center">
          <FiUploadCloud className="text-3xl text-main" />
        </span>
        <p className="text-sm mt-2">Drag your image here</p>
        <em className="text-xs text-gray-400">
          (Only *.jpeg and *.png images will be accepted)
        </em>
      </div>
    </div>
  );
};

export default Uploader;
