const express = require("express")
const app = express()


app.use(express.json())


const dbStudents = []


app.get("/students", (req, res) => {
    res.json(dbStudents)
})


app.get("/students/:id", (req, res) => {
    const idStudents = parseInt(req.params.id)
    const getStudents = dbStudents.find((e) => e.id === idStudents)


    if (idStudents === -1){
        res.status(404).json({message: "Estudiante no encontrado"})
    }


    res.json(getStudents)
})


app.post("/students", (req, res) => {
    const idUnico = new Date().getTime()
    const {fullName, age, curse} = req.body


    if (!fullName.trim() || !age || !curse.trim()) {return res.json({message:"Faltan valores"})}


    dbStudents.push(
        {
            id:idUnico,
            fullName: fullName,
            age: parseInt(age),
            curse: curse 
        }
    )


    res.json({message: "Se agrego un Estudiante"})
})


app.put("/students/:id", (req, res)=> {
    const buscarId = parseInt(req.params.id)
    const {fullName} = req.body
    const newAge= parseInt(req.body.age)
    const {curse}= req.body
    const studentIndex = dbStudents.findIndex((e) => e.id === buscarId)


    if( studentIndex === -1){
        res.status(404).json({message: "Estudiante no encontrado"})
    }


    if(!fullName.trim() || !newAge || !curse.trim()) {return res.json({message:"Faltan valores"})}


    dbStudents[studentIndex].fullName = fullName
    dbStudents[studentIndex].age = newAge
    dbStudents[studentIndex].curse = curse


    res.json({mensaje:"Estudiante actualizado",})
})


app.delete("/students/:id", (req, res)=> {
    const buscarId = parseInt(req.params.id)
    const studentIndex = dbStudents.findIndex((e) => e.id === buscarId)


    if (studentIndex === -1 ){
        res.status(404).json({message: "Estudiante no encontrado"})
    }


    dbStudents.splice(studentIndex, 1)


    res.json({message: "Estudiante eliminado"})
})
app.listen(4321, console.log("Servidor iniciado"))