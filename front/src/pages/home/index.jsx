import React, { useState, useEffect } from "react"
import axios from "axios"
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import './styles.css'
import ModalProfessores from "../../components/modal";
import Head from '../../components/head/index.jsx'
import Footer from '../../components/footer/index'

export default function Home() {
    const [dados, setDados] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('token')
    const [professorSelecionado, setProfessorSelecionado] = useState(null)
    const [texto, setTexto] = useState('')
    const [up, setUp] = useState(false)

    useEffect(() => {

        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/professores", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDados(response.data);
                console.log("Response Data:", response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, [up]);

    const atualizar = async (professorSelecionado) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/id/${professorSelecionado.id}`,
                {
                    ni: professorSelecionado.ni,
                    nome: professorSelecionado.nome,
                    email: professorSelecionado.email,
                    cel: professorSelecionado.cel,
                    ocup: professorSelecionado.ocup
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            setDados(dados.map((professor) => professor.id === professorSelecionado.id ? professorSelecionado : professor))
            setModalOpen(false)
        } catch (error) {
            console.error(error)
        }

    }

    const apagar = async (id) => {
        if (window.confirm("Tem certeza? ")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/id/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setDados(dados.filter(professor => professor.id !== id))
            }

            catch (error) {
                console.error(error)
            }
        }


    }


    const criar = async (novoProfessor) => {
        console.log("novoProfessor: ", novoProfessor)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/professores',
                {
                    ni: novoProfessor.ni,
                    nome: novoProfessor.nome,
                    email: novoProfessor.email,
                    cel: novoProfessor.cel,
                    ocup: novoProfessor.ocup
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setDados([...dados, novoProfessor])
            setModalOpen(false)
        } catch (error) {

        }
    }


    const search = async (texto) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/search/?search=${texto}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setProfessorSelecionado(response.data[0])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container-home">
            <h1>Home</h1>
        </div>
    );
}