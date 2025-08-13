import { getInput } from "./weather";
export function populateInput () {

    let input = document.querySelector("input");
    let info = document.querySelector(".info");
    let submitBtn = document.querySelector(".submit")
    
    let locationInput
    let data

    input.addEventListener("keyup", () => {
        locationInput = `${input.value}`;
        console.log(locationInput);
    });

    window.addEventListener("keypress",async (event) =>{
        if(event.key === "Enter"){
            data = await getInput(locationInput);
            info.textContent = data.address;
            console.log(data)
            if (data.address === undefined){
                alert("Please enter another location")
            }
        }
    })

    submitBtn.addEventListener("click",async () =>{
        data = await getInput(locationInput);
        info.textContent = data.address;
        console.log(data);
        if (data.address === undefined){
            alert("Please enter another location")
        }
    })
    
}