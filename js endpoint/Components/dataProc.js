
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

export default function formatObject(oldest, latest){

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


