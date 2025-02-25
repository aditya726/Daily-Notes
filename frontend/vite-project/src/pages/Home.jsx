import React, { useState, useEffect } from 'react';
import api from '../api';
import Note from '../components/Note';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api.get("/api/Notes/")
            .then((response) => response.data)
            .then((data) => setNotes(data))
            .catch((error) => alert(error));
    };

    const deleteNotes = (id) => {
        api.delete(`/api/Notes/delete/${id}`)
            .then((response) => {
                if (response.status === 204) {
                    alert("Note was deleted successfully");
                    setNotes(notes.filter(note => note.id !== id));
                } else {
                    alert("Failed to delete Note");
                }
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api.post('/api/Notes/', { content, title })
            .then((response) => {
                if (response.status === 201) {
                    alert("Note Created successfully");
                    getNotes();
                } else {
                    alert("Failed to create Note");
                }
            })
            .catch((error) => {
                alert(error);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        navigate('/login');
    };

    return (
        <div className='container mx-auto p-4'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-3xl font-bold text-center mb-6'>My Notebook</h2>
                <button 
                    onClick={handleLogout}
                    className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                >
                    Logout
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNotes} key={note.id} />
                ))}
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md border-2 border-dashed border-gray-300'>
                <form onSubmit={createNote}>
                    <label htmlFor='title' className='block text-sm font-medium text-gray-700'>Title:</label>
                    <input
                        type='text'
                        name='title'
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                        value={title}
                    />
                    <label htmlFor='content' className='block text-sm font-medium text-gray-700 mt-4'>Content:</label>
                    <textarea
                        name='content'
                        required
                        onChange={(e) => setContent(e.target.value)}
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                        value={content}
                    ></textarea>
                    <input
                        type='submit'
                        value='Submit'
                        className='mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    />
                </form>
            </div>
        </div>
    );
}

export default Home;