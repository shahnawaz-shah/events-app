import NavBar from "../../routes/NavBar";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { EventContext } from "../../EventContext";
import Card from 'react-bootstrap/Card';


export default function Dashboard({}) {
    const { loggedIn } = useContext(AuthContext);
    const { events } = useContext(EventContext);

    

    return (
        <div>
            <NavBar />
            <h1>Dashboard</h1><hr></hr>
            { loggedIn ? (
                <p>you are logged in</p>
            ) : (
                <p>you are not logged in</p>
            )}
            
            <Row>
                <Col>
                    <h4>Here are your upcoming scheduled events.</h4>
                    <p>To edit your events, head to the Manage events page.</p>
                    {events.length === 0 ? (
                        // <p>You have no events scheduled</p>
                        <Card className="p-4 shadow rounded w-100 mx-auto">
                          <Card.Body>
                                <Card.Title>No events available</Card.Title>
                                <Card.Text>You haven't added any events to your calender yet.</Card.Text>
                            </Card.Body>  
                        </Card>
                    ) : (
                     events.map(event => (
                    <Card key={event.id} className="p-4 shadow rounded w-100 mx-auto">
                    <Card.Body>
                        <Card.Title>{event.name}</Card.Title>
                        <Card.Text >{event.date} at {event.time}</Card.Text>
                        <Card.Text>{event.description}</Card.Text>
                        <Card.Text>{event.location}</Card.Text>
                    </Card.Body>
                    </Card>  
                    ))
                    )}
                    
                </Col>
            </Row>
        </div>
        

    );
};