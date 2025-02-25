import React, { useEffect, useState } from 'react';

function Note({ note, onDelete }) {
    const [visible, setVisible] = useState(false);
    const date = new Date(note.created_at).toLocaleDateString("en-IN");

    useEffect(() => {
        setVisible(true);
    }, []);

    const handleDelete = () => {
        setVisible(false);
        setTimeout(() => {
            onDelete(note.id);
        }, 500); // Match the duration of the transition
    };

    return (
        <div className={`bg-gray-100 p-6 rounded-lg shadow-md mb-4 transition-opacity duration-500 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="relative">
                <p className="text-xl font-bold text-gray-800 mb-2">{note.title}</p>
                <p className="text-gray-700 mb-4">{note.content}</p>
                <p className="text-sm text-gray-500 mb-4">{date}</p>
                <button 
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Note;