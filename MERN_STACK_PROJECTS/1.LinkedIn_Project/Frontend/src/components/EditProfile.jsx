import React, { useContext, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { userDataContext } from '../context/UserContext.jsx';
import dp from "../assets/empty-dp.webp";
import { FaCirclePlus } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";

const EditProfile = () => {
    let { userData, setUserData, edit, setEdit } = useContext(userDataContext)

    const [firstName, setFirstName] = useState(userData.firstName || " ")
    const [lastName, setLastName] = useState(userData.lastName || " ")
    const [userName, setUserName] = useState(userData.userName || " ")
    const [headline, setHeadline] = useState(userData.headline || " ")
    const [location, setLocation] = useState(userData.location || " ")
    const [gender, setGender] = useState(userData.gender || " ")
    const [skills, setSkills] = useState(userData.skills || [])
    const [newSkills, setNewSkills] = useState(" ")
    const [experience, setExperience] = useState(userData.experience || [])
    const [newExperience, setNewExperience] = useState({
        college: " ",
        degree: " ",
        fieldOfStudy: " "
    })

    const [education, setEducation] = useState(userData.education || [])
    const [newEducation, setNewEducation] = useState({
        title:" ",
        comapany:" ",
        description:""
    })
    


    const addSkill = () => {


        if (newSkills && !skills.includes(newSkills)) {
            setSkills([...skills, newSkills])
        }

        setNewSkills(" ")

    }

    const addEducation = () => {


        if (newEducation.college && newEducation.degree && newEducation.fieldOfStudy) {
            setEducation([...education, newEducation])
        }

        setNewEducation({
            college: " ",
            degree: " ",
            fieldOfStudy: " "
        })

    }


    const addExperience = () => {


        if (newExperience.title && newExperience.comapany && newExperience.description) {
            setExperience([...experience, newExperience])
        }

        setNewExperience({
            title: " ",
            comapany: " ",
            description: " "
        })

    }

    const removeEducation = (edu) => {
        if (education.includes(edu)) {
            setEducation(education.filter((e) => (
                e !== edu)
            ))
        }
    }
    
    const removeSkill = (skill) => {
        if (skills.includes(skill)) {
            setSkills(skills.filter((s) => (
                s !== skill)
            ))

        }
    }

    const removeExperinece = (exp) => {
        if (experience.includes(exp)) {
            setExperience(experience.filter((e) => (
                e !== exp)
            ))

        }
    }



    return (


        <div className='w-full h-screen fixed top-0  z-100 flex justify-center items-center'>
            <div className='bg-black opacity-[0.6] w-full h-full absolute '></div>
            <div className='w-90% max-w-100 w-150 h-130 bg-white absolute z-200 rounded-lg shadow-2xs p-2'>
                {/* cross */}
                <div className='absolute right-3 top-3' onClick={() => setEdit(false)}><RxCross2 className='text-2xl cursor-pointer font-bold' /></div>

                {/* cover image */}
                <div className='w-full h-30 bg-gray-400 rounded-lg mt-9 '>
                    <img src="" alt="" className='w-full overflow-hidden ' />
                    <CiCamera className='w-6 h-6 absolute top-13 right-6 cursor-pointer' />
                </div>



                {/* profile image */}

                <div className="w-15 h-15 rounded-full overflow-hidden border absolute top-30 left-6  cursor-pointer">
                    <img
                        src={userData?.assistantImage || dp}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <FaCirclePlus className='w-3 h-3 absolute right-2 bottom-1 text-blue-500' />
                </div>




                <div className='flex flex-col'>
                    <input type="text" placeholder='firstname' value={firstName} onClick={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder='lastname' value={lastName} onClick={(e) => setLastName(e.target.value)} />
                    <input type="text" placeholder='username' value={userName} onClick={(e) => setUserName(e.target.value)} />
                    <input type="text" placeholder='headline' value={headline} onClick={(e) => setHeadline(e.target.value)} />
                    <input type="text" placeholder='location' value={location} onClick={(e) => setLocation(e.target.value)} />
                    <input type="text" placeholder='gender (male/female/other)' value={gender} onClick={(e) => setGender(e.target.value)} />
                </div>

                <div>
                    <h1>Skills</h1>
                    {skills && <div>
                        {skills.map((skill, index) => (
                            <div key={index}><span>{skill}</span><RxCross2 className='text-xl cursor-pointer font-bold' onClick={() => removeSkill(skill)} /></div>
                        ))}
                    </div>}

                    <div >
                        <input type="text" placeholder='add new skill' value={newSkills} onChange={(e) => setNewSkills(e.target.value)} />
                        <button>Add</button>
                    </div>
                </div>






                <div>
                    <h1>Education</h1>
                    {education && <div>
                        {education.map((edu, index) => (
                            <div key={index}>

                                <div>
                                    <div>title : {exp.title}</div>
                                    <div>Company: {exp.comapany}</div>
                                    <div> Description : {exp.description}</div>
                                </div>

                                <RxCross2 className='text-xl cursor-pointer font-bold'  /></div>
                        ))}
                    </div>}

                    <div >
                        <input type="text" placeholder='title' value={newExperience.title} onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })} />

                        <input type="text" placeholder='comapany' value={newExperience.degree} onChange={(e) => setNewExperience({ ...newExperience, comapany: e.target.value })} />

                        <input type="text" placeholder='Description' value={newExperience.description} onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })} />
                        <button onClick={addExperience}>Add</button>
                    </div>
                </div>











                 <div>
                    <h1>Experience</h1>
                    {experience && <div>
                        {education.map((exp, index) => (
                            <div key={index}>

                                <div>
                                    <div>College : {edu.college}</div>
                                    <div>Degree: {edu.degree}</div>
                                    <div> field of Study : {edu.fieldOfStudy}</div>
                                </div>

                                <RxCross2 className='text-xl cursor-pointer font-bold' onClick={()=>removeExperinece(exp)} /></div>
                        ))}
                    </div>}

                    <div >
                        <input type="text" placeholder='college' value={newEducation.college} onChange={(e) => setNewEducation({ ...newEducation, college: e.target.value })} />

                        <input type="text" placeholder='degree' value={newEducation.degree} onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })} />

                        <input type="text" placeholder='field of study' value={newEducation.fieldOfStudy} onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })} />
                        <button onClick={addEducation}>Add</button>
                    </div>
                </div>



                 <button>Save Profile</button>




            </div>

        </div>
    )
}

export default EditProfile
