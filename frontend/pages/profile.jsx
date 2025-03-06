import { useState, useEffect } from 'react';

const userProfile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        avatar: '',
        bio: ''
    })

    useEffect(() => {
        fetchUserProfile()
    }, [])

const fetchUserProfile = async () => {
    try {
        const response = await fetch('api del backend', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        })
        const data = await response.json()
        setUser(data)
    } catch (error) {
        console.error('Error al cargar el perfil:', error)
        }
    }

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('api del backend', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(user)
            })
            const data = await response.json()
            setUser(data)
        } catch (error) {
            console.log('Error al actualizar perfil', error)
        }
    }

    return (
        <div className='profile-container'>
            <h2>Mi perfil</h2>
            <form onSubmit="updateProfile">
                <div>
                    <label htmlFor="">Nombre</label>
                        <input 
                        type="text" 
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input 
                        type="email" 
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        />
                </div>
                <div>
                    <label htmlFor="">Biografia</label>
                    <textarea 
                        value={user.bio}
                        onChange={(e) => setUser({...user, bio: e.target.value})}
                    />
                </div>
                <button type='submit' >Actualizar Perfil</button>
            </form>
        </div>
    )
}

export default userProfile