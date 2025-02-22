import axios from 'axios'
import React from 'react'
import { BASE_URL } from './utils/Constants'
import { useDispatch } from 'react-redux'
import { removeUserFeed } from './appStore/feedSlice'

const UserCard = ({user}) => {
    const dispatch = useDispatch()
    const {_id,firstName,lastName,photoURL,about,gender,age,skills} = user
    console.log(user);
    const handleStatus = async(status,userId)=>{
       try {
        const response = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`,{},{
            withCredentials: true
        })
        console.log(response.data);
        dispatch(removeUserFeed(response.data.data.userId))
       } catch (error) {
        console.error(error)
       }
    }
    return (
        <>
            <div className="card bg-base-300 w-72 shadow-xl">
                <figure>
                    <img
                        src={photoURL}
                        alt="Shoes"
                        className='w-72 h-56'
                        />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
                    {about &&<p className='text-sm'>{about}</p>}
                   {gender && age &&<p>{`${age} ${gender}`}</p>}
                    <div className="card-actions items-center justify-center">
                        <button onClick={()=>handleStatus("ignored",_id)} className="btn btn-primary">Ignore</button>
                        <button onClick={()=>handleStatus("interested",_id)} className="btn btn-secondary">Interested</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCard