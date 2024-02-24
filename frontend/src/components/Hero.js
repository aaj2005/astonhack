const Hero = () => {
        return (
            <header className="hero">
                <div className="hero-overlay"></div>
                <img className="hero-image" src="/hero.jpg" alt="Hero" loading="lazy"/>
                <div className="hero-content h-100 position-relative">
                    <div className="d-flex h-100 align-items-center ">
                        <div className="text-white px-5">
                            <h1 className="mb-4 text-center text-lg-start">Welcome to EmotionSense</h1>
                            <h4 className="mb-4 text-center text-lg-start">Your go-to mental health companion</h4>
                            {/* <p className="text-center text-lg-start">Share your feelings without hesitation – just hit the button below to get started!</p> */}
                        </div>
                    </div>
                </div>
                <button className="hero-scroll-btn mx-0" onClick={() => window.scrollTo(0, window.innerHeight)}>
                    <p><i className="bi bi-chevron-down"></i></p>
                </button>
            </header>
        )
    
}

export default Hero