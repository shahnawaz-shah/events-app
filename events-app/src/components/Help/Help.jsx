import NavBar from "../../routes/NavBar";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

export default function Help() {
    const { loggedIn } = useContext(AuthContext);
    

    return (
        <div>
            <NavBar />
            <h1>Help</h1><hr></hr>
            { loggedIn ? (
                <p>you are logged in</p>
            ) : (
                <p>you are not logged in</p>
            )}
        </div>

    );
};