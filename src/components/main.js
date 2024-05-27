import React, { useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import Authentication from "./authentication";

export default function Main({showPopup, setShowPopup}) {
  const modalRef = useRef();

  const onStartHandler = () => {
    setShowPopup(true);
  };

  const onOutsideHandler = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target))
      setShowPopup(false);
  };

  useEffect(() => {
    const video = document.querySelector("video");
    if (showPopup) {
      video.pause();
      document.addEventListener("mousedown", onOutsideHandler);
    } else {
      video.play();
      document.removeEventListener("mousedown", onOutsideHandler);
    }
    return () => {
      document.removeEventListener("mousedown", onOutsideHandler);
    };
  }, [showPopup]);

  return (
    <div className="flex justify-center items-center relative">
      <video loop autoPlay muted playsInline>
        <source
          src="https://cmsassets.rgpub.io/sanity/files/dsfx7636/news/8ab3e227121c53aacab0c9b9f7a48adbc65db520.webm"
          type="video/webm"
        ></source>
      </video>
      <img
        src={logo}
        className="absolute w-lol-main-logo-width"
        alt="logo"
      ></img>
      <div
        className="flex justify-center items-center absolute bottom-24 w-lol-main-button h-lol-main-button bg-lol-sky-blue text-lol-gold lol-main-button cursor-pointer hover:bg-lol-sky-blue-hover"
        onClick={onStartHandler}
      >
        Start
      </div>
      {showPopup ? (
        <>
          <div className="fixed top-0 left-0 w-full h-full inset-0 bg-gray-900 opacity-75 z-10"></div>
          <div className="absolute w-4/5 z-20" ref={modalRef}>
            <Authentication />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
