import { Layout } from "../Components/Layout";
import { Button } from "../Components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

const Auth: React.FC = () => {
  const [faceio, setFaceio] = useState<FaceIO | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize useNavigate for navigation
  const navigate = useNavigate();

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

  //function to handle enrollment
  const handleEnroll = async () => {
    if (!faceio) {
      setError("FaceIO instance is not initialized.");
      return;
    }

    try {
      const response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: "example@gmail.com",
          pin: "12345",
        },
      });
      console.log(
        `Unique Facial ID: ${response.facialId}\n` +
          `Enrollment Date: ${response.timestamp}\n` +
          `Gender: ${response.details.gender}\n` +
          `Age Approximation: ${response.details.age}`
      );
    } catch (err: any) {
      setError("Enrollment failed: " + err.message);
    }
  };

  //function to handle authentication
  const handleAuthenticate = async () => {
    if (!faceio) {
      setError("FaceIO instance is not initialized.");
      return;
    }

    try {
      const response = await faceio.authenticate({
        locale: "auto",
      });
      console.log(
        `Unique Facial ID: ${response.facialId}\n` +
          `Payload: ${JSON.stringify(response.payload)}`
      );

      // Redirect to the dashboard after successful authentication
      navigate("/dashboard");
    } catch (err: any) {
      setError("Authentication failed: " + err.message);
    }
  };

  return (
    <Layout title="Login">
      <div className="max-w-md overflow-hidden md:mx-auto mx-4 bg-white shadow-md rounded-lg">
        <div className="p-6">
          <div className="mt-4">
            <div>
              <h1 className="text-2xl text-center font-bold">Face Recognition</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-4 py-10">
              <Button onClick={handleAuthenticate} variant="default" className="w-1/2">
                Login Face
              </Button>
              <Button onClick={handleEnroll} variant="secondary" className="w-1/2">
                Register Face
              </Button>
            </div>
          </div>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </Layout>
  );
};

export default Auth;