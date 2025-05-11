// Example: Admin dashboard component
import React from 'react';
import { useSocket } from './SocketContext';

const AdminDashboard = () => {
    const { notifications } = useSocket();

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <h3>Notifications:</h3>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;