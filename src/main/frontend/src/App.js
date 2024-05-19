import "milligram";
import './App.css';
import {useState, useEffect} from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm"
import UserPanel from "./UserPanel";

function App() {
    const [loggedIn, setLoggedIn] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && typeof storedUser === 'string') {
            console.log(storedUser);
            setLoggedIn(storedUser)
        }
    }, []);

    async function handleLogin(email) {
        if (email) {
             const response = await fetch(`/api/participants/${email}`, {
                 method: 'GET',
                 headers: { 'Content-Type': 'application/json' }
             });

            if (response.ok) {
                localStorage.setItem('user', email)
                setLoggedIn(email);
            } else {
                alert('Nie znaleziono użytkownika o podanym e-mailu. Zarejestruj się.')
            }
        }
    }

    async function handleRegister(email) {
        if (email) {
             const response = await fetch(`/api/participants/${email}`, {
                 method: 'GET',
                 headers: { 'Content-Type': 'application/json' }
             });

            if (response.ok) {
                alert('Podany użytkownik już istnieje. Zaloguj się.')
            } else {
                 const response = await fetch('/api/participants', {
                     method: 'POST',
                     body: JSON.stringify({'login':email, 'password': '12345'}),
                     headers: { 'Content-Type': 'application/json' }
                 });

                 if (response.ok) {
                     setLoggedIn(email);
                     localStorage.setItem('user', email)
                 }
            }
        }
    }

    function logout() {
        setLoggedIn('');
        localStorage.setItem('user', '')
    }

    return (
        <div>
            <h1>System do zapisów na zajęcia</h1>
            {loggedIn ? <UserPanel username={loggedIn} onLogout={logout}/> : <><LoginForm onLogin={handleLogin}/><RegisterForm onRegister={handleRegister}/></>}
        </div>
    );
}

export default App;
