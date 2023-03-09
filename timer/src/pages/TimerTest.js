import React, { useState, useEffect } from "react";
import "../assets/TimerTest.css";

const TimerTest = () => {
    const [time, setTime] = useState({ minutes: 0, seconds: 60 });
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;

        if (isActive && time.minutes === 0 && time.seconds === 0) {
            setIsActive(false);
        } else if (isActive) {
            interval = setInterval(() => {
                if (time.seconds === 0) {
                    setTime((time) => ({ ...time, minutes: time.minutes - 1, seconds: 59 }));
                } else {
                    setTime((time) => ({ ...time, seconds: time.seconds - 1 }));
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    const handleReset = () => {
        setIsActive(false);
        setTime({ minutes: 0, seconds: 60 });
    };

    const handleStart = () => {
        setIsActive(true);
    };

    const handlePause = () => {
        setIsActive(false);
    };

    const handleAddMinutes = () => {
        setTime((time) => ({ ...time, minutes: time.minutes + 1 }));
    };

    const handleMinusMinutes = () => {
        setTime((time) => ({ ...time, minutes: time.minutes - 1 }));
    };

    const handleAddSeconds = () => {
        setTime((time) => ({ ...time, seconds: time.seconds + 1 }));
    };

    const handleMinusSeconds = () => {
        setTime((time) => ({ ...time, seconds: time.seconds - 1 }));
    };

    const formatTime = () => {
        const minutes = time.minutes.toString().padStart(2, "0");
        const seconds = time.seconds.toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="timer">
            <div className="timer-display">{formatTime()}</div>
            <div className="timer-controls">
                {!isActive && (
                    <button className="timer-button" onClick={handleStart}>
                        Start
                    </button>
                )}
                {isActive && (
                    <button className="timer-button" onClick={handlePause}>
                        Pause
                    </button>
                )}
                <button className="timer-button" onClick={handleReset}>
                    Reset
                </button>
            </div>
            <div className="timer-inputs">
                <div className="timer-input">
                    <button className="timer-button" onClick={handleAddMinutes}>
                        +
                    </button>
                    <button className="timer-button" onClick={handleMinusMinutes}>
                        -
                    </button>
                </div>
                <div className="timer-input">
                    <button className="timer-button" onClick={handleAddSeconds}>
                        +
                    </button>
                    <button className="timer-button" onClick={handleMinusSeconds}>
                        -
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimerTest;
