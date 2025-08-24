import React, { useState, useRef } from "react";

const technologies = ["JavaScript", "Python", "Java", "CSharp", "Cpp", "C", "Scratch", "Rust", "ASM"];

export default function ChangeProgrammer() {
    const [devs, setDevs] = useState([]);
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(null);
    const [editVardas, setEditVardas] = useState("Iveskite Varda");
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedTech, setSelectedTech] = useState([]);
    const nameRef = useRef();

    const editNameRef = useRef();
    const editLatRef = useRef();
    const editLngRef = useRef();
    const editLaisvasRef = useRef();

    const handleSearch = async (e) => {
        e.preventDefault();
        setMessage("");
        const username = nameRef.current.value;
        try {
            const res = await fetch(`/api/by_name/${username}`);
            const data = await res.json();
            if (res.ok) {
                setDevs(data);
                setMessage(`${data.length} developers found.`);
            } else {
                setMessage(data.error || "Įvyko klaida");
            }
        } catch {
            setMessage("Serverio klaida");
        }
    };

    const handleEditClick = (id, vardas) => {
        setEditId(id);
        setEditVardas(`Edit user: ${vardas}`);
        setShowEditForm(true);
        setMessage("");
    };

    const handleTechChange = (e) => {
        const value = e.target.value;
        setSelectedTech((prev) => (e.target.checked ? [...prev, value] : prev.filter((t) => t !== value)));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        const vardas = editNameRef.current.value;
        const lat = editLatRef.current.value;
        const lng = editLngRef.current.value;
        const laisvas = editLaisvasRef.current.checked;
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
            const res = await fetch(`/api/programuotojai/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Developer updated successfully.");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setMessage(data.error || "Įvyko klaida");
            }
        } catch {
            setMessage("Serverio klaida");
        }
    };

    return (
        <div>
            <h1 className="title">Programuotojai API</h1>
            <div id="error-div" className="bg-white">
                {message}
            </div>
            <div id="homepage">
                <h2>Redaguoti programuotoją</h2>
                <div id="devs">
                    {!showEditForm && (
                        <div id="dev-container">
                            <form onSubmit={handleSearch} id="search">
                                <h3>PAIESKA PAGAL VARDA</h3>
                                <hr />
                                <input type="text" ref={nameRef} placeholder="Vardas" required name="username" />
                                <button type="submit">Paieska</button>
                            </form>
                            <div id="search-results">
                                {devs.map((item) => (
                                    <div key={item._id}>
                                        <div className="div1">
                                            <div className="div2">
                                                <p>
                                                    <strong>Name:</strong> {item.vardas}
                                                </p>
                                                <p>
                                                    <strong>Technologies:</strong> {item.tech.join(", ")}
                                                </p>
                                                <p>
                                                    <strong>Location:</strong> {item.location.coordinates[1]}, {item.location.coordinates[0]}
                                                </p>
                                                <p>
                                                    <strong>Available:</strong> {item.laisvas ? "Yes" : "No"}
                                                </p>
                                            </div>
                                            <button className="btn btn-primary" onClick={() => handleEditClick(item._id, item.vardas)}>
                                                Edit
                                            </button>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {showEditForm && (
                        <div>
                            <h3 style={{ textAlign: "center" }}>{editVardas}</h3>
                            <form id="search" onSubmit={handleEditSubmit} className="d-flex flex-column gap-3">
                                <div>
                                    <label>Vardas:</label>
                                    <br />
                                    <input type="text" ref={editNameRef} placeholder="Vardas" required name="username" />
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
                                    <input type="number" name="lat" ref={editLatRef} placeholder="platuma" required className="mt-0 p-2 mb-0" />
                                </div>
                                <div>
                                    <label>Ilguma:</label>
                                    <input type="number" name="lng" ref={editLngRef} placeholder="ilguma" required className="mt-0 p-2 mb-0" />
                                </div>
                                <div>
                                    <label>laisvas:</label>
                                    <input type="checkbox" ref={editLaisvasRef} name="laisvas" />
                                </div>
                                <input type="submit" value="Redaguoti" />
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
