// import React, { useContext, useState } from 'react'
// import { RxCross2 } from "react-icons/rx";
// import { userDataContext } from '../context/UserContext.jsx';
// import dp from "../assets/empty-dp.webp";
// import { FaCirclePlus } from "react-icons/fa6";
// import { CiCamera } from "react-icons/ci";

// const EditProfile = () => {
//     let { userData, setUserData, edit, setEdit } = useContext(userDataContext)

//     const [firstName, setFirstName] = useState(userData.firstName || " ")
//     const [lastName, setLastName] = useState(userData.lastName || " ")
//     const [userName, setUserName] = useState(userData.userName || " ")
//     const [headline, setHeadline] = useState(userData.headline || " ")
//     const [location, setLocation] = useState(userData.location || " ")
//     const [gender, setGender] = useState(userData.gender || " ")
//     const [skills, setSkills] = useState(userData.skills || [])
//     const [newSkills, setNewSkills] = useState(" ")
//     const [experience, setExperience] = useState(userData.experience || [])
//     const [newExperience, setNewExperience] = useState({
//         college: " ",
//         degree: " ",
//         fieldOfStudy: " "
//     })

//     const [education, setEducation] = useState(userData.education || [])
//     const [newEducation, setNewEducation] = useState({
//         title:" ",
//         comapany:" ",
//         description:""
//     })
    


//     const addSkill = () => {


//         if (newSkills && !skills.includes(newSkills)) {
//             setSkills([...skills, newSkills])
//         }

//         setNewSkills(" ")

//     }

//     const addEducation = () => {


//         if (newEducation.college && newEducation.degree && newEducation.fieldOfStudy) {
//             setEducation([...education, newEducation])
//         }

//         setNewEducation({
//             college: " ",
//             degree: " ",
//             fieldOfStudy: " "
//         })

//     }


//     const addExperience = () => {


//         if (newExperience.title && newExperience.comapany && newExperience.description) {
//             setExperience([...experience, newExperience])
//         }

//         setNewExperience({
//             title: " ",
//             comapany: " ",
//             description: " "
//         })

//     }

//     const removeEducation = (edu) => {
//         if (education.includes(edu)) {
//             setEducation(education.filter((e) => (
//                 e !== edu)
//             ))
//         }
//     }
    
//     const removeSkill = (skill) => {
//         if (skills.includes(skill)) {
//             setSkills(skills.filter((s) => (
//                 s !== skill)
//             ))

//         }
//     }

//     const removeExperinece = (exp) => {
//         if (experience.includes(exp)) {
//             setExperience(experience.filter((e) => (
//                 e !== exp)
//             ))

//         }
//     }



//     return (


//         <div className='w-full h-screen fixed top-0  z-100 flex justify-center items-center'>
//             <div className='bg-black opacity-[0.6] w-full h-full absolute '></div>
//             <div className='w-90% max-w-100 w-150 h-130 bg-white absolute z-200 rounded-lg shadow-2xs p-2'>
//                 {/* cross */}
//                 <div className='absolute right-3 top-3' onClick={() => setEdit(false)}><RxCross2 className='text-2xl cursor-pointer font-bold' /></div>

//                 {/* cover image */}
//                 <div className='w-full h-30 bg-gray-400 rounded-lg mt-9 '>
//                     <img src="" alt="" className='w-full overflow-hidden ' />
//                     <CiCamera className='w-6 h-6 absolute top-13 right-6 cursor-pointer' />
//                 </div>



//                 {/* profile image */}

//                 <div className="w-15 h-15 rounded-full overflow-hidden border absolute top-30 left-6  cursor-pointer">
//                     <img
//                         src={userData?.assistantImage || dp}
//                         alt=""
//                         className="w-full h-full object-cover"
//                     />
//                     <FaCirclePlus className='w-3 h-3 absolute right-2 bottom-1 text-blue-500' />
//                 </div>




//                 <div className='flex flex-col'>
//                     <input type="text" placeholder='firstname' value={firstName} onClick={(e) => setFirstName(e.target.value)} />
//                     <input type="text" placeholder='lastname' value={lastName} onClick={(e) => setLastName(e.target.value)} />
//                     <input type="text" placeholder='username' value={userName} onClick={(e) => setUserName(e.target.value)} />
//                     <input type="text" placeholder='headline' value={headline} onClick={(e) => setHeadline(e.target.value)} />
//                     <input type="text" placeholder='location' value={location} onClick={(e) => setLocation(e.target.value)} />
//                     <input type="text" placeholder='gender (male/female/other)' value={gender} onClick={(e) => setGender(e.target.value)} />
//                 </div>

//                 <div>
//                     <h1>Skills</h1>
//                     {skills && <div>
//                         {skills.map((skill, index) => (
//                             <div key={index}><span>{skill}</span><RxCross2 className='text-xl cursor-pointer font-bold' onClick={() => removeSkill(skill)} /></div>
//                         ))}
//                     </div>}

//                     <div >
//                         <input type="text" placeholder='add new skill' value={newSkills} onChange={(e) => setNewSkills(e.target.value)} />
//                         <button>Add</button>
//                     </div>
//                 </div>






