import { useSearchParams } from "react-router-dom"
import axios  from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const PaymentPage = () => {

    // this is directly fetched by the url's
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [amount, setAmount] = useState("");
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    
    
    
    return <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="h-full flex flex-col dark:border-gray-700 justify-center items-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 dark:bg-gray-800 dark:border-gray-700 shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl text-white font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4 pb-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-black">{name[0]}</span>
                    </div>
                    <h3 className="text-2xl text-white font-semibold">{name}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <input
                        type="number" onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button onClick={() => {
                        axios.post("http://localhost:3000/api/v1/account/transfer", {
                            to: id,
                            amount: amount 
                        }, {
                            headers: {
                                Authorization: "Bearer" + localStorage.getItem("token")
                            }
                        }).then((res) => {
                            if(res.status == 200){
                                navigate("/success")
                            }
                        }).catch((res)=>{
                            navigate("/failed")
                        })
                    }} className="justify-center text-black rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 ">
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
}