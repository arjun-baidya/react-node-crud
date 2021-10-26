import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/users')
        .then(res=>res.json())
        .then(data=>setUsers(data))
    },[])
    // delete a user
    const handleDeleteuser =id=>{
        const proceed = window.confirm("are you sure")
        if(proceed){
            const url = `http://localhost:5000/users/${id}`
        fetch(url,{
            method:'DELETE'
        })
        .then(res =>res.json())
        .then(data =>{
            if(data.deletedCount > 0){
                alert('deleted successfully');
                const remainUsers = users.filter(user=> user._id !== id)
                setUsers(remainUsers)
            }
        })
        }
    }
    return (
        <div>
            <h2>Users Available{users.length}</h2>
            <ul>
                {
                    users.map(user=><li key={user._id}>{user.name}
                    <Link to={`/users/update/${user._id}`}><button >update</button></Link>
                    <button onClick={()=> handleDeleteuser(user._id)} >X</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;