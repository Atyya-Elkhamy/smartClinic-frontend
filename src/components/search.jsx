import React from "react";
import earthyTones from "../colors";

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "32px auto",
        maxWidth: "500px",
        background: earthyTones.beige,
        borderRadius: "8px",
        boxShadow: `0 2px 8px ${earthyTones.mocha}22`,
        padding: "12px 18px",
    },
    input: {
        flex: 1,
        padding: "10px 14px",
        border: `1px solid ${earthyTones.mocha}`,
        borderRadius: "6px 0 0 6px",
        fontSize: "1rem",
        outline: "none",
        background: earthyTones.light,
        color: earthyTones.clay,
    },
    button: {
        background: earthyTones.brown,
        color: "#fff",
        border: "none",
        borderRadius: "0 6px 6px 0",
        padding: "10px 24px",
        fontWeight: 600,
        fontSize: "1rem",
        cursor: "pointer",
        boxShadow: `0 1px 4px ${earthyTones.mocha}22`,
        transition: "background 0.2s",
    },
};

const SearchBar = () => {
    return (
        <div style={styles.container}>
            <input
                type="search"
                style={styles.input}
                placeholder="Search..."
                aria-label="Search"
            />
            <button style={styles.button} type="button">
                Search
            </button>
        </div>
    );
};

export default SearchBar;
