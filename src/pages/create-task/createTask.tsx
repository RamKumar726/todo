
import { db } from  "../../config/firbase"
import {auth } from "../../config/firbase"
import {useAuthState} from "react-firebase-hooks/auth"
import {getDocs , collection , query ,where} from "firebase/firestore"
import { useEffect, useState } from "react"


export interface Task{
    id: string;
    taskname: {
        task: string;
      };
    isDone: boolean;
    username: string;
}


export default function CreateTask(){
    const [user] = useAuthState(auth)

    const [tasks , setTasks] = useState<Task[]>([])
    useEffect(() =>{
        if(user){
            const fetchTasks = async () =>{
                try{
                    const taskRef = collection( db , "tasks")
                    const q = query(taskRef , where("id"  ,"==" , user.uid ));
                    const querySnapshot =  await getDocs(q);
                    const taskArray =  querySnapshot.docs.map(doc =>({
                        id: doc.id,
                        ...doc.data()
                    })) as Task[];
                    setTasks(taskArray)
                   
                }
                catch(error){
                    console.log("Error :" , error);

                }
            };
            fetchTasks();
        }
    } , [user])

    useEffect(() =>{
    console.log("tasks updated" ,tasks)


    } , [tasks])
   

   

    return (

        <div>
      <h1>Your Tasks:</h1>
      <div>
    <h1>Task Details</h1>
    {tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <p><strong>Task ID:</strong> {task.id}</p>
              <p><strong>Task Name:</strong> {task.taskname.task}</p>
              <p><strong>Is Done:</strong> {task.isDone ? 'Yes' : 'No'}</p>
              <p><strong>Username:</strong> {task.username}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading tasks...</p> // Or display a message indicating no tasks found
      )}
  </div>
    <ul className="divide-y divide-gray-200 px-4">
        <li className="py-4">
            <div className="flex items-center">
                <input id="todo1" name="todo1" type="checkbox"
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                <label  className="ml-3 block text-gray-900">
                    <span className="text-lg font-medium">Finish project proposal</span>
                    <span className="text-sm font-light text-gray-500">Due on 4/1/23</span>
                </label>
            </div>
        </li>    
    </ul>
  </div>
  

    )
}
