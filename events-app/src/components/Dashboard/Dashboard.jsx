import NavBar from "../../routes/NavBar";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Dashboard({}) {
    const { loggedIn } = useContext(AuthContext);

    

    return (
        <div>
            <NavBar />
            <h1>Dashboard page</h1><hr></hr>
            { loggedIn ? (
                <p>you are logged in</p>
            ) : (
                <p>you are not logged in</p>
            )}
        </div>

    );
};