import { useEffect, useState } from "react"
import axios from 'axios';

export function Users(){
    const [users, setUsers] = useState([]);


    useEffect(()=>{
      axios.get(`http://localhost:3000/api/v1/user/bulk`)
      .then(response => {
        console.log(response.data.users)
        setUsers(response.data.users );
      })
      .catch(error => {
        console.error(error)
      })
    }, [users])

    return <div>

              {
                users.map((user) => (
                  <button className="flex flex-row space-x-3 hover:bg-gray-400 rounded-2xl p-1 cursor-pointer">
                    <div className="rounded-full hover:bfull w-6 text-order-black bg-gray-300 ml-2">A</div>
                    <p className="text-white pr-2 hover:text-black ">{user.firstName} {user.lastName}</p>
                  </button>
                ))
              }
              
    </div>
}

