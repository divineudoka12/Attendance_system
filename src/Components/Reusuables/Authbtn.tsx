// import { useFaceIO } from "@/pages/FaceAuth"
// import { Button } from "../ui/button";

// const Authbtn: React.FC = () => {

//     const { handleAuthenticate, error } = useFaceIO("fioac691"); // Replace with your actual public ID

//     const handleFaceLogin = async () => {
//         const response = await handleAuthenticate();
//         if (response) {
//             alert("Authentication Successful!");
//             console.log(response);
//         }
//     };

//     return (
//         <div>
//             <Button
//                 onClick={handleFaceLogin}
//                 variant="secondary" className="w-full"
//             >
//                 Login with Face Recognition
//             </Button>
//             {error && <p className="text-red-500">{error}</p>}
//         </div>
//     )
// }

// export default Authbtn