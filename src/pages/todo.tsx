
import { useEffect, useState } from "react"
import { addDoc , collection } from 'firebase/firestore'
import { db } from "../config/firbase"
import {auth } from  "../config/firbase"
import {useAuthState} from "react-firebase-hooks/auth"
import {getDocs  , query ,where , doc  , updateDoc , getDoc , deleteDoc } from "firebase/firestore"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export interface Task{
    uid: string;
    taskname: {
        task: string;
      };
    isDone: boolean;
    username: string;
    id: string;
}


function ToDo(){
    const [formData , setformData] = useState<any>({
        task: ""   , 
    })

    const [user] = useAuthState(auth)
    useEffect(()=>{
        {
            user && toast.success('Sign in With '+ user.email);
        }
    } , [])

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
            uid: user?.uid,
            isDone: false,
            
        }) 
        setformData(''); 
        fetchTasks();
        
    }


    const fetchTasks = async () =>{
        try{
            const taskRef = collection( db , "tasks")
            const q = query(taskRef , where("uid"  ,"==" , user?.uid ));
            const querySnapshot =  await getDocs(q);
            
            const taskArray =  querySnapshot.docs.map(doc =>({
                id: doc.id,
                ...doc.data()
            })) as Task[];
            setTasks(taskArray)
            console.log(taskArray)
           
        }
        catch(error){
            console.log("Error :" , error);

        }
    };

    const [tasks , setTasks] = useState<Task[]>([])
    useEffect(() =>{
        if(user){
            
            fetchTasks();
        }
    } , [user])

    useEffect(() =>{

    } , [tasks])
   

    const handleCheckbox = async (taskId: string , isDone: boolean) =>{
        try{
            const taskdoc = doc(db , "tasks" , taskId);
            const docSnapshot = await getDoc(taskdoc);
            
            if(docSnapshot.exists()){
                await  updateDoc(taskdoc , {isDone}  );
                setTasks(prevTasks =>
                    prevTasks.map(task => (task.id === taskId ? {...task , isDone } : task))
                );
                toast.success("Operation Done Sucessfully...")

            }
            else {
                console.error('No document found with ID:', taskId);
                }   
        }
        catch(error){
            console.error('Error updating task:', error);
        }

        console.log("Checked Tasks ",tasks)
    }
    const showAlert = () => toast.success("Task Added Suceessfully..");
    const deleteTaskAlert =() => toast.error("Task Deletd Sucessfully...")

    const handleDelete = async (taskId: string) => {
        try {
          await deleteDoc(doc(db, "tasks", taskId));
          setTasks(tasks.filter((task) => task.id !== taskId));
          deleteTaskAlert();
        } catch (error) {
          console.error("Error deleting task: ", error);
        }
      };


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
                                type="text" name="task" required value={formData.task} onChange={handleChange} placeholder="Add a task" />
                            <button
                                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                                type="submit"
                                onClick={showAlert}>
                                Add
                            </button>
                            <ToastContainer />
                        </div>
                    </form>            
                    {tasks.length > 0 ? (
        <ul className="divide-y divide-gray-200 px-4 mb-3">
          {tasks.map(task => (
            <li key={task.id}  className=" py-4 rounded"  style={{background: task.isDone? '#7AE47E' : '#F0D630' }}>
                <div className="flex items-center p-1 pl-5 ">
                <input id="todo1" name="todo1" type="checkbox"
                    className=" h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" checked={task.isDone}  onChange={(e) => handleCheckbox(task.id  , e.target.checked)}/>
                
                <label  className="ml-3 block text-gray-900">
                    <span className="text-lg font-medium"> {task.taskname.task}</span>
                    <span className="text-sm font-light text-gray-500 ml-3"><strong>{task.isDone ? 'Yes' : 'No'}</strong></span>
                    <button className=" ml-24 px-4 py-2 rounded bg-red-500 text-white font-bold hover:bg-red-700" onClick={(e) => handleDelete(task.id)}>
                        Delete
                    </button>
                   
                </label>
                
                </div>
                <br />
            </li>
            
          ))}
        </ul>
      ) : (
        <p>Add Your First Task</p> // Or display a message indicating no tasks found
      )}    
        </div>
    </div>
    )
}

export default ToDo;