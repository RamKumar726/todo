import {auth , provider} from "../config/firbase"
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToDo(){
    const navigate = useNavigate();
    const signIn = async() =>{
        const result  = await signInWithPopup(auth , provider);
        
        navigate("/")
        
        

    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full text-center" style={{marginLeft:"40%" , marginTop: "10%"}}>
            <h1 className="text-3xl text-blue-400 font-bold mb-4">Login Page</h1>
            <h4 className="text-lg text-gray-700 mb-6">Sign in with Google to continue</h4>
            <button 
                onClick={signIn} 
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
                Sign in with Google
            </button>
            <ToastContainer />

        </div>
        
    )
}

export default ToDo;