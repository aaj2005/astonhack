const Navtest = () => {

    window.addEventListener('scroll', function() {
        // console.log(window.innerWidth)
        let el_autohide = document.querySelector('.autohide');  
        if (window.innerWidth < 992 ) {
            //if gone from big screen size to small screen size, make sure navbar is visible
            if (el_autohide.classList.contains('scrolled-down')) {
                el_autohide.classList.remove('scrolled-down');
                el_autohide.classList.add('at-top-of-page');
            } 
            var el_togglericon = document.getElementsByClassName('toggler-icon');
            if(window.scrollY > 0) {
                //turn background white
                el_autohide.classList.add("mobile-nav");
                el_autohide.classList.remove("desktop-nav");
    
    
                //make logo and button black
                
                var logoImage = document.getElementById('logo-img')
                logoImage.classList.add('invert-logo')
    
               
    
                for(var i=0; i< el_togglericon.length; i++){
                    el_togglericon[i].classList.add('togglerBar-background');
                }
                
    
            }
            else if (window.scrollY <= 0) {
                
                el_autohide.classList.add("desktop-nav");
                el_autohide.classList.remove("mobile-nav");
               
                
                //el_togglericon.style.color = 'black'
                for(var i=0; i< el_togglericon.length; i++){
                    el_togglericon[i].classList.remove('togglerBar-background');
                }
    
                var logoImage = document.getElementById('logo-img')
                logoImage.classList.remove('invert-logo')
    
                
            }  
    
        } else {
                
            if(el_autohide){
    
                if (el_autohide.classList.contains('mobile-nav')) {
                    el_autohide.classList.remove("mobile-nav");
                }
                if(window.scrollY > 50) {
                    el_autohide.classList.remove('at-top-of-page');
                    el_autohide.classList.add('scrolled-down');
                }
                else if (window.scrollY <= 50) {
                    el_autohide.classList.remove('scrolled-down');
                    el_autohide.classList.add('at-top-of-page');
                }  
            }     
        }
    }); 
    return (
        <nav id="hideNav" className="autohide fixed-top navbar navbar-expand-lg navbar-light py-2 justify-content-center">
            <div className="container d-flex align-items-center">
                <a className="navbar-brand d-lg-none ms-3" href="/">
                    <img id="logo-img" src="/EmotionSense.png" alt="Brand Logo" loading="lazy"/>
                </a>
                <div className="offcanvas offcanvas-end bg-dark"data-bs-scroll="false" data-bs-backdrop="false" id="offcanvasNavbar" aria-labelledby='offcanvasNavbarLabel'>
                    <div className="offcanvas-header">
                        {/* <h5 className="offcanvas-title">Fred Davey Photography</h5> */}
                    </div>
                    <div className="offcanvas-body d-flex align-self-center w-100">
                        <ul className="navbar-nav justify-content-evenly mx-auto">
                            
                                <a className="d-none d-lg-block px-4" href="/">
                                    <img src="/EmotionSense.png" width="auto" height="50px" alt="" loading="lazy"/>
                                </a>
                            
                        </ul>
                    </div>
                </div>
                <button className="navbar-toggler ms-auto me-3"  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="toggler-icon top-bar"></span>
                    <span className="toggler-icon middle-bar"></span>
                    <span className="toggler-icon bottom-bar"></span>
                </button>
            </div>  
        </nav>
    )
}
export default Navtest