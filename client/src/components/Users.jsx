import { useEffect, useState } from "react"
import axios from 'axios';

export function Users(){
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(()=>{
      axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then(response => {
        console.log(response.data.users)
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error(error)
      })
    }, [filter])

    return <div>
      <div>
          <input type="text" name="filter" id="filter" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Users..." required
            onChange={(e) => {
              console.log(e.target.value)
              setFilter(e.target.value);
              }}
            />
        </div>

        <div>
        {
            users && users.map((user) => (
            <button className="flex  flex-row space-x-3 hover:bg-gray-400 rounded-2xl p-1 cursor-pointer">
              <div className="rounded-full hover:bfull w-6 text-order-black bg-gray-300 ml-2">{user.firstName[0]}</div>
              <p className="text-white pr-2 hover:text-black ">{user.firstName} {user.lastName}</p>
            </button>
          ))
        }
        </div>
        
              
    </div>
}

