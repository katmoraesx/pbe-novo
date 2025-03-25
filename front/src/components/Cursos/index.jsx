import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "./Curso.css";

export default function Curso() {
    const [cursos, setCursos] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/cursos", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCursos(response.data);
            } catch (error) {
                console.error("Erro ao buscar cursos:", error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="curso-container">
            <h1>Cursos</h1>
            <div className="lista-cursos">
                {cursos.map((curso) => (
                    <div key={curso.id} className="curso">
                        <span>{curso.nome}</span>
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
