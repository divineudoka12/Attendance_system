import { Layout } from '../Components/Layout'
import { Button } from '../Components/ui/button'
import { Input } from '../Components/ui/input'
import { Label } from '../Components/ui/label'
import { Link } from 'react-router-dom'
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


export function RegisterPage() {
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

    return (
        <Layout title="Register">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" type="text" placeholder="Enter your full name" />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                        <div>
                            <Label htmlFor="id">Employee ID</Label>
                            <Input id="id" type="text" placeholder="Enter your employee ID" />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Create a password" />
                        </div>
                        <Link to="/dashboard"><Button type="submit" className="w-full">Register</Button></Link>
                    </form>
                    <div className="mt-4">
                        {/* <Link to="/faceauth"> */}
                        <Button onClick={handleEnroll} variant="secondary" className="w-full">
                            Register Face
                        </Button>
                        {/* </Link> */}
                    </div>
                </div>
            </div>
            {error && <div className="error">{error}</div>}
        </Layout>
    )
}