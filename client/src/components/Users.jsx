import { useNavigate } from 'react-router-dom'

export function Users({users}){
  const navigate = useNavigate();
  
    return <div>
      <div>
        {
            users && users.map((user) => (
            <button onClick={(e) => {
              navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} className="flex  flex-row space-x-3 hover:bg-gray-400 rounded-2xl p-1 cursor-pointer">
              <div className="rounded-full hover:bfull w-6 text-order-black bg-gray-300 ml-2">{user.firstName[0]}</div>
              <p className="text-white pr-2 hover:text-black ">{user.firstName} {user.lastName}</p>
            </button>
          ))
        }
      </div>
        
              
    </div>
}

