import React, {useState} from "react";

export const Countdown = ({from}) => {
    const [count, setCount] = useState(from);
    setTimeout(() => {
        if (count > 0) {
            setCount(count - 1);
        }
    }, 1000);
    return (
        <h1>{count}</h1>
    )
};
