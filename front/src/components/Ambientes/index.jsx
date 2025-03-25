import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "./Ambiente.css";

export default function Ambiente() {
    const [ambientes, setAmbientes] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/ambientes", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAmbientes(response.data);
            } catch (error) {
                console.error("Erro ao buscar ambientes:", error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="ambiente-container">
            <h1>Ambientes</h1>
            <div className="lista-ambientes">
                {ambientes.map((ambiente) => (
                    <div key={ambiente.id} className="ambiente">
                        <span>{ambiente.nome}</span>
                        <FaEdit />
                        <FaTrash />
                    </div>
                ))}
            </div>
            <div className="footer">
                <FaPlus />
            </div>
        </div>
    );
}
