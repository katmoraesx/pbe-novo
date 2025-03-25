import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import "./Turma.css";

export default function Turma() {
    const [turmas, setTurmas] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [turmaSelecionada, setTurmaSelecionada] = useState(null);
    const [texto, setTexto] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/turmas", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTurmas(response.data);
            } catch (error) {
                console.error("Erro ao buscar turmas:", error);
            }
        };

        fetchData();
    }, [token]);

    const apagar = async (id) => {
        if (window.confirm("Tem certeza?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/turmas/id/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTurmas(turmas.filter((turma) => turma.id !== id));
            } catch (error) {
                console.error("Erro ao apagar turma:", error);
            }
        }
    };

    return (
        <div className="turma-container">
            <h1>Turmas</h1>
            <div className="pesquisar">
                <input
                    placeholder="Buscar turma"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />
                <FaSearch className="procurar" />
            </div>
            <div className="lista-turmas">
                {turmas.map((turma) => (
                    <div key={turma.id} className="turma">
                        <span>{turma.nome}</span>
                        <FaEdit onClick={() => { setModalOpen(true); setTurmaSelecionada(turma); }} />
                        <FaTrash onClick={() => apagar(turma.id)} />
                    </div>
                ))}
            </div>
            <div className="footer">
                <FaPlus onClick={() => { setModalOpen(true); setTurmaSelecionada(null); }} />
            </div>
        </div>
    );
}
