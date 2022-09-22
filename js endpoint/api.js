import express from 'express';
import fetch from 'node-fetch';
import cors from "cors";

const app= express();
const url = `http://127.0.0.1:7003/documents`;
app.use(cors({origin: '*'}));


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
    
function tagProcess(a1, a2) {
        var result = [];
        let intersection = a1.filter(x => a2.includes(x));
        result.push(intersection)
        let diffL = a2.filter(x => !a1.includes(x));
        result.push(diffL.map(x=> x.strike()))
        let diffR = a1.filter(x => !a2.includes(x));
        result.push(diffR.map(x=> x.bold()))
        var merged = [].concat.apply([], result);
        console.log(merged)
        return merged;
      }

function formatObject(oldest, latest){

    if(latest.is_serious){
        latest.is_serious = "yes"
    }
    else{
        latest.is_serious = "no"
    }
    if(oldest.is_serious){
        oldest.is_serious = "yes"
    }
    else{
        oldest.is_serious = "no"
    }

    if(latest.name != oldest.name ){
        latest.name = latest.name.bold() +','+oldest.name.strike()
    }
    if(latest.number_of_employees != oldest.number_of_employees){
        latest.number_of_employees = (latest.number_of_employees.toString()) +','+ (oldest.number_of_employees.toString()).strike()
    }
    if(latest.is_serious != oldest.is_serious){
        latest.is_serious.bold() +','+oldest.is_serious.strike()
    }
    latest.tags = tagProcess(latest.tags, oldest.tags)
    
    return JSON.stringify(latest);
}

const funcRes = formatObject(old, New);

async function getData(){
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json.data
      } catch (error) {
        console.log(error);
        return error
      }
}

const data = await getData()


// Endpoint 1 getting document by ID
app.get('/documents/:id', (req,res,next)=>{
    const id = parseInt(req.params.id, 10);
    try {
        data.map((docs) => {
            if (docs.id === id) {
            return res.status(200).send({
                success: 'true',
                message: 'Found it !',
                data :docs,
            });
            } 
        });
    } catch (error) {
        return res.status(404).json();
    }
});
// Endpoint 2 getting document tags
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
// launching the runtime server

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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})