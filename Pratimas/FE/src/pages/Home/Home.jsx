import React, { useState, useRef } from "react";

function Devs() {
    const [devs, setDevs] = useState([]);
    const lngRef = useRef();
    const latRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const lng = lngRef.current.value;
        const lat = latRef.current.value;

        try {
            const response = await fetch(`/api/programuotojai/?lng=${lng}&lat=${lat}`);
            if (!response.ok) throw new Error("Network response was not ok");
            const json = await response.json();
            setDevs(json);
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };

    return (
        <div id="dev-container">
            <form id="search" onSubmit={handleSubmit}>
                <label>Ilguma:</label>
                <input type="number" ref={lngRef} placeholder="ilguma" required />
                <label>Platuma:</label>
                <input type="number" ref={latRef} placeholder="platuma" required />
                <input type="submit" value="Rasti programuotojus" />
            </form>
            <ul>
                {devs.map((dev, index) => (
                    <li key={index}>
                        <span className={dev.laisvas ? "free" : "busy"}></span>
                        <span className="name">{dev.vardas}</span>
                        <span className="rank">{dev.tech.join(", ")}</span>
                        <span className="dist">{Math.floor(dev.distance / 1000)} km</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Home() {
    return (
        <div>
            <h1 className="title">Programuotojai API</h1>
            <div id="homepage">
                <h2>Surask programuotoją šalia savęs!</h2>
                <Devs />
            </div>
        </div>
    );
}
