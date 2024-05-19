import {useState} from "react";

export default function LoginForm({onAction, buttonLabel}) {
    const [email, setEmail] = useState('');

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    return <div>
        <label>{buttonLabel || 'Zaloguj się'} e-mailem</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        {(email && !validateEmail(email)) ? <div className="error">Podaj prawidłowy email</div> : ''}
        <button type="button" onClick={() => onAction(email)} disabled={(!email || !email.includes('@')) ? true : false}>{buttonLabel || 'Wchodzę'}</button>
    </div>;
}
