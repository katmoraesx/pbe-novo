import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import './styles.css'; // Importa o arquivo de estilos

const Disciplinas = () => {
    const [disciplinas, setDisciplinas] = useState([]);
    // const [token, setToken] = useState(localStorage.getItem('token')); // ou de outro local que você armazene o token
    const token = localStorage.getItem('token')

    const [up, setUp] = useState(false); // Para atualizar os dados se necessário
    const [modalOpen, setModalOpen] = useState(false); // Controle do modal de criação/edição
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
    const [texto, setTexto] = useState(''); // Para busca de disciplinas

    useEffect(() => {
        if (!token) return; // Se não tiver token, não faz a requisição
    
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/disciplinas', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDisciplinas(response.data);
                console.log('Disciplinas:', response.data);
            } catch (error) {
                console.error('Erro ao buscar disciplinas:', error);
            }
        };
    
        fetchData();
    }, [token, up]); // Dependências: token e up
    




    

    const apagar = async (id) => {
        if (window.confirm('Tem certeza?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/disciplinas/id/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDisciplinas(disciplinas.filter((disciplina) => disciplina.id !== id));
            } catch (error) {
                console.error('Erro ao apagar disciplina:', error);
            }
        }
    };
    




    const criar = async (novaDisciplina) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/disciplinas/', novaDisciplina, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDisciplinas([...disciplinas, response.data]);
            setModalOpen(false);
            setUp(!up); // Atualiza a lista
        } catch (error) {
            console.error('Erro ao criar disciplina:', error);
        }
    };

    


    

    const atualizar = async (disciplina) => {
        console.log("X: ", disciplina)
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/disciplinas/id/${disciplina.id}`, disciplina, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDisciplinas(disciplinas.map((d) => (d.id === disciplina.id ? disciplina : d)));
            setModalOpen(false);
            setUp(!up); // Atualiza a lista
        } catch (error) {
            console.error('Erro ao atualizar disciplina:', error);
        }
    };
    




    const search = async (texto) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/disciplinas/search/?search=${texto}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDisciplinas(response.data);
        } catch (error) {
            console.error('Erro ao buscar disciplinas:', error);
        }
    };
    

    return (
        <div className="disciplinas-container">
            <h1>Disciplinas</h1>

            <div className="pesquisar">
                <input
                    placeholder="Buscar disciplina"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />
                <FaSearch className="procurar" onClick={() => search(texto)} />
            </div>

            {disciplinas.length === 0 ? (
                <p>Não há disciplinas cadastradas.</p>
            ) : (
                <table className="disciplinas-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Sigla</th>
                            <th>Curso</th>
                            <th>Carga Horária</th>
                            <th>Professor Responsável</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disciplinas.map((disciplina) => (
                            <tr key={disciplina.id}>
                                <td>{disciplina.nome}</td>
                                <td>{disciplina.sigla}</td>
                                <td>{disciplina.curso}</td>
                                <td>{disciplina.carga_horaria} horas</td>
                                <td>{disciplina.professor_responsavel}</td>
                                <td>
                                    <FaEdit onClick={() => { setModalOpen(true); setDisciplinaSelecionada(disciplina.id); }} />
                                    <FaTrash onClick={() => apagar(disciplina.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="footer">
                <FaPlus onClick={() => { setModalOpen(true); setDisciplinaSelecionada(null); }} />
            </div>

            {modalOpen && (
                <ModalDisciplinas
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    disciplinaSelecionada={disciplinaSelecionada}
                    criar={criar}
                    atualizar={atualizar}
                />
            )}
        </div>
    );
};

const ModalDisciplinas = ({ isOpen, onClose, disciplinaSelecionada, criar, atualizar }) => {
    const [disciplina, setDisciplina] = useState({
        id: null,
        nome: '',
        sigla: '',
        curso: 'DS', // Default para DS (Desenvolvimento de Software)
        carga_horaria: '',
        professor_responsavel: '',
    });

    useEffect(() => {
        if (disciplinaSelecionada) {
            setDisciplina(disciplinaSelecionada);
        }
    }, [disciplinaSelecionada]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (disciplina.id) {
            atualizar(disciplina);
        } else {
            criar(disciplina);
        }
    };

    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>{disciplina.id ? 'Editar Disciplina' : 'Adicionar Nova Disciplina'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Nome da Disciplina"
                            value={disciplina.nome}
                            onChange={(e) => setDisciplina({ ...disciplina, nome: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Sigla"
                            value={disciplina.sigla}
                            onChange={(e) => setDisciplina({ ...disciplina, sigla: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Professor Responsável"
                            value={disciplina.professor_responsavel}
                            onChange={(e) => setDisciplina({ ...disciplina, professor_responsavel: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Carga Horária"
                            value={disciplina.carga_horaria}
                            onChange={(e) => setDisciplina({ ...disciplina, carga_horaria: e.target.value })}
                            required
                        />
                        <button type="submit">{disciplina.id ? 'Atualizar' : 'Criar'}</button>
                    </form>
                </div>
            </div>
        )
    );
};

export default Disciplinas;
