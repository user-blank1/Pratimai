import React, { useRef, useState } from "react";

const technologies = ["JavaScript", "Python", "Java", "CSharp", "Cpp", "C", "Scratch", "Rust", "ASM"];

export default function AddProgrammer() {
    const nameRef = useRef();
    const latRef = useRef();
    const lngRef = useRef();
    const laisvasRef = useRef();
    const [selectedTech, setSelectedTech] = useState([]);
    const [message, setMessage] = useState("");

    const handleTechChange = (e) => {
        const value = e.target.value;
        setSelectedTech((prev) => (e.target.checked ? [...prev, value] : prev.filter((t) => t !== value)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        const vardas = nameRef.current.value;
        const lat = latRef.current.value;
        const lng = lngRef.current.value;
        const laisvas = laisvasRef.current.checked;
        const location = {
            type: "Point",
            coordinates: [parseFloat(lat), parseFloat(lng)],
        };
        const body = {
            vardas,
            tech: selectedTech,
            laisvas,
            location,
        };

        try {
            const res = await fetch("/api/programuotojai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage(`Programuotojas Pridetas: ${data.dev}`);
            } else {
                setMessage(data.error || "Įvyko klaida");
            }
        } catch (error) {
            setMessage(`Serverio klaida:${error}`);
        }
    };

    return (
        <div>
            <h1 className="title">Programuotojai API</h1>
            <div id="error-div" className="bg-white">
                {message}
            </div>
            <div id="homepage">
                <h2>Pridėti programuotoją</h2>
                <div id="devs">
                    <div id="dev-container">
                        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                            <div>
                                <label>Vardas:</label>
                                <br />
                                <input type="text" ref={nameRef} placeholder="Vardas" required name="username" />
                            </div>
                            <div>
                                <label>Technologijos:</label>
                                <br />
                                <div className="d-flex flex-column gap-2 shadow-lg p-2 align-items-start" style={{ maxHeight: "200px", overflowY: "auto" }}>
                                    {technologies.map((tech) => (
                                        <div key={tech} className="d-flex justify-content-center align-items-center gap-4">
                                            <input
                                                type="checkbox"
                                                name="technology"
                                                value={tech}
                                                checked={selectedTech.includes(tech)}
                                                onChange={handleTechChange}
                                            />
                                            <p className="m-0 p-0">{tech === "Cpp" ? "C++" : tech}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label>Platuma:</label>
                                <input type="number" name="lat" ref={latRef} placeholder="platuma" required className="mt-0 p-2 mb-0" />
                            </div>
                            <div>
                                <label>Ilguma:</label>
                                <input type="number" name="lng" ref={lngRef} placeholder="ilguma" required className="mt-0 p-2 mb-0" />
                            </div>
                            <div>
                                <label>laisvas:</label>
                                <input type="checkbox" ref={laisvasRef} name="laisvas" />
                            </div>
                            <input type="submit" value="Pridėti" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
