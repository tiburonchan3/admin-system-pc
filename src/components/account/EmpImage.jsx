/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const EmpImage = ({ empInfo, empService }) => {
  const [user_file, setUser_file] = useState();
  const [user_image, setUser_image] = useState();
  useEffect(() => {
    setUser_image(empService.showImage(empInfo?.imagen));
    return;
  }, [empInfo]);

  const onDropImage = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setUser_image(URL.createObjectURL(file));
    setUser_file(file);
  }, []);
  const {
    getRootProps: getRootImgProps,
    getInputProps: getInputImgProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropImage,
  });
  const saveImage = ()=>{
      user_file && empInfo?.id  && empService.upload(user_file).then(res=>{
          toast.success("Se guardo la imagen")
      })
  }
  return (
    <>
    <div className="w-5/12" {...getRootImgProps()}>
      {empInfo && (
        <div className="rounded w-52 h-52">
          {user_image && (
            <img src={user_image} className="w-52 h-52 rounded shadow" alt="" />
          )}
          <input {...getInputImgProps()} type="file" className="hidden" />
        </div>
      )}
    </div>
    {user_file && (
        <button onClick={saveImage} className="bg-global py-1 px-4 rounded text-white mt-4">
          guardar
        </button>
      )}
    </>
  );
};

export default EmpImage;
