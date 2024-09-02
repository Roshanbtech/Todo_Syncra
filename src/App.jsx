import React, { useState, useEffect, useRef } from "react";
import Todo from "./Components/Todo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import anime from "animejs/lib/anime.es.js";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("todos");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const containerRef = useRef(null);
  const gsapRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    // GSAP Animation
    gsap.fromTo(
      gsapRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "bounce.out" }
    );

    // Anime.js Animation
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      scale: [0.5, 1],
      duration: 1500,
      easing: 'easeOutBounce'
    });
  }, []);

  return (
    <motion.div
      className="App"
      drag
      dragConstraints={containerRef}
      whileDrag={{ scale: 1.1 }}
      dragElastic={0.5}
      dragTransition={{ bounceStiffness: 500, bounceDamping: 10 }}
      ref={gsapRef} // Reference for GSAP animation
    >
      <div ref={containerRef} style={{ width: "100vw", height: "100vh" }}>
        <Todo tasks={tasks} setTasks={setTasks} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            backgroundColor: "#000000", // Black background
            color: "#ffd700", // Yellow text
          }}
          icon={{
            style: {
              fill: "#ffd700", // Yellow icons
            },
          }}
          progressStyle={{
            backgroundColor: "#ffd700", // Yellow progress bar
          }}
        />
      </div>
    </motion.div>
  );
};

export default App;
