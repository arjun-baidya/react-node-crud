import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const [user, setUser] = useState({})
    const {id} = useParams();
    useEffect(()=>{
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>setUser(data))

    }, [])

    const handleUpdateUser =e =>{
        const url = `http://localhost:5000/users/${id}`;
        fetch(url,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount > 0){
                alert('modified success')
                setUser({})
            }
        })
        e.preventDefault()
    }
    const handlenameChange =e =>{
        const updatedName = e.target.value
        const updateUser = {name:updatedName,email:user.email}
        setUser(updateUser)
    }
    const handleemailChange =e =>{
        const updatedEmail = e.target.value
        // const updateUser = {...user}
        // updateUser.email = updatedEmail
        const updateUser = {name:user.name,email:updatedEmail}
        setUser(updateUser)
    }
    return (
        <div>
            <h2>This is Update {user.name}</h2>
            <p>His Id :{id}</p>
            <form onSubmit={handleUpdateUser}>
                <input type="text" onChange={handlenameChange} value={user.name || ''} />
                <input type="email" onChange={handleemailChange} value={user.email || ''} />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateUser;