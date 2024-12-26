import { Layout } from '../Components/Layout'
import { Button } from '../Components/ui/button'
import { Input } from '../Components/ui/input'
import { Label } from '../Components/ui/label'
import { Link } from 'react-router-dom';
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

const Auth: React.FC = () => {

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
    <Layout title="Login">
      <div className="max-w-md overflow-hidden md:mx-auto mx-4 bg-white shadow-md rounded-lg">
        <div className="p-6">
          <form className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
            <div className="flex justify-between items-center">
              <Link to="/dashboard"><Button type="submit">Login</Button></Link>
              <Link to="/register">
                <Button variant="outline">Register</Button>
              </Link>
            </div>
          </form>
          <div className="mt-4">
            {/* <Link to="/faceauth"> */}
              <Button onClick={handleAuthenticate} variant="secondary" className="w-full">
                Login with Face Recognition
              </Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </Layout>
  )
}

export default Auth