//                 <div>
//                     <h1>Education</h1>
//                     {education && <div>
//                         {education.map((edu, index) => (
//                             <div key={index}>

//                                 <div>
//                                     <div>title : {exp.title}</div>
//                                     <div>Company: {exp.comapany}</div>
//                                     <div> Description : {exp.description}</div>
//                                 </div>

//                                 <RxCross2 className='text-xl cursor-pointer font-bold'  /></div>
//                         ))}
//                     </div>}

//                     <div >
//                         <input type="text" placeholder='title' value={newExperience.title} onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })} />

//                         <input type="text" placeholder='comapany' value={newExperience.degree} onChange={(e) => setNewExperience({ ...newExperience, comapany: e.target.value })} />

//                         <input type="text" placeholder='Description' value={newExperience.description} onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })} />
//                         <button onClick={addExperience}>Add</button>
//                     </div>
//                 </div>











//                  <div>
//                     <h1>Experience</h1>
//                     {experience && <div>
//                         {education.map((exp, index) => (
//                             <div key={index}>

//                                 <div>
//                                     <div>College : {edu.college}</div>
//                                     <div>Degree: {edu.degree}</div>
//                                     <div> field of Study : {edu.fieldOfStudy}</div>
//                                 </div>

//                                 <RxCross2 className='text-xl cursor-pointer font-bold' onClick={()=>removeExperinece(exp)} /></div>
//                         ))}
//                     </div>}

//                     <div >
//                         <input type="text" placeholder='college' value={newEducation.college} onChange={(e) => setNewEducation({ ...newEducation, college: e.target.value })} />

//                         <input type="text" placeholder='degree' value={newEducation.degree} onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })} />

//                         <input type="text" placeholder='field of study' value={newEducation.fieldOfStudy} onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })} />
//                         <button onClick={addEducation}>Add</button>
//                     </div>
//                 </div>



//                  <button>Save Profile</button>




//             </div>

//         </div>
//     )
// }

// export default EditProfile









import React, { useContext, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { userDataContext } from "../context/UserContext.jsx";
import dp from "../assets/empty-dp.webp";
import { FaCirclePlus } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";

const EditProfile = () => {
  let { userData, setUserData, edit, setEdit } =
    useContext(userDataContext);

  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [userName, setUserName] = useState(userData?.userName || "");
  const [headline, setHeadline] = useState(userData?.headline || "");
  const [location, setLocation] = useState(userData?.location || "");
  const [gender, setGender] = useState(userData?.gender || "");

  const [skills, setSkills] = useState(userData?.skills || []);
  const [newSkills, setNewSkills] = useState("");



// ******image handling***********
  const profileImage = useRef()
  const coverImage = useRef()
  // profile image
  const[frontEndProfileImage,setFrontEndProfileImage] = useState(userData.profileImage || dp)
  const[backEndProfileImage,setBackEndProfileImage] = useState(null)
  // cover image
  const[frontEndCoverImage,setFrontEndCoverImage] = useState(userData.coverImage || null)
  const[backEndCoverImage,setBackEndCoverImage] = useState(null)

  const handleProfileImage = async (e) => {
    let file = e.target.files[0]
    setBackEndProfileImage(file)

    setFrontEndProfileImage(URL.createObjectURL(file))
  }
  const handleCoverImage = async (e) => {
    let file = e.target.files[0]
    setBackEndCoverImage(file)

    setFrontEndCoverImage(URL.createObjectURL(file))
  }




















  const [experience, setExperience] = useState(
    userData?.experience || []
  );
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    description: "",
  });

  const [education, setEducation] = useState(
    userData?.education || []
  );
  const [newEducation, setNewEducation] = useState({
    college: "",
    degree: "",
    fieldOfStudy: "",
  });

  /* ================= FUNCTIONS ================= */

  const addSkill = () => {
    if (newSkills && !skills.includes(newSkills)) {
      setSkills([...skills, newSkills]);
    }
    setNewSkills("");
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addEducation = () => {
    if (
      newEducation.college &&
      newEducation.degree &&
      newEducation.fieldOfStudy
    ) {
      setEducation([...education, newEducation]);
    }
    setNewEducation({
      college: "",
      degree: "",
      fieldOfStudy: "",
    });
  };

  const removeEducation = (edu) => {
    setEducation(education.filter((e) => e !== edu));
  };

  const addExperience = () => {
    if (
      newExperience.title &&
      newExperience.company &&
      newExperience.description
    ) {
      setExperience([...experience, newExperience]);
    }
    setNewExperience({
      title: "",
      company: "",
      description: "",
    });
  };

  const removeExperience = (exp) => {
    setExperience(experience.filter((e) => e !== exp));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 ">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm "></div>

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6 mt-30 ">





        {/* Profile image input */}
        <input type="file" accept="image/*" hidden ref={profileImage} onChange={handleProfileImage}/>


        {/* Cover Image Input  */}
        <input type="file" accept="image/*" hidden ref={coverImage} onChange={handleCoverImage}/>



        {/* Close */}
        <div
          className="absolute right-4 top-4"
          onClick={() => setEdit(false)}
        >
          <RxCross2 className="text-2xl cursor-pointer hover:scale-110 transition" />
        </div>

        {/* Cover */}
        <div className="relative w-full h-44 bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl mt-10 overflow-hidden" onClick={()=>coverImage.current.click()}>
          <img src={frontEndCoverImage} className="w-full" />
          <CiCamera className="absolute top-3 right-3 text-white text-4xl p-1 rounded-full cursor-pointer" />
        </div>

        {/* Profile */}
        <div className="w-18 h-18 rounded-full overflow-hidden border-4 border-white shadow-lg absolute top-45 left-14 cursor-pointer" onClick={()=>profileImage.current.click()}>
          <img
            src={frontEndProfileImage }
            alt=""
            className="w-full h-full object-cover"
          />
          <FaCirclePlus className="absolute right-1 bottom-1 text-blue-500 bg-white rounded-full" />
        </div>

        {/* ================= BASIC ================= */}
        <div className="flex flex-wrap gap-4 mt-16">

          {[ 
            { value: firstName, set: setFirstName, label: "First Name" },
            { value: lastName, set: setLastName, label: "Last Name" },
            { value: userName, set: setUserName, label: "Username" },
            { value: headline, set: setHeadline, label: "Headline" },
            { value: location, set: setLocation, label: "Location" },
            { value: gender, set: setGender, label: "Gender" },
          ].map((item, i) => (
            <input
              key={i}
              value={item.value}
              onChange={(e) => item.set(e.target.value)}
              placeholder={item.label}
              className="w-full md:w-[48%] border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ))}
        </div>

        {/* ================= SKILLS ================= */}
        <div className="mt-8">
          <h1 className="text-lg font-semibold mb-3">Skills</h1>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
              >
                {skill}
                <RxCross2
                  className="cursor-pointer"
                  onClick={() => removeSkill(skill)}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <input
              value={newSkills}
              onChange={(e) => setNewSkills(e.target.value)}
              placeholder="Add skill"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            />
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {/* ================= EDUCATION ================= */}
        <div className="mt-8">
          <h1 className="text-lg font-semibold mb-3">Education</h1>

          {education.map((edu, i) => (
            <div
              key={i}
              className="flex justify-between items-center border p-3 rounded-lg mb-2"
            >
              <div>
                <div>{edu.college}</div>
                <div className="text-sm text-gray-500">{edu.degree}</div>
                <div className="text-sm text-gray-500">
                  {edu.fieldOfStudy}
                </div>
              </div>
              <RxCross2
                className="cursor-pointer"
                onClick={() => removeEducation(edu)}
              />
            </div>
          ))}

          <div className="flex flex-wrap gap-2">
            <input
              placeholder="College"
              value={newEducation.college}
              onChange={(e) =>
                setNewEducation({
                  ...newEducation,
                  college: e.target.value,
                })
              }
              className="w-full md:w-[32%] border rounded-lg px-3 py-2"
            />
            <input
              placeholder="Degree"
              value={newEducation.degree}
              onChange={(e) =>
                setNewEducation({
                  ...newEducation,
                  degree: e.target.value,
                })
              }
              className="w-full md:w-[32%] border rounded-lg px-3 py-2"
            />
            <input
              placeholder="Field"
              value={newEducation.fieldOfStudy}
              onChange={(e) =>
                setNewEducation({
                  ...newEducation,
                  fieldOfStudy: e.target.value,
                })
              }
              className="w-full md:w-[32%] border rounded-lg px-3 py-2"
            />
          </div>

          <button
            onClick={addEducation}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* ================= EXPERIENCE ================= */}
        <div className="mt-8">
          <h1 className="text-lg font-semibold mb-3">Experience</h1>

          {experience.map((exp, i) => (
            <div
              key={i}
              className="flex justify-between items-center border p-3 rounded-lg mb-2"
            >
              <div>
                <div>{exp.title}</div>
                <div className="text-sm text-gray-500">{exp.company}</div>
                <div className="text-sm text-gray-500">
                  {exp.description}
                </div>
              </div>
              <RxCross2
                className="cursor-pointer"
                onClick={() => removeExperience(exp)}
              />
            </div>
          ))}

          <div className="flex flex-wrap gap-2">
            <input
              placeholder="Title"
              value={newExperience.title}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  title: e.target.value,
                })
              }
              className="w-full md:w-[32%] border rounded-lg px-3 py-2"
            />
            <input
              placeholder="Company"
              value={newExperience.company}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  company: e.target.value,
                })
              }
              className="w-full md:w-[32%] border rounded-lg px-3 py-2"
            />
            <input
              placeholder="Description"
              value={newExperience.description}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  description: e.target.value,
                })
              }
              className="w-full md:w-[32%] border rounded-lg px-3 py-2"
            />
          </div>

          <button
            onClick={addExperience}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* Save */}
        <button className="w-full mt-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 cursor-pointer mb-7">
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
