import { useEffect, useRef,useState  } from 'react';
import styles from './Parallax.module.css';

export const useScreenSizes = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
      setIsMediumScreen(window.innerWidth >= 640 && window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isSmallScreen, isMediumScreen };
};

const Parallax = () => {
    const [isSmallScreen, setIsSmallScreen] = useState("");
  const [isMediumScreen, setIsMediumScreen] = useState("");
  

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640 ? true : false);
      setIsMediumScreen(
        window.innerWidth >= 640 && window.innerWidth <= 1024 ? true : false
      );
    };
    handleResize(); // Call once to set the initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const parallaxRef = useRef(null);
   const h2Ref1 = useRef(null);
   const h2Ref2 = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const parallaxElement = parallaxRef.current;
       const h2Element1 = h2Ref1.current;
       const h2Element2 = h2Ref2.current;

      if (parallaxElement && h2Element1) {
        parallaxElement.style.transform = `translateY(${scrollY * 0.5}px)`;
        h2Element1.style.transform = `translateY(${scrollY * 0.8}px)`;
        
      }
      if (parallaxElement && h2Element2) {
        parallaxElement.style.transform = `translateY(${scrollY * 0.5}px)`;
        h2Element2.style.transform = `translateY(${scrollY * 0.8}px)`;
        
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.parallax} ${isSmallScreen ? styles.smallScreen : ''} ${isMediumScreen ? styles.mediumScreen : ''}`} ref={parallaxRef}>


        {!isSmallScreen && !isMediumScreen ? (
        <section className=" relative flex justify-center  align-items ">
          <img
            src="../img/StartPageKandidatSmall.jpg"
            id="bakgrund"
            className="max-w-full relative mb-7 h-auto object-cover"
          ></img>
    
          <div
          ref={h2Ref1}
            id="parallaxTitleBig"
            className="text-black z-0 uppercase mt-[8%] flex items-center lg:mt-[6%] absolute text-4xl  lg:text-8xl 
          font-bold mr-[55%]"
          >
            <h2 className="ml-20">
            TRAPLA
            </h2>
            <img className='h-24 z-0'src='../img/logo.svg'/>
           
          </div>

          

          <img
            src="../img/StartPageforegroundSmall.png"
            id="foreground"
            className="max-w-full absolute h-auto  object-cover"
          ></img>
        </section>
      ) : null}
      {isMediumScreen && !isSmallScreen ? (
        <section className=" relative flex justify-center align-items">
          <img
            src="../img/StartPageKandidatSmall.jpg"
            id="bakgrund"
            className="max-w-full relative mb-7 h-auto object-cover"
          ></img>
    
          <div
          ref={h2Ref1}
            id="parallaxTitleBig"
            className="text-black z-0 uppercase mt-[8%] flex items-center lg:mt-[6%] absolute text-4xl  lg:text-8xl 
          font-bold mr-[55%]"
          >
            <h2 className="ml-20">
            TRAPLA
            </h2>
            <img className='h-10 z-0'src='../img/logo.svg'/>
           
          </div>

          

          <img
            src="../img/StartPageforegroundSmall.png"
            id="foreground"
            className="max-w-full absolute h-auto object-cover"
          ></img>
        </section>
      ): null}

      {isSmallScreen === true && (
        <section className=" relative flex justify-center align-items h-auto w-screen">
          <img
            src="../img/MobileKandidatSmall.jpg"
            id="bakgrund"
            className="w-full  h-auto object-cover"
          ></img>
          <div id="parallaxTitleSmall"
          ref={h2Ref2}
           className="text-black z-0 absolute mt-[16%] text-6xl text-center  sm:text-5xl 
           font-bold flex items-center font-family: ">
          <h2>
            TRAPLA
          </h2>
          <img className='h-20 z-0'src='../img/logo.svg'/>

          </div>

          <img
            src="../img/MobileKandidatSmallForeground.png"
            id="foreground"
            className="max-w-full absolute h-auto object-cover"
          ></img>
        </section>
      )}
    </div>
  );
};

export default Parallax;