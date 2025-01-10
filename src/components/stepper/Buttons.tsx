import React from "react";

const StepperButtons = () => {
    return (
        <>
            <div className="border-b-zinc-300 bg-white shadow py-3">
                <div className="flex justify-between mx-5">
                    <button className="px-4 py-2 rounded-lg border-blue-500 border-2 text-blue-500 disabled:bg-gray-300 disabled:text-gray-500">
                        Back
                    </button>
                    <div className="flex flex-row gap-x-3">
                        <button className="px-4 py-2 rounded-lg text-blue-500 disabled:bg-gray-300 disabled:text-gray-500">
                            Skip
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300 disabled:text-gray-500">
                            Save Settings
                        </button>
                    </div>
                </div> 
            </div>
        </>
    )
}

export default StepperButtons