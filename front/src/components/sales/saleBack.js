export default function SaleBack({ setMode, isEditing, setIsEditing }){

function handleClick(){

    if(isEditing){
        setMode("old");
        console.log("to old");
        setIsEditing(false);
    }
    else{
        setMode(null);
        console.log("to menu")
    }
}

return (
    
    <button onClick={handleClick}> BACK </button>
)

}