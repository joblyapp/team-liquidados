import { useNavigate } from "react-router-dom";

export default function SaleBack({ setMode, toMenu, setIsEditing }) {

    const navigate = useNavigate();

    function handleClick() {

        if(toMenu){
            navigate("/");
        }

        setMode("old");
        console.log("to old");
        setIsEditing(false);
    }

    return (

        <button onClick={handleClick}> BACK </button>
    )

}