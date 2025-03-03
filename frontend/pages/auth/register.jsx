import {useState} from "react";
import  Button  from '../../components/auth/button';
import Input from "../../components/auth/input";
const Register = () => {
    const [name, setName] =  useState('');
    const [lastname, setLastname] =  useState('');
    const [email, setEmail] =  useState('');
    const [password, setPassword] = useState('');
    const registerFunction = async(e) => {
        e.preventDefault();

        fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, lastname, email, password})
        })
        .then(response => response.json)
        .then(data => {
            alert(data.message)
        })
    }

    return (
        <>
<div className="container container-auth">
<div className="row w-100">
    <div className="col-4 ms-auto me-auto card p-4">
        <h1>Registro</h1>
        <form action="" onSubmit={registerFunction}>
        <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre </label>
                <Input 
                type="text" 
                className="form-control" 
                id="name" 
                placeholder="name" 
                onChange={(e) => {setName(e.target.value)}}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="lastaname" className="form-label">Apellido </label>
                <Input 
                type="text" 
                className="form-control" 
                id="lastname" 
                placeholder="lastname" 
                onChange={(e) => {setLastname(e.target.value)}}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email </label>
                <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="email" 
                onChange={(e) => {setEmail(e.target.value)}}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">password</label>
                <input 
                type="password" 
                id='password' 
                placeholder='password'
                onChange={(e) => {setPassword(e.target.value)}}

                />
            </div>

            <Button text="Registro" color="info">

            </Button>
        </form>
    </div>
</div>

</div>        
        </>
    )
}

export default Register