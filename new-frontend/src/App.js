import React, { useState } from "react";
import "./App.css";

function App() {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageCapture = async () => {
    // Access camera and capture image
    if (!mediaStream) {
      const imageData = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setMediaStream(imageData);
    }
    const video = document.createElement("video");
    video.srcObject = mediaStream;
    await video.play();
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    const imageUrl = canvas.toDataURL("image/png");
    setImageUrl(imageUrl);
    video.pause();
  };

  const handleCameraToggle = () => {
    setIsCameraActive(!isCameraActive);
    if (!isCameraActive && mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Implement your form submission logic here (e.g., send data to server)
    console.log(
      "Form submitted with description:",
      description,
      "and image URL:",
      imageUrl
    );
  };

  return (
    <div className="app">
      <h1>Patient Health Condition</h1>
      <div className="input-container">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="image-container">
        {isCameraActive ? (
          <div>
            <button onClick={handleImageCapture}>Capture Image</button>
            <button onClick={handleCameraToggle}>Close Camera</button>
          </div>
        ) : (
          <>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={handleCameraToggle}>Open Camera</button>
          </>
        )}
        {imageUrl && <img src={imageUrl} alt="Health Condition Image" />}
      </div>
      <div className="button-container">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
