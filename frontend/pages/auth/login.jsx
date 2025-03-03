import {useState} from "react";
import  Button  from '../../components/auth/button';
import  Input  from '../../components/auth/input'

import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [email, setEmail] =  useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const loginFunction = async(e) => {
        e.preventDefault();

        fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(response => response.json)
        .then(data => {
            alert('Inicio de sesion exitoso')
            navigate('/')
        })
    }

    return (
        <>
<div className="container container-auth">
<div className="row w-100">
    <div className="col-4 ms-auto me-auto card p-4">
        <h1>Login</h1>
        <form action="" onSubmit={loginFunction}>
            <div className="mb-3">
                <Input
                    type="email"
                    id="email"
                    placeholder="email"
                    change={(e) => {setEmail(e.target.value)}}
                />
            </div>
            <div className="mb-3">
                {/* <label htmlFor="email" className="form-label">password</label> */}
                <Input 
                type="password" 
                id='password' 
                placeholder='password'
                change={(e) => {setPassword(e.target.value)}}

                />
            </div>

            <Button text="Login" color="info">

            </Button>
        </form>
    </div>
</div>

</div>        
        </>
    )
}

export default Login