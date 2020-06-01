import React, { useReducer, useEffect, useRef } from "react";

const reducer = (currentState, newState) => ({ ...currentState, ...newState });

const useStopwatch = () => {
    const [{ running, lapse }, setState] = useReducer(reducer, {
        running: false,
        lapse: 0
    });

    const intervalRef = useRef(null);

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    function handleRunClick() {
        if (running) {
            clearInterval(intervalRef.current);
        } else {
            const startTime = Date.now() - lapse;
            intervalRef.current = setInterval(() => {
                setState({ lapse: Date.now() - startTime });
            }, 0);
        }
        setState({ running: !running });
    }

    function handleClearClick() {
        clearInterval(intervalRef.current);
        setState({ running: false, lapse: 0 });
    }

    return { handleRunClick, handleClearClick, running, lapse };
};

function parseTime(time,type) {
    if(type==='type1') {
        const milliseconds = window.parseInt((time % 1000) / 10);
        const seconds = Math.floor(((time / 1000) % 60)/10)%10*10;
        const minutes = Math.floor((time / (1000 * 60)) % 60);

        const [m,s,ms] = [minutes, seconds,milliseconds].map(i =>
            String(i).padStart(2, "0")
        );
        return `${m}:${s}.${ms}`;
    }
    else if (type==='type2'){
        const milliseconds = window.parseInt(time % 1000);
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);

        const [m, s ] = [minutes, seconds].map(i =>
            String(i).padStart(2, "0")
        );
        const [mss] = [milliseconds].map(i =>
            String(i).padStart(3, "0")
        );
        return `${m}:${s}:${mss}`;
    }
    else if (type==='type3'){
        const milliseconds = window.parseInt(time % 1000);
        const seconds = ((((time / 1000) % 60)/0.1)/10).toFixed(1);
        const minutes = Math.floor((time / (1000 * 60)) % 60);

        const m=String(minutes).padStart(2,"0");
        const ss=String(seconds).padStart(3,"1");
        const mss=String(milliseconds).padStart(3,"0");

        return `${m}:${ss}:${mss}`;
    }
}

function parseTotalTime(time) {
    const milliseconds = window.parseInt(time % 1000);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);

    const [ m, s] = [minutes, seconds, milliseconds].map(i =>
        String(i).padStart(2, "0")
    );
    const ms = String(milliseconds).padStart(3,"0");
    return `${m}:${s}.${ms}`;
}

function Timer() {
    const stopwatchOne = useStopwatch();
    const stopwatchTwo = useStopwatch();
    const stopwatchThree = useStopwatch();

    return (
        <div style={{ textAlign: "center" }}>
            <label
                style={{
                    fontSize: "2em",
                    display: "block"
                }}
            >
                <div>{parseTime(stopwatchOne.lapse,'type1')}</div>
            </label>
            <button onClick={stopwatchOne.handleRunClick} style={buttonStyles}>
                {stopwatchOne.running ? "Pause" : "Start"}
            </button>
            <button onClick={stopwatchOne.handleClearClick} style={buttonStyles}>
                Clear
            </button>

            <label
                style={{
                    fontSize: "2em",
                    display: "block"
                }}
            >
                <div>{parseTime(stopwatchTwo.lapse,'type2')}</div>
            </label>
            <button onClick={stopwatchTwo.handleRunClick} style={buttonStyles}>
                {stopwatchTwo.running ? "Pause" : "Start"}
            </button>
            <button onClick={stopwatchTwo.handleClearClick} style={buttonStyles}>
                Clear
            </button>
            <label
                style={{
                    fontSize: "2em",
                    display: "block"
                }}
            >
                <div>{parseTime(stopwatchThree.lapse,'type3')}</div>
            </label>
            <button onClick={stopwatchThree.handleRunClick} style={buttonStyles}>
                {stopwatchThree.running ? "Pause" : "Start"}
            </button>
            <button onClick={stopwatchThree.handleClearClick} style={buttonStyles}>
                Clear
            </button>
            <hr />
            <strong>Total Timer</strong>
            <br />
            <div>{parseTotalTime(stopwatchOne.lapse+stopwatchTwo.lapse+stopwatchThree.lapse)}</div>
            {/*<span>{(stopwatchOne.lapse) + stopwatchTwo.lapse + stopwatchThree.lapse}ms</span>*/}
            <hr />
        </div>
    );
}

const buttonStyles = {
    border: "1px solid #ccc",
    background: "#fff",
    fontSize: "1em",
    padding: 10,
    margin: 5,
    width: 200
};

export default Timer;

