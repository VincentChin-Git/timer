import React from "react";

const Triangle = ({ direction, color }) => {
    const styles = {
        width: '20px',
        height: '10px',
        margin: "0.25rem 0",
        padding: 0,
        borderStyle: "solid",
        borderWidth: "0 0.75rem 0.75rem 0.75rem",
        borderColor: `${color} transparent transparent transparent`,
        color: color
    };

    if (direction === "up") {
        styles.borderWidth = "0.75rem 0.75rem 0 0.75rem";
        styles.borderColor = `transparent transparent ${color} transparent`;
    } else if (direction === "down") {
        styles.borderWidth = "0 0.75rem 0.75rem 0.75rem";
        styles.borderColor = `${color} transparent transparent transparent`;
    }

    return <div style={styles}>1</div>;
}

export default Triangle;
