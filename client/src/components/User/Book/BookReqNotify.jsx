// Example: In a component where a user requests a book
import React from 'react';
import { useSocket } from './SocketContext';

const BookRequestComponent = ({ bookTitle }) => {
    const { socket } = useSocket();

    const handleRequestBook = () => {
        if (socket) {
            socket.emit('newBookRequest', { bookTitle: bookTitle, user: 'CurrentUser' }); // Replace 'CurrentUser' with the actual user
            console.log('Book request emitted');
        } else {
            console.log('Socket not connected');
        }
    };

    return (
        <button onClick={handleRequestBook}>Request Book</button>
    );
};

export default BookRequestComponent;
