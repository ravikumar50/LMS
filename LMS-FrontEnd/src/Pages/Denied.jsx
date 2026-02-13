import { useNavigate } from "react-router-dom";

function Denied(){

    const navigate = useNavigate();
    return(
        <main className="h-screen w-full flex flex-col items-center justify-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                403
            </h1>

            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
                Access Denied
            </div>

            <button
                className="mt-5 relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring"
                onClick={() => {
                    
                    window.history.back();
                
                    // Fallback after short delay if back doesn't do anything
                    setTimeout(() => {
                        if (window.location.pathname === "/denied") {
                            navigate("/");
                        }
                    }, 100);
                }}
            >
                <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                    Go Back
                </span>
            </button>

        </main>
    )
}

export default Denied;