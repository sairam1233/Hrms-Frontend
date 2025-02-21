import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children, role }) => {
    const token = Cookies.get('token'); // Retrieve the token from cookies.

    if (!token) {
        // If no token exists, clear cookies and redirect to the login page.
        Cookies.remove('token');
        Cookies.remove('username');
        alert('Your session has expired. Please log in again.');
        return <Navigate to="/" />;
    }

    let decodedToken;
    console.log('Token:', token); // Debugging: Log the token to the console.
    try {
        // Decode the token to extract user details (e.g., role).
        decodedToken = jwtDecode(token);
    } catch (error) {
        // Handle invalid or corrupted token scenarios.
        console.error('Invalid token:', error);
        Cookies.remove('token');
        Cookies.remove('username');
        alert('Invalid session. Please log in again.');
        return <Navigate to="/" />;
    }

    const userRole = decodedToken.role; // Extract the role from the decoded token.
    console.log(userRole); // Debugging: Log the user role to the console.

    if (role && userRole !== role) {
        // Check if the user's role matches the required role for this route.
        alert('You do not have permission to view this page.');
        Cookies.remove('token');
        Cookies.remove('username');
        return <Navigate to="/unauthorized" />;
    }

    // If everything is valid, render the protected child components.
    return children;
};

export default ProtectedRoute;
