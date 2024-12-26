import { useState, useEffect } from "react";

// Define the types for FaceIO and its methods
interface FaceIODetails {
  gender: string;
  age: number;
}

interface FaceIOEnrollResponse {
  facialId: string;
  timestamp: string;
  details: FaceIODetails;
}

interface FaceIOAuthenticateResponse {
  facialId: string;
  payload: Record<string, any>;
}

interface FaceIO {
  enroll(options: {
    locale: string;
    payload: { email: string; pin: string };
  }): Promise<FaceIOEnrollResponse>;

  authenticate(options: { locale: string }): Promise<FaceIOAuthenticateResponse>;
}

// Declare the faceIO constructor globally
declare const faceIO: new (publicId: string) => FaceIO;

const FaceAuth = () => {
  const [faceio, setFaceio] = useState<FaceIO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeFaceIO = async () => {
      try {
        // Create a new instance of FaceIO with your public ID
        const faceioInstance = new faceIO("fioac691");
        // Update state with the instance
        setFaceio(faceioInstance);
      } catch (err: any) {
        // Set error state if initialization fails
        setError("Failed to initialize FaceIO: " + err.message);
      }
    };
    initializeFaceIO();
  }, []);

  // Define function to handle enrollment
  const handleEnroll = async () => {
    if (!faceio) {
      setError("FaceIO instance is not initialized.");
      return;
    }

    try {
      // Call the enroll method of the FaceIO instance with necessary options
      const response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: "example@gmail.com",
          pin: "12345",
        },
      });
      // Log enrollment details to the console
      console.log(
        `Unique Facial ID: ${response.facialId}\n` +
        `Enrollment Date: ${response.timestamp}\n` +
        `Gender: ${response.details.gender}\n` +
        `Age Approximation: ${response.details.age}`
      );
    } catch (err: any) {
      // Set error state if enrollment fails
      setError("Enrollment failed: " + err.message);
    }
  };

  // Define function to handle authentication
  const handleAuthenticate = async () => {
    if (!faceio) {
      setError("FaceIO instance is not initialized.");
      return;
    }

    try {
      // Call the authenticate method of the FaceIO instance with necessary options
      const response = await faceio.authenticate({
        locale: "auto",
      });
      // Log authentication details to the console
      console.log(
        `Unique Facial ID: ${response.facialId}\n` +
        `Payload: ${JSON.stringify(response.payload)}`
      );
    } catch (err: any) {
      // Set error state if authentication fails
      setError("Authentication failed: " + err.message);
    }
  };

  return (
    <div>
      <h1>Facial Authentication with FaceIO</h1>
      <button onClick={handleEnroll}>Enroll</button>
      <button onClick={handleAuthenticate}>Authenticate</button>
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default FaceAuth
