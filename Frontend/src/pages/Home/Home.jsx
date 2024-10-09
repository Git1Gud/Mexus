import HomeNavbar from "../../components/HomeNavbar/HomeNavbar";
import "./Home.css";
import pattern from "../../assets/pattern.png";
import chat from "../../assets/chat.png";
import dashboard from "../../assets/dashboard.png";
import videoCall from "../../assets/videoCall.png";
import { IoCall } from "react-icons/io5";
import Footer from "../../components/Footer/Footer";

const servicesData = [
  {
    icon: <IoCall />,
    serviceName: "Appointment booking",
  },
  {
    icon:   <i className="fa-solid fa-video"></i>,
    serviceName: "Online Consultation",
  },
  {
    icon:   <i className="fa-solid fa-comments"></i>,
    serviceName: "Chat",
  },
  {
    icon:   <i className="fa-solid fa-user"></i>,
    serviceName: "Medical awareness",
  },
  {
    icon:   <i className="fa-solid fa-robot"></i>,
    serviceName: "Chatbot",
  },
  {
    icon:   <i className="fa-solid fa-hospital"></i>,
    serviceName: "Emergency Lookup",
  },
  {
    icon:   <i className="fa-solid fa-pills"></i>,
    serviceName: "Medicine Reminder",
  },
  {
    icon:   <i className="fa-solid fa-brain"></i>,
    serviceName: "AI Asisstant",
  },
  // Add more services here
];
const Home = () => {
  return (
    <div className="homePageflex flex-col w-full  overflow-hidden relative">
      <HomeNavbar />
      <div className="flex flex-col w-full mt-20 mb-20">
        <section className="relative flex flex-col  justify-center  items-center bg-white">
          <div className="relative w-full min-w-[1024px] h-max ">
            <div className="feature-shade">
              <div className="feature-shade-1"></div>
              <div className="feature-shade-2"></div>
              <div className="feature-shade-3"></div>
              <div className="feature-shade-4"></div>
            </div>

            <img
              src={pattern}
              alt="shade"
              className="absolute w-[1200px] top-0 left-[55%] -translate-x-1/2 h-full z-10"
              width="100%"
              loading="lazy"
            />
          </div>

          <div className="homeUP z-10 flex flex-col items-center justify-center  ">
            <div className="text-Blakish text-5xl text-center">
              <div className="heading font-bold ">
                Build Powerful Interaction Apps with
              </div>
              <span className="heading !font-anta">
                Voice , Video & Chat API
              </span>
              <div className="subHeading !text-gray-400 mt-5 mb-5">
                Find your ideal doctor and book appointments effortlessly
              </div>
            </div>

            <button className="btn mt-5">Book Now</button>

            <div className="homeImages w-full h-max flex flex-row items-end justify-center gap-9 ">
              <img className="img1" src={chat} alt="" />
              <img className="img2" src={dashboard} alt="" />
              <img className="img3" src={videoCall} alt="" />
            </div>
          </div>
        </section>

        <section className=" relative homeServices mt-30 pt-10 h-full flex flex-col  justify-center  items-center text-center bg-transulcent">
          <div className="absolute serviceShade"></div>
          <div className=" z-10 serviceWrapper h-full flex flex-col  justify-center  items-center text-center">
            <div className="heading spanColor !font-anta">Our Services</div>
            <div className="subHeading font-normal">
              The Unstoppable Interaction Growth Engine Purposefully Built for
              Your App Success
            </div>
          </div>
          <div className=" z-10  services flex flex-row  flex-wrap justify-center  items-center text-center ">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="serviceBox flex flex-row justify-center items-center gap-5"
              >
                <div className="servicon flex justify-center items-center ">{service.icon}</div>
                <p className=" serviText flex justify-center items-center ">{service.serviceName}</p>
              </div>
            ))}
          </div>
        </section>
        {/* <RevealBento/> */}
        
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
