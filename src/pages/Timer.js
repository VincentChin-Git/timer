import React, { useEffect, useState } from "react";
import '../assets/Timer.css'

const Timer = (props) => {
    const [time, setTime] = useState({
        minutes: 45,
        seconds: 0,
        going: false,
    })

    const showTime = (number) => {
        number = parseInt(number);
        if (number > 9) {
            number += '';
        }
        else {
            number = '0' + number;
        }
        return number;
    }

    const changeMinute = (type) => {
        if (type === '+' && time.minutes < 59) {
            setTime(prev => { return { ...prev, minutes: prev.minutes + 1 } })
        }
        else if (type === '-' && time.minutes > 0) {
            setTime(prev => { return { ...prev, minutes: prev.minutes - 1 } })
        }
    }

    const changeSeconds = (type) => {
        if (type === '+' && time.seconds < 59) {
            setTime(prev => { return { ...prev, seconds: prev.seconds + 1 } })
        }
        else if (type === '+' && time.seconds === 59 && time.minutes < 59) {
            setTime(prev => { return { ...prev, seconds: 0, minutes: prev.minutes + 1 } })
        }
        else if (type === '-' && time.seconds > 0) {
            setTime(prev => { return { ...prev, seconds: prev.seconds - 1 } })
        }
        else if (type === '-' && time.seconds === 0 && time.minutes > 0) {
            setTime(prev => { return { ...prev, seconds: 59, minutes: prev.minutes - 1 } })
        }
    }

    useEffect(() => {
        let timer = null
        if (time.going) {
            timer = setTimeout(() => {
                let seconds = time.seconds;
                let minutes = time.minutes;
                let going = true;
                if (seconds === 0 && minutes > 0) {
                    seconds = 59;
                    minutes--;
                }
                else if (seconds > 0) {
                    seconds--;
                }
                else if (seconds === 0 && minutes === 0) {
                    going = false;
                }
                setTime({
                    minutes,
                    seconds,
                    going
                })
            }, 1000)
        }

        return () => {
            clearTimeout(timer)
        }
    }, [time.going, time.minutes, time.seconds])

    return (
        <div className="timer">
            <div className="timer-display">
                {showTime(time.minutes)} : {showTime(time.seconds)}
            </div>
            <div className="timer-controls">
                <div className="timer-input">
                    <button
                        disabled={time.going}
                        className="timer-button"
                        onClick={() => changeMinute('-')}
                    >
                        -
                    </button>
                    <span className="timer-input-label">Minutes</span>
                    <button
                        className="timer-button"
                        onClick={() => changeMinute('+')}
                        disabled={time.going}
                    >
                        +
                    </button>
                </div>

                {!time.going &&
                    <button className="timer-button" onClick={() => setTime(prev => { return { ...prev, going: true } })}>
                        Start
                    </button>
                }
                {time.going &&
                    <button className="timer-button" onClick={() => setTime(prev => { return { ...prev, going: false } })}>
                        Pause
                    </button>
                }
                <button className="timer-button" onClick={() => setTime({ minutes: 45, seconds: 0, going: false })}>
                    Reset
                </button>
                <div className="timer-input">
                    <button
                        className="timer-button"
                        onClick={() => changeSeconds('-')}
                        disabled={time.going}
                    >
                        -
                    </button>
                    <span className="timer-input-label">Seconds</span>
                    <button
                        className="timer-button"
                        onClick={() => changeSeconds('+')}
                        disabled={time.going}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Timer