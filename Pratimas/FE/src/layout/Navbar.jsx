import React from "react";

function Navbar() {
    return (
        <nav>
            <ul className="d-flex justify-content-around">
                <li className="p-1">
                    <a href="/">Home</a>
                </li>
                <li className="p-1">
                    <a href="/addProgrammer">Add Programmer</a>
                </li>
                <li className="p-1">
                    <a href="/changeProgrammer">Change Programmer</a>
                </li>
                <li className="p-1">
                    <a href="/deleteProgrammer">Delete Programmer</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
