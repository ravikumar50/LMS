function CaraouselSlide({image, name, quote, slideNumber, totalSlides}){
    return(
        <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                <img className="w-40 rounded-full border-2 border-gray-400" src={image} alt={name}/>
                <p className="text-xl text-gray-200">
                    {quote}
                </p>
                <h3 className="text-3xl font-semibold text-white">{name}</h3>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href={`#slide${slideNumber==1 ? totalSlides : slideNumber-1}`} className="btn btn-circle">❮</a>
                    <a href={`#slide${slideNumber%totalSlides+1}`} className="btn btn-circle">❯</a>
                </div>
            </div>
            
        </div>
    )
}

export default CaraouselSlide;