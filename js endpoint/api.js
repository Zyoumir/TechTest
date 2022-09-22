import express from 'express';
import cors from "cors";
import formatObject from './Components/dataProc.js'
import getData from './Components/dataFetch.js'

const app= express();

app.use(cors({origin: '*'}));

//You can try here any values you want, it works for every field 
const old = {
    "name": "Scibids",
    "number_of_employees": 14,
    "is_serious": true,
    "tags": ["fun", "worker"]
    };
const New = {
    "name": "Scibids",
    "number_of_employees": 15,
    "is_serious": true,
    "tags": ["fun", "huhu"]
    };
    

const funcRes = formatObject(old, New);

//getting the data from the python API
const data = await getData()

// Endpoint 1 getting document by ID
app.get('/documents/:id', (req,res,next)=>{
    const id = parseInt(req.params.id, 10);
        data.map((docs) => {
            if (docs.id === id) {
            return res.status(200).send({
                success: 'true',
                message: 'Found it !',
                data :docs,
            });
            }
        });
        return res.status(404).send({
            success: "Nope",
            message:"ID is nowhere to be found"
        });
});
// Endpoint 2 getting document tags
//tags don't exist in the database, this url would search for a document by ID and display its tags
app.get('/tags/:id', (req,res, next)=>{
    const id = parseInt(req.params.id, 10);
    data.map((docs) => {
        if (docs.id === id) {
        return res.status(200).send({
            success: 'true',
            message: 'Found those tags !',
            data :docs.tags,
        });
        } 
    });
    return res.status(404).json();
    });
 
console.log(formatObject(old,New))



app.get('/function', (req,res,next)=>{
    try {
        return res.status(200).send({
            success: 'true',
            message: 'voici le résultat !',
            data : funcRes,
        });
    } catch (error) {
        return error
    }
})

// launching the runtime server and stuff

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})