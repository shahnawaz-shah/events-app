import NavBar from "../../routes/NavBar";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { EventContext } from "../../EventContext";

const validate = (values) => {
  const errors = {};

  // validation for name
  if (!values.name) {
    errors.name = "Event name is required";
  }

  // validation for date
  if (!values.date) {
    errors.date = "Date is required";
  } else if (isNaN(Date.parse(values.date))) {
    errors.date = "Invalid date format";
  }

  // validation for time
  if (!values.time) {
    errors.time = "Time is required";
  } else if (!/^\d{2}:\d{2}$/.test(values.time)) {
    errors.time = "Invalid time format (HH:MM)";
  }

  // validation for description
  if (!values.description) {
    errors.description = "Description is required";
  }

  //validation for location
  if (!values.location) {
    errors.location = "Location is required";
  }

  return errors;
};

export default function ManageEvents() {
  const { loggedIn } = useContext(AuthContext);
  const { events, setEvents } = useContext(EventContext);
  const [editingEventID, setEditingEventID] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      time: "",
      description: "",
      location: "",
    },
    validate,
    onSubmit: (values) => {
      // submit handling code goes here
      //logic for updating an event else adding new event 
      if (editingEventID) {
        const updatedEvents = events.map((ev) =>
          ev.id === editingEventID ? { ...ev, ...values } : ev
        );
        setEvents(updatedEvents);
        setEditingEventID(null);
      } else {
        const newEvent = {
          id: Date.now(),
          name: values.name,
          date: values.date,
          time: values.time,
          description: values.description,
          location: values.location,
        };

        setEvents([...events, newEvent]);
        console.log("Submitting form values with", values);
      }
    //   reset form fields
      formik.resetForm();
    },
  });
//   useEffect for editing an event
  useEffect(() => {
    if (editingEventID) {
      const eventToEdit = events.find((ev) => ev.id === editingEventID);
      if (eventToEdit) {
        formik.setValues({
          name: eventToEdit.name,
          date: eventToEdit.date,
          time: eventToEdit.time,
          description: eventToEdit.description,
          location: eventToEdit.location,
        });
      }
    }
  }, [editingEventID, events]);
//   function to handle delete button
  const handleDelete = (idToDelete) => {
    setEvents(events.filter((ev) => ev.id !== idToDelete));
  };

  return (
    <div>
      <NavBar />
      <h1>Manage events</h1>
      <hr></hr>
      <Container>
        <Row>
          <Col>
            <Form
              className="p-4 shadow rounded w-100 mx-auto"
              onSubmit={formik.handleSubmit}
            >
              <h4>Use the form below to add or edit your events.</h4>
              {/*name*/}
              <Form.Group className="mb-3">
                <Form.Label>Event name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  maxLength={32}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.name && !!formik.errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              {/* date */}
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.date && !!formik.errors.date}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.date}
                </Form.Control.Feedback>
              </Form.Group>

              {/* time */}
              <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.time && !!formik.errors.time}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.time}
                </Form.Control.Feedback>
              </Form.Group>

              {/*description*/}
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.description && !!formik.errors.description
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              {/*description*/}
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.location && !!formik.errors.location
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.location}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="w-100">
                {editingEventID ? "Save changes" : "Add event"}
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            {events.map((event) => (
              <Card className="p-4 shadow rounded w-100 mx-auto">
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Text>
                    {event.date} at {event.time}
                  </Card.Text>
                  <Card.Text>{event.description}</Card.Text>
                  <Card.Text>{event.location}</Card.Text>
                  <Button
                    variant="primary"
                    style={{ margin: 10 }}
                    onClick={() => setEditingEventID(event.id)}
                  >
                    Edit event
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete event
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
