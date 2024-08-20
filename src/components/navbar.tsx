import { Link } from "react-router-dom"
import {auth } from "../config/firbase"
import {useAuthState} from "react-firebase-hooks/auth"
import {signOut} from "firebase/auth"
import {useNavigate} from 'react-router-dom'


export default function Navbar(){
    const navigate = useNavigate();
    const [user] = useAuthState(auth)
    
    const singOutUser = async() =>{
        await signOut(auth);
        navigate('/login')
    }

    return(
        <div>
           
            
            <header
    className=" inset-x-0 top-0 z-30 mt-5 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
    <div className="px-4">
        <div className="flex items-center justify-between">
            <div className="flex shrink-0">
                <a aria-current="page" className="flex items-center" href="/">
                    <img className="h-7 w-auto" src="https://play-lh.googleusercontent.com/wRotdGcsc2JwefLMShlLf0KtbLGbF1u3sDm95mxM-QHLx4HBW93pqVHmJblxRll8Qw" alt="logo" />
                    <p className="sr-only">ToDo App</p>
                </a>
            </div>
            <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                <Link aria-current="page"
                    className="font  inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    to="/">Home</Link>
            </div>
            <div className="flex items-center justify-end gap-3">
            <a aria-current="page" className="flex items-center" href="/">
                    {  user && <img src={user?.photoURL || ""} alt="Profile" width="40" height="40" style={{borderRadius: 50}} />}
                    <p className="sr-only">Website Title</p>
                </a>
                {!user && <Link className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                    to="/login">Login</Link>}
                {user && <button onClick={singOutUser} className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                   >LogOut</button>}
            </div>
        </div>
    </div>
</header>

        </div>
    )
}