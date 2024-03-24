export const PaymentFailed = () => {

    return <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="h-full flex flex-col dark:border-gray-700 justify-center items-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 dark:bg-gray-800 dark:border-gray-700 shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl text-white font-bold text-center">Oops Payment Failed!</h2>
                </div>
                <div className="p-6 ml-[118px]">
                    <img className="pl-[20px] w-15 h-8" src="https://static.vecteezy.com/system/resources/thumbnails/011/577/704/small_2x/3d-rendering-cross-false-wrong-choice-png.png"></img>
                </div>
        </div>
      </div>
    </div>
}