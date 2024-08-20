import { useState } from "react"
import { addDoc , collection } from 'firebase/firestore'
import { db } from "../../config/firbase"
import {auth } from  "../../config/firbase"
import {useAuthState} from "react-firebase-hooks/auth"






export default function CreateTaskForm(){
    const [formData , setformData] = useState<any>({
        task: ""   , 
    })
    const [user] = useAuthState(auth)

    const handleChange = (event:any) =>{
        const {name , value} = event.target;
        setformData({
            ...formData,
            [name] : value
        });
    };

    const taskRef = collection( db , "tasks")


    const handleSumbit = async(event:any) =>{
        event.preventDefault(); 
        await addDoc(taskRef ,{
            taskname: formData,
            username: user?.displayName,
            id: user?.uid,
            isDone: false,
        }) 
        setformData('');    
    }
    
    return (
        <div>
            

            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">

            <div className="px-4 py-2">
                <h1 className="text-gray-800 font-bold text-2xl uppercase">To-Do List</h1>
                </div>
                    <form className="w-full max-w-sm mx-auto px-4 py-2" onSubmit={handleSumbit}>
                        <div className="flex items-center border-b-2 border-teal-500 py-2">
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text" name="task" value={formData.task} onChange={handleChange} placeholder="Add a task" />
                            <button
                                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                                type="submit">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    )
}