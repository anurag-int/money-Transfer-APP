import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signin(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return <div>
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</div>
                      <input type="email" name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}/>
                  </div>
                  <div>
                      <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</div>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
                          </div>
                          <div className="ml-3 text-sm">
                            <div className="text-gray-500 dark:text-gray-300">Remember me</div>
                          </div>
                      </div>
                      <a href="#" className="text-md text-white  text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={() => {
                        fetch("http://localhost:3000/api/v1/user/signin", {
                            method : "POST",
                            body : JSON.stringify({
                                userName : userName,
                                password : password
                            }),
                            headers : {
                                "Content-Type" : "application/json"
                            }
                        }).then(async function(res){
                            const data = await res.json();
                            localStorage.setItem("token", data.token)
                            alert(data.msg)
                            if(data.status == 200){
                                navigate("/dashboard?name=" + data.user.firstName)
                            }else{
                                const data = await res.json();
                                  alert(JSON.stringify(data.msg));
                              }
                        }).catch(function(error){
                            console.log('Error:', error)
                        })
                    }}
                    >Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
}

