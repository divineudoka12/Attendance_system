import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Layout } from "../Components/Layout";
import { Button } from "../Components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define validation schema using yup
const SignupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

// Define interfaces
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
    payload: { name: string; email: string };
  }): Promise<FaceIOEnrollResponse>;

  authenticate(options: { locale: string }): Promise<FaceIOAuthenticateResponse>;
}

// Declare the faceIO constructor globally
declare const faceIO: new (publicId: string) => FaceIO;

type Iuser = {
  name: string;
  email: string;
};

const Auth: React.FC = () => {
  const [faceio, setFaceio] = useState<FaceIO | null>(null);
  const [_error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const publicId =  import.meta.env.VITE_PUBLIC_ID;

  // Initialize FaceIO instance
  useEffect(() => {
    const initializeFaceIO = () => {
      try {
        const faceioInstance = new faceIO(publicId);
        setFaceio(faceioInstance);
      } catch (err: any) {
        setError("Failed to initialize FaceIO: " + err.message);
      }
    };
    initializeFaceIO();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iuser>({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = async (data: Iuser) => {
    try {
      await handleEnroll(data);
    } catch (err: any) {
      setError(err.message || "Unknown error occurred during enrollment.");
    }
  };

  const handleEnroll = async (user: Iuser) => {
    if (!faceio) {
      setError("FaceIO instance is not initialized.");
      return;
    }

    try {
      const response = await faceio.enroll({
        locale: "auto",
        payload: {
          name: user.name,
          email: user.email,
        },
      });
      alert(
        `Unique Facial ID: ${response.facialId}\n` +
          `Enrollment Date: ${response.timestamp}\n` +
          `Gender: ${response.details.gender}\n` +
          `Age Approximation: ${response.details.age}`
      );
      navigate("/dashboard");
    } catch (err: any) {
      handleError(err.message || "Unknown error");
    }
  };

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
        `Unique Facial ID: ${response.facialId}\nPayload: ${JSON.stringify(
          response.payload
        )}`
      );
      navigate("/dashboard");
    } catch (err: any) {
      handleError(err.message || "Unknown error");
    }
  };

  const handleError = (errCode: string) => {
    const errorMessages: Record<string, string> = {
      PERMISSION_REFUSED: "Access to the Camera stream was denied by the end user.",
      NO_FACES_DETECTED: "No faces were detected during the enrollment or authentication process.",
      UNRECOGNIZED_FACE: "Unrecognized face in this application's Facial Index.",
      MANY_FACES: "Two or more faces were detected during the scan process.",
      FACE_DUPLICATION: "User enrolled previously. Cannot enroll again.",
      MINORS_NOT_ALLOWED: "Minors are not allowed to enroll on this application.",
      PAD_ATTACK: "Presentation (Spoof) Attack detected during the scan process.",
      FACE_MISMATCH: "Facial vectors do not match.",
      WRONG_PIN_CODE: "Wrong PIN code supplied during authentication.",
      PROCESSING_ERR: "Server-side error.",
      UNAUTHORIZED: "Your application is not authorized. Check your public ID.",
      TERMS_NOT_ACCEPTED: "Terms & Conditions were not accepted.",
      UI_NOT_READY: "FaceIO widget could not be injected onto the DOM.",
      SESSION_EXPIRED: "Client session expired. Restart the process.",
      TIMEOUT: "Operation timed out.",
      TOO_MANY_REQUESTS: "Too many requests. Upgrade your application for more capacity.",
      EMPTY_ORIGIN: "Origin or Referer HTTP request header is empty or missing.",
      FORBIDDDEN_ORIGIN: "Domain origin is forbidden from using FaceIO.",
      FORBIDDDEN_COUNTRY: "Country is forbidden from using FaceIO.",
      SESSION_IN_PROGRESS: "Another session is already in progress.",
      NETWORK_IO: "Network connection error with FaceIO.",
    };
  
    const message = errorMessages[errCode] || "An unknown error occurred refresh the page.";
    setError(message);
    toast.error(message);
    console.error("FaceIO Error:", message);
  };
  

  return (
    <Layout title="">
    <div className="max-w-md overflow-hidden md:mx-auto mx-4 bg-white shadow-md rounded-lg">
      <div className="p-6">
        <h1 className="text-2xl text-center font-bold">Check In</h1>

        <form className="space-y-6 mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="name"
              className="text-sm font-bold text-gray-600 block"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="w-full p-2 border border-blue-900 rounded mt-1"
            />
            {errors.name && (
              <p className="text-red-900">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-bold text-gray-600 block"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="email@mail.com"
              {...register("email")}
              className="w-full p-2 border border-blue-900 rounded mt-1"
            />
            {errors.email && (
              <p className="text-red-900">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Button type="submit" variant="secondary" className="w-full">
              Register
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-4 py-10">
          <Button
            onClick={handleAuthenticate}
            variant="default"
            className="w-1/2"
          >
            Login
          </Button>
        </div>
      </div>
    </div>

    <ToastContainer position="top-center" autoClose={5000} />
  </Layout>
  );
};

export default Auth;