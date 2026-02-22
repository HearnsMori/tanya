"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import Image from 'next/image';

export default function MoveDiv() {
    const [timeSince, setTimeSince] = useState({ d: 0, h: 0, m: 0, s: 0 });
    // 1 unit = 50px (you can change this to any value)
    const UNIT = 5;
    const [pos, setPos] = useState({ x: 70, y: 10 });
    const [pos2, setPos2] = useState({ x: 45, y: 55 });


    const move = (dir) => {
        setPos((prev) => ({
            x: (dir === "left" && (prev.x - UNIT) >= 0) ? prev.x - UNIT : (dir === "right" && (prev.x + UNIT) <= 90) ? prev.x + UNIT : prev.x,
                y: (dir === "up" && (prev.y - UNIT) >= 0) ? prev.y - UNIT :  (dir === "down" && (prev.y + UNIT) <= 170) ? prev.y + UNIT : prev.y,
        }));
    };

    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [touchEndY, setTouchEndY] = useState(0);
    const router = useRouter();

    const minSwipeDistance = 30; // Minimum pixels to qualify as a swipe
    const maxSwipeDistance = 60; // Minimum pixels to qualify as a swipe
    const xmaxSwipeDistance = 90; // Minimum pixels to qualify as a swipe

    const onTouchStart = (e) => {
        setTouchEndX(0); // Reset touch end
        setTouchStartX(e.targetTouches[0].clientX);
        setTouchEndY(0); // Reset touch end
        setTouchStartY(e.targetTouches[0].clientY);
    };

    const onTouchMove = (e) => {
        setTouchEndX(e.targetTouches[0].clientX);
        setTouchEndY(e.targetTouches[0].clientY);
    }

    const onTouchEnd = () => {
        if ((!touchStartX || !touchEndX) && (!touchStartY || !touchEndY)) return;
        const distanceX = touchStartX - touchEndX;
        const distanceY = touchStartY - touchEndY;

        const isLeftSwipeX = distanceX > xmaxSwipeDistance;
        const isRightSwipeX = distanceX < -xmaxSwipeDistance;
        const isUpSwipeX = distanceY > xmaxSwipeDistance;
        const isDownSwipeX = distanceY < -xmaxSwipeDistance;
        if (isLeftSwipeX) {
            move("left");
        }
        if (isRightSwipeX) {
            move("right");
        }
        if (isUpSwipeX) {
            move("up");
        }
        if (isDownSwipeX) {
            move("down");
        }

        const isLeftSwipeM = distanceX > maxSwipeDistance;
        const isRightSwipeM = distanceX < -maxSwipeDistance;
        const isUpSwipeM = distanceY > maxSwipeDistance;
        const isDownSwipeM = distanceY < -maxSwipeDistance;
        if (isLeftSwipeM) {
            move("left");
        }
        if (isRightSwipeM) {
            move("right");
        }
        if (isUpSwipeM) {
            move("up");
        }
        if (isDownSwipeM) {
            move("down");
        }

        const isLeftSwipe = distanceX > minSwipeDistance;
        const isRightSwipe = distanceX < -minSwipeDistance;
        const isUpSwipe = distanceY > minSwipeDistance;
        const isDownSwipe = distanceY < -minSwipeDistance;

        if (isLeftSwipe) {
            move("left");
        }
        if (isRightSwipe) {
            move("right");
        }
        if (isUpSwipe) {
            move("up");
        }
        if (isDownSwipe) {
            move("down");
        }
    };


    useEffect(() => { const timer = setInterval(() => {
        const start = new Date('2025-12-01T00:00:00');     
        const diff = new Date().getTime() - start.getTime();
        setTimeSince({
            d: Math.floor(diff / (1000 * 60 * 60 * 24)),  
            h: Math.floor((diff / (1000 * 60 * 60)) % 24),          
            m: Math.floor((diff / 1000 / 60) % 60),             
            s: Math.floor((diff / 1000) % 60)    
        });                                                        
    }, 1000);                                             
    return () => clearInterval(timer);          
    }, []);

    return (
        <div style={{
            display: "flex",
            flexFlow: "column nowrap",
            height: "100vh",
            width: "100vw"
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}>
        <Image
        src="/home.png"
        width={1000}
        height={2000}
        alt="Description of the image"
        style={{
            position: "absolute",
            height: "100vh",
            width: "100vw",
            zIndex: -1
        }}
        />
        {/* Animated Element */}
        <div style={{
            position: "absolute"
        }}>
        <motion.div
        animate={{ marginLeft: `${pos.x}vw`, marginTop: `${pos.y}vw` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
            width: "11vw",
            height: "19vw",
            background: "blue",
            border: "black",
            marginLeft: "70vw",
            marginTop: "10vw",
            background: "url('/1.png')",
            backgroundSize: "cover",          /* Scales image to cover area */
            backgroundPosition: "center",    /* Centers the image */
            backgroundRepeat: "no-repeat",
        }}
        />
        <motion.b
        animate={{ marginLeft: `${pos.x}vw`, marginTop: `${pos.y}vw` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
            color: "#3737FF",
        }}>
        Mori
        </motion.b>
        </div>

        <div style={{
            position: "absolute"
        }}>
        <motion.div
        animate={{ marginLeft: `${pos2.x}vw`, marginTop: `${pos2.y}vw` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
            width: "11vw",
            height: "19vw",
            background: "blue",
            border: "black",
            marginLeft: "45vw",
            marginTop: "55vw",
            background: "url('/2.png')",
            backgroundSize: "cover",          /* Scales image to cover area */
            backgroundPosition: "center",    /* Centers the image */
            backgroundRepeat: "no-repeat",
        }}
        />
        <motion.b
        animate={{ marginLeft: `${pos2.x}vw`, marginTop: `${pos2.y}vw` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
            color: "#3737FF",
        }}>
        Tanya
        </motion.b>
        </div>

        <div style={{
            position: "absolute",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
        {pos.x}X, {pos.y}Y
        <button style={{
            background: "gray",
            borderRadius: "4vw",
            border: "none",
            padding: "3vw",
            bottom: "21vw",
            position: "fixed",
            fontWeight: 600,
            opacity: "0.7",
            zIndex: 3,
            color: "white",
        }}>
            Stop Coding
        </button>
        {/* Bottom Navigation Live Counter */}
        <div
        style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            width: "73vw",
            height: "70px",
            background: "linear-gradient(90deg, #7c3aed37, #ec489937)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            color: "white",
            fontFamily: "sans-serif",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.25)"
        }}
        >
        <div style={{
            marginRight: "2vw",
            fontWeight: 700,
            fontSize: "4vw",
        }}>
        Tanya is Watching <br/>
        Mori is Coding <br/>
        </div>
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
        }}>
        
        {/* DAYS */}
        <div style={{textAlign:"center"}}>
        <div style={{fontSize:"18px",fontWeight:"bold"}}>
        {timeSince.d}
        </div>
        <div style={{fontSize:"10px",opacity:0.8}}>
        DAYS
        </div>
        </div>

        <div style={{fontSize:"18px"}}>:</div>

        {/* HOURS */}
        <div style={{textAlign:"center"}}>
        <div style={{fontSize:"18px",fontWeight:"bold"}}>
        {timeSince.h}
        </div>
        <div style={{fontSize:"10px",opacity:0.8}}>
        HRS
        </div>
        </div>

        <div style={{fontSize:"18px"}}>:</div>

        {/* MINUTES */}
        <div style={{textAlign:"center"}}>
        <div style={{fontSize:"18px",fontWeight:"bold"}}>
        {timeSince.m}
        .{Math.round((timeSince.s/60)*100)}
        </div>
        <div style={{fontSize:"10px",opacity:0.8}}>
        MINS
        </div>
        </div>

        </div>

        </div>
        </div>
        </div>
    );
}

