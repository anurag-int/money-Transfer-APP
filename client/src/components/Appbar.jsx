import { Users } from "./Users"
import { Balance } from "./Balance";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"

import axios from 'axios';

export function Appbar() {
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

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex h-screen flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex flex-row justify-between text-white">
                <div>Money Transfer App</div>
                <div className="flex flex-row justify-between space-x-3">
                  <p>Hello</p>
                  <div className="rounded-full cursor-pointer w-6 text-center text-black bg-gray-300">
                  A
                  </div>
                </div> 
              </div>

              <Balance></Balance>
              <div>
                <input type="text" name="filter" id="filter" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Users..." required
                  onChange={(e) => {
                  console.log(e.target.value)
                setFilter(e.target.value);
                }}
                />
              </div>

              <div className="space-y-4">
                <p className="text-white">Your Contacts</p>
                <Users users={users}></Users>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
