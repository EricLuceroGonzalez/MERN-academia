import React, { useRef, useState, useEffect } from "react";

import "./ImageUpload.css";
import Button from "./Button";

const ImageUpload = (props) => {
  // Set a loading file state
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  // Call & Store value that survive re-renders and connect to a DOM element
  const filePickerRef = useRef();

  //   Generate the preview, when file change:
  useEffect(() => {
    //   Check if is not null
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  // Handle the selection of images
  const pickImageHandler = () => {
    //   will open the input below
    filePickerRef.current.click();
  };

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid; // Because state dont setState inmediatly
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };
  return (
    <div className="form-control">
      <input
        type="file"
        ref={filePickerRef}
        id={props.id}
        style={{ display: "none " }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />

      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick and image</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
