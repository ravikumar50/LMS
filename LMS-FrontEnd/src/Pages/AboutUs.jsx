import HomeLayout from "../Layouts/HomeLayout";
import aboutImage from "../Assets/Images/aboutMainImage.png"
import { celebrities } from "../Constants/CelebritiesData";
import CaraouselSlide from "../Components/CarouselSlide";
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

                    {celebrities && celebrities.map((celebrity)=>(
                        <CaraouselSlide {...celebrity} totalSlides={celebrities.length} key={celebrity.slideNumber} />
                    ))} 
                    
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs;