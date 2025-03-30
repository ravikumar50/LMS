import HomeLayout from "../Layouts/HomeLayout";
import aboutImage from "../Assets/Images/aboutMainImage.png"
import APJ from "../Assets/Images/apj.png";
import BillGates from "../Assets/Images/billGates.png";
import Einstein from "../Assets/Images/einstein.png";
import SteveJobs from "../Assets/Images/steveJobs.png";
import NelsonMandela from "../Assets/Images/nelsonMandela.png";
function AboutUs(){
    return(
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education.
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our goal is to provide affordable and quality education to the world. We are proving the platform for the aspiring teachers and students to share their skills, creativity to each other to empower the growth and wellness of mankind.
                        </p>
                    </section>
            
                    <div className="w-1/2">
                        <img
                           id="test1"
                           style={{
                              filter : "drop-shadow(0px 10px 10px rgb(0,0,0))"
                           }}
                           alt="about main image"
                           className="drop-shadow-2xl"
                           src={aboutImage}                            
                        />
                    
                    </div>
                </div>

                <div className="carousel w-1/2 m-auto my-16 ">
                    <div id="slide1" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img className="w-40 rounded-full border-2 border-gray-400" src={NelsonMandela}/>
                            <p className="text-xl text-gray-200">
                                {"Education is the most powerful tool you can use to change the world."}
                            </p>
                            <h3 className="text-3xl font-semibold text-white">Nelson Mandela</h3>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide5" className="btn btn-circle">❮</a>
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                        
                    </div>

                    <div id="slide2" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img className="w-40 rounded-full border-2 border-gray-400" src={APJ}/>
                            <p className="text-xl text-gray-200">
                                {"To succeed in your mission, you must have single-minded devotion to your goal."}
                            </p>
                            <h3 className="text-3xl font-semibold text-white">APJ Abdul Kalam</h3>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide1" className="btn btn-circle">❮</a>
                                <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>

                    <div id="slide3" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img className="w-40 rounded-full border-2 border-gray-400" src={Einstein}/>
                            <p className="text-xl text-gray-200">
                                {"Anyone who has never made a mistake has never tried anything new."}
                            </p>
                            <h3 className="text-3xl font-semibold text-white"> Albert Einstein</h3>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide2" className="btn btn-circle">❮</a>
                                <a href="#slide4" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>

                    <div id="slide4" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img className="w-40 rounded-full border-2 border-gray-400" src={SteveJobs}/>
                            <p className="text-xl text-gray-200">
                                {"Your time is limited, so don't waste it living someone else's life."}
                            </p>
                            <h3 className="text-3xl font-semibold text-white">Steve Jobs</h3>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide3" className="btn btn-circle">❮</a>
                                <a href="#slide5" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>

                    <div id="slide5" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img className="w-40 rounded-full border-2 border-gray-400" src={BillGates}/>
                            <p className="text-xl text-gray-200">
                                {"It's fine to celebrate success, but it is more important to heed the lessons of failure."}
                            </p>
                            <h3 className="text-3xl font-semibold text-white">Bill Gates</h3>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide4" className="btn btn-circle">❮</a>
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs;