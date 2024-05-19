import "milligram";
import './App.css';
import {useState, useEffect} from "react";
import LoginForm from "./LoginForm";
import UserPanel from "./UserPanel";

function App() {
    const [loggedIn, setLoggedIn] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && typeof storedUser === 'string') {
            setLoggedIn(storedUser);
        }
    }, []);

    async function handleLogin(email) {
        if (email) {
            setIsLoading(true);
             const response = await fetch(`/api/participants/${email}`, {
                 method: 'GET',
                 headers: { 'Content-Type': 'application/json' }
             });

            if (response.ok) {
                localStorage.setItem('user', email)
                setLoggedIn(email);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                alert('Nie znaleziono użytkownika o podanym e-mailu. Zarejestruj się.')
            }
        }
    }

    async function handleRegister(email) {
        if (email) {
            setIsLoading(true);
             const response = await fetch(`/api/participants/${email}`, {
                 method: 'GET',
                 headers: { 'Content-Type': 'application/json' }
             });

            if (response.ok) {
                setIsLoading(false);
                alert('Podany użytkownik już istnieje. Zaloguj się.')
            } else {
                setIsLoading(true);
                 const response = await fetch('/api/participants', {
                     method: 'POST',
                     body: JSON.stringify({'login':email, 'password': '12345'}),
                     headers: { 'Content-Type': 'application/json' }
                 });

                 if (response.ok) {
                     setLoggedIn(email);
                     localStorage.setItem('user', email);
                     setIsLoading(false);
                 }
            }
        }
    }

    function logout() {
        setLoggedIn('');
        localStorage.setItem('user', '')
    }

    return (
        <div className="app-wrapper">
            <h1>System do zapisów na zajęcia</h1>
            {loggedIn ? <UserPanel username={loggedIn} onLogout={logout}/> : <><LoginForm onAction={handleLogin}/><LoginForm onAction={handleRegister} buttonLabel={"Zarejestruj się"}/></>}
            {isLoading && <div className="loader lds-dual-ring"></div>}
        </div>
    );
}

export default App;
