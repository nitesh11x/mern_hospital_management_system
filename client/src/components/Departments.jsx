import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Stethoscope,
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Scan,
  Droplet,
} from "lucide-react";
import { motion } from "framer-motion";

const departments = [
  {
    id: 1,
    name: "General Medicine",
    desc: "Comprehensive care for common health concerns.",
    icon: <Stethoscope className="w-10 h-10 text-purple-600" />,
    imgUrl: "/genral.png",
  },
  {
    id: 2,
    name: "Cardiology",
    desc: "Advanced treatment for heart and vascular diseases.",
    icon: <HeartPulse className="w-10 h-10 text-purple-600" />,
    imgUrl: "/cardiology.jpg",
  },
  {
    id: 3,
    name: "Neurology",
    desc: "Specialized care for brain and nervous system disorders.",
    icon: <Brain className="w-10 h-10 text-purple-600" />,
    imgUrl: "/neurology.png",
  },
  {
    id: 4,
    name: "Orthopedics",
    desc: "Expert solutions for bone, joint, and spine issues.",
    icon: <Bone className="w-10 h-10 text-purple-600" />,
    imgUrl: "/ortho.png",
  },
  {
    id: 5,
    name: "Pediatrics",
    desc: "Compassionate care for children and infants.",
    icon: <Baby className="w-10 h-10 text-purple-600" />,
    imgUrl: "/pedia.png",
  },
  {
    id: 6,
    name: "Psychiatry",
    desc: "Mental health support with counseling and  services.",
    icon: <Brain className="w-10 h-10 text-purple-600" />,
    imgUrl: "/phy.png",
  },
  {
    id: 7,
    name: "Radiology",
    desc: "Advanced imaging services like X-rays, MRI, and CT scans.",
    icon: <Scan className="w-10 h-10 text-purple-600" />,
    imgUrl: "/radio.png",
  },
  {
    id: 8,
    name: "Dermatology",
    desc: "Skin care, treatments, cosmetic dermatology services.",
    icon: <Droplet className="w-10 h-10 text-purple-600" />,
    imgUrl: "/derma.png",
  },
];

const Departments = () => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <section id="departments" className="w-full bg-purple-50 py-16">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-10">
          Our Departments
        </h2>

        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={2500}
          transitionDuration={800}
          keyBoardControl
          swipeable
          draggable
          removeArrowOnDeviceType={["tablet", "mobile"]}
          showDots
        >
          {departments.map((dept) => (
            <motion.div
              key={dept.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-sm shadow-md overflow-hidden mx-3 flex flex-col items-center text-center hover:shadow-lg transition transform hover:-translate-y-1"
            >
              {dept.imgUrl && (
                <img
                  src={dept.imgUrl}
                  alt={dept.name}
                  className="w-full h-40 sm:h-48 object-cover rounded-sm"
                />
              )}
              <div className="p-6 flex flex-col items-center">
                <div className="mb-3">{dept.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-purple-900">
                  {dept.name}
                </h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  {dept.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Departments;
