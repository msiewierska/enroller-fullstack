import {useState} from "react";

export default function RegisterForm({onRegister, buttonLabel}) {
    const [email, setEmail] = useState('');

    return <div>
        <label>Zarejestruj się e-mailem</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        {(email && !email.includes('@')) ? <div className="error">Podaj prawidłowy email</div> : ''}
        <button type="button" onClick={() => onRegister(email)} disabled={(!email || !email.includes('@')) ? true : false}>{buttonLabel || 'Rejestruję się'}</button>
    </div>;
}
