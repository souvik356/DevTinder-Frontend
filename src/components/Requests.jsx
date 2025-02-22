import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './utils/Constants'
import { connect, useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from './appStore/requestSlice'

const Requests = () => {
    const [showToast, setShowToast] = useState(false)
    const [showErrorToast, setShowErrorToast] = useState(false)
    const dispatch = useDispatch()
    const request = useSelector(state => state.request.value)
    // console.log("request from store", request);
    const getRequest = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/request`, {
                withCredentials: true
            })
            // console.log('response from API',response)
            dispatch(addRequest(response.data.connections))
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getRequest()
    }, [])

    if (request === null) {
        return (
            <div className='pt-[5rem]'>
                <h1 className='font-extrabold text-center'>No Request</h1>
            </div>
        )
    }

    const handleStatus = async (status, requestId) => {
        console.log(status);
        try {
            const response = await axios.patch(`${BASE_URL}/request/review/${status}/${requestId}`, {}, {
                withCredentials: true
            })
            if(response.data.success){
                dispatch(removeRequest(requestId))
                if(status.trim().toLowerCase() === "accepted"){
                    console.log('status',status)
                    setShowToast(true)
                    setTimeout(() => {
                        setShowToast(false)
                    }, 3000);
                }
                else{
                    setShowErrorToast(true)
                    setTimeout(()=>{
                        setShowErrorToast(false)
                    },3000)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='pt-[5rem]'>
            {
                request.length === 0 ? (<div>
                    <h1 className='text-center'>No Connection request</h1>
                </div>):(
                    <div>
                        <h1 className='text-center font-extrabold'>Connection Request</h1>
            <div className='flex items-center flex-col gap-4 mt-6'>
                {
                    request.map((elem, index) => {
                        console.log(elem);
                        const { firstName,lastName,about,photoURL,age,gender } = elem.fromUserId
                        return (
                            <div key={elem._id+index} className='flex items-center bg-base-300  border border-gray-300 p-4 rounded-lg max-w-xl w-full'>
                                <div>
                                    <img className='w-20 h-20 rounded-full object-fill' alt='profile-photo' src={photoURL} />
                                </div>
                                <div className='flex flex-col gap-2 w-full h-full'>
                                    <h1 className='text-center font-bold'>{`${firstName} ${lastName}`}</h1>
                                    {age && gender && <p className='text-center text-sm'>{`${age} ${gender}`}</p>}
                                    <p className='text-center text-sm'>{about}</p>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <button onClick={()=>handleStatus("accepted",elem._id)} className="btn btn-sm bg-secondary text-black">Accept</button>
                                    <button onClick={()=>handleStatus("rejected",elem._id)} className="btn btn-sm bg-error text-black">Reject</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                showToast && (<div className="toast toast-top toast-center pt-[5rem]">
                    <div className="alert alert-success">
                        <span>Connection Accepted</span>
                    </div>
                </div>)
            }
            {
                showErrorToast &&(
                    <div className="toast toast-top toast-center pt-[5rem] bg-error">
                    <div className="alert alert-success">
                        <span>Connection Accepted</span>
                    </div>
                </div>
                )
            }
                    </div>
                )
            }
        </div>
    )
}

export default Requests