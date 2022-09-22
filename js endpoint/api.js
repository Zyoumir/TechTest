import express from 'express';
import fetch from 'node-fetch';

const app= express();
const url = `http://127.0.0.1:7003/documents`;
const options = {
	method: 'GET',
	headers: {
		"Content-Type": "application/json"
	}
};

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
        latest.number_of_employees = (latest.number_of_employees.toString()).bold() +','+ (oldest.number_of_employees.toString()).strike()
    }
    if(latest.is_serious != oldest.is_serious){
        latest.is_serious.bold() +','+oldest.is_serious.strike()
    }
    latest.tags = tagProcess(latest.tags, oldest.tags)
    
    return JSON.stringify(latest);
}

async function getData(){
    fetch(url, options)
	.then(res => res.json())
	.then(json => console.log('data fetched successfully!'))
	.catch(err => console.error('error:' + err));

    try {
        const res = await fetch(url, options);
        const json = await res.json();
        return json.data
    } catch (err) {
        return err;
    }
}

const data = await getData()


// Endpoint 1 getting document by ID
app.get('/documents/:id', (req,res)=>{
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
    success: 'false',
    message: 'You sure about that id of yours ?',
    });
    });
// Endpoint 2 getting document tags
app.get('/tags/:id', (req,res)=>{
    const id = parseInt(req.params.id, 10);
    data.map((docs) => {
        if (docs.id === id) {
        return res.status(200).send({
            success: 'true',
            message: 'Found it !',
            data :docs.tags,
        });
        } 
    });
    return res.status(404).send({
    success: 'false',
    message: 'You sure about that id of yours ?',
    });
    });
 
console.log(formatObject(old,New))
// launching the runtime server

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})