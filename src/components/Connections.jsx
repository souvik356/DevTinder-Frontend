import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from './utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from './appStore/connectionSlice'
import { Link } from 'react-router'

const Connections = () => {
    const dispatch = useDispatch()
    const connection = useSelector(state => state.connection.value)
    console.log("connection from redux", connection);
    const getConnections = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/connections`, {
                withCredentials: true
            })
            console.log(response)
            dispatch(addConnection(response.data.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getConnections()
    }, [])

    if (connection === null) {
        return (
            <div className='pt-[5rem]'>
                <h1 className='text-center'>No Connections</h1>
            </div>
        )
    }

    return (
        <div className='pt-[5rem]'>
    {
        connection.length === 0 ? (<div>
            <h1 className='text-center font-bold'>No connections</h1>
        </div>):(<div>
            <h1 className='text-center font-extrabold'>Connections</h1>
    <div className='flex justify-center mt-4'>
        {/* Scrollable Container */}
        <div className='flex flex-col items-center gap-2 sm:max-h-[800px] lg:max-h-[400px] overflow-y-scroll overflow-x-hidden w-full px-4'>
            {connection.map((elem, index) => (
                <div key={elem._id + index} className='bg-base-300 flex items-center gap-6 border border-gray-300 p-4 rounded-lg max-w-xl w-full'>
                    <div>
                        <img className='w-20 h-20 rounded-full object-fill' src={elem?.photoURL} alt='profile-photo' />
                    </div>
                    <div className='flex flex-col gap-2 w-full h-full'>
                        <h1 className='text-center font-bold'>{`${elem?.firstName} ${elem?.lastName}`}</h1>
                        {elem?.age && elem?.gender && <p className='text-center text-sm'>{`${elem?.age} ${elem?.gender}`}</p>}
                        <p className='text-center text-sm'>{elem?.about}</p>
                    </div>
                    <Link to={"/chat/"+elem._id}><button className="btn btn-primary">Chat</button>
                    </Link>
                </div>
            ))}
        </div>
    </div>
        </div>)
    }
</div>

    )
}

export default Connections