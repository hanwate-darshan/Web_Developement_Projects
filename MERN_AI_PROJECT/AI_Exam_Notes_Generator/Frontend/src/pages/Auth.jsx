import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  return (
    <div className='bg-white text-black min-h-screen overflow-hidden px-8'>
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className='max-w-7xl mx-auto mt-8 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-8 py-6 shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(139,92,246,0.4)]
 '

      >
        "


        <h1 className="text-2xl font-bold bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">Exam Notes Generator</h1>

        <p className="text-sm text-gray-300 mt-1">
          Transform Topics into Structured, Exam-Ready Notes with AI
        </p>
         
            </motion.header>
         <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* left content */}
            <motion.div
             initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}

            >
             <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-linear-to-br from-black via-black/60 to-black/90 bg-clip-text text-transparent">Unlock Smart <br />AI Notes</h1>


<motion.button
whileHover={{
  y:-10,
  rotateX:8,
  rotateY:-8,
  scale:1.07
}}
whileTap={{scale:0.97}}
transition={{type:"spring" , stiffness:200 , damping:18}}
            className="mt-10 px-10 p-3 rounded-xl flex items-center gap-3 bg-linear-to-br from-black/90 via-black/80 to-black/90 border border-white/10 text-white font-semibold text-lg 
            shadow-[0_10px_40px_rgba(0,0,0,0.3),0_0_25px_rgba(139,92,246,0.3)] cursor-pointer"
            
            ><FcGoogle size={22} /> Continue with Google</motion.button>

            <p className="mt-6 max-w-xl text-lg bg-linear-to-br from-gray-700 via-gray-500 to-gray-700 bg-clip-text text-transparent">
              You get <span className="font-semibold">100 Free Credits</span> to create exam notes , project notes , charts , graphs and download clean PDF`s - instanly using AI.`
            </p>


              <p className="mt-4 text-sm text-gray-500">Start with 50 Credits - Upgrades anytime for more credits - Instant Access</p>

            
            </motion.div>

            


            {/* right div */}
            <motion.div  className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Feature icon={"🎁"} title={"50 free Credits"} desc="Start with 50 credits to generate notes without paying." />
                <Feature icon={"📗"} title={"Exam Notes"} desc="High-yield , revision-ready exam oritented notes." />
                <Feature icon={"📂"} title={"Project Notes"} desc="Well-Structured documentation for assignments & projects." />
                <Feature icon={"📊"} title={"Charts & Graphs"} desc="Auto-generated diagrams, Charts and flow graphs." />
                <Feature icon={"⬇️"} title={"Free PDF Download "} desc="Download clean,printable PDF's instantly." />
            </motion.div>
         </main>



    </div>
  )
}








// Feature Component
function Feature ({icon , title ,desc}){
    return (
        <motion.div

        whileHover={{
  y:-10,
  rotateX:8,
  rotateY:-8,
  scale:1.05
}}
whileTap={{scale:0.97}}
transition={{type:"spring" , stiffness:200 , damping:18}}
style={{transformStyle:"preserve-3d"}}

         className="relative rounded-2xl p-6 bg-linear-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-xl text-white cursor-pointer">




        {/* <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" /> */}
        <div className="relative z-10" style={{transform:"translateZ(30px)"}}>
             <div className="text-4xl mb-3">{icon}</div>
             <h3 className="text-lg font-semibold mb-2">{title}</h3>
             <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
        </div>
        



        </motion.div>
    )
}



export default Auth
