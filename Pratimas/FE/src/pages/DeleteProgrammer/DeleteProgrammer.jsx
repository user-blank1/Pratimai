import React, { useState, useRef } from "react";

export default function DeleteProgrammer() {
    const [devs, setDevs] = useState([]);
    const [message, setMessage] = useState("");
    const nameRef = useRef();

    // Search for programmers by name
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

    // Delete programmer by id
    const handleDelete = async (id, vardas) => {
        try {
            const res = await fetch(`/api/programuotojai/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) {
                setMessage(`Programuotojas ${vardas} ištrintas sėkmingai.`);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                const data = await res.json();
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
                <h2>trinti programuotoją</h2>
                <div id="devs">
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
                                        <button className="btn btn-danger" onClick={() => handleDelete(item._id, item.vardas)}>
                                            Delete
                                        </button>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
