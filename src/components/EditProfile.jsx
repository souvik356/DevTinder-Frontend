import React, { useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from './utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './appStore/userSlice'
import toast from 'react-hot-toast'

const EditProfile = () => {
    const user = useSelector(state => state.user.value)
    const [firstName,setFirstName] = useState(user?.firstName)
    const [lastName,setLastName] = useState(user?.lastName)
    const [photoURL,setPhoto] = useState(user?.photoURL)
    const [about,setAbout] = useState(user?.about)
    const [gender,setGender] = useState(user?.gender)
    const [age,setAge] = useState(user?.age)
    const [skills,setSkill] = useState(user?.skills)
    const [error,setError] = useState("")
    const dispatch = useDispatch()
    const [showToast,setToast] = useState(false)

    const handleSaveProfile = async()=>{
        try {
            setError('')
        const response = await axios.patch(`${BASE_URL}/profile/edit`,{
            firstName,lastName,photoURL,about,gender,age,skills
        },{ withCredentials: true})
          console.log(response)
          dispatch(addUser(response.data.data))
          if(response.data.success){
            setToast(true)
          }
        setTimeout(() => {
            setToast(false)
        }, 3000);
        } catch (error) {
            console.log(error)
            setError(error.response.data.message || "something went wrong")
        }
    }
    return (
       user&& (<div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 p-4">
    <div className="bg-neutral w-full sm:w-96 md:w-[30rem] min-h-64 p-4 sm:p-6 rounded-3xl">
        <div className="flex gap-2 flex-col items-center">
            <h2 className="card-title text-lg md:text-xl font-semibold">Profile!</h2>
            
            <input
                type="text"
                placeholder="Enter your first name"
                className="p-2 border-2 border-black w-full max-w-xs rounded-lg outline-none focus:border-yellow-200"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            
            <input
                type="text"
                placeholder="Enter your last name"
                className="p-2 w-full border-black border-2 focus:border-yellow-200 max-w-xs rounded-lg outline-none"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            
            <input
                type="text"
                placeholder="Enter your photoURL"
                className="p-2 border-black border-2 focus:border-yellow-200 w-full max-w-xs rounded-lg outline-none"
                value={photoURL}
                onChange={(e) => setPhoto(e.target.value)}
            />
            
            <textarea
                placeholder="Enter your Description"
                className="p-2 border-black border-2 focus:border-yellow-200 w-full max-w-xs rounded-lg outline-none"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
            />
            
            <input
                type="text"
                placeholder="Enter your gender"
                className="p-2 border-black border-2 focus:border-yellow-200 w-full max-w-xs rounded-lg outline-none"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            />
            
            <input
                type="text"
                placeholder="Enter your age"
                className="p-2 border-black border-2 focus:border-yellow-200 w-full max-w-xs rounded-lg outline-none"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            
            <textarea
                placeholder="Enter your skills"
                className="p-2 border-black border-2 focus:border-yellow-200 w-full max-w-xs rounded-lg outline-none"
                value={skills}
                onChange={(e) => setSkill(e.target.value)}
            />
            
            <div className="card-actions flex-col w-full items-center">
                {error && <p className="font-bold text-red-600">{error}</p>}
                <button onClick={handleSaveProfile} className="btn btn-primary w-full sm:w-auto">
                    Save Profile
                </button>
            </div>
        </div>
    </div>

    <div className="w-full md:w-auto flex justify-center">
        <UserCard user={{ firstName, lastName, photoURL, about, gender, age, skills }} />
    </div>
    {
       showToast && (<div className="toast toast-top toast-center pt-[5rem]">
        <div className="alert alert-success">
          <span>Profile saved</span>
        </div>
      </div>)
    }
</div>)

    )
}

export default EditProfile