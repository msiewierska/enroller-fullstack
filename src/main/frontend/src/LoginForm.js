import {useState} from "react";

export default function LoginForm({onLogin, buttonLabel}) {
    const [email, setEmail] = useState('');

    return <div>
        <label>Zaloguj się e-mailem</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        {(email && !email.includes('@')) ? <div className="error">Podaj prawidłowy email</div> : ''}
        <button type="button" onClick={() => onLogin(email)} disabled={(!email || !email.includes('@')) ? true : false}>{buttonLabel || 'Wchodzę'}</button>
    </div>;
}
