
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../services/config";
import NavBar from "./NavBar";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Contact.css";
import Footer from "./Footer";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/contact`, formData);
      alert("Message envoyé avec succès ✅");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'envoi ❌");
    }
  };

  return (
    <div className="contact-page">
      <NavBar />

      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>

            <div className="contact-header">
              <div className="contact-eyebrow">
                <span>Nous contacter</span>
              </div>
              <h1 className="contact-title">
                Parlons de votre <em>projet</em>
              </h1>
            </div>

            <Card className="shadow-lg p-4">
              <Card.Body>

                <Form onSubmit={handleSubmit}>

                  <Form.Group className="mb-3">
                    <Form.Label>Votre nom</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Entrez votre nom"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Entrez votre email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Votre numéro"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      placeholder="Votre message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="danger" type="submit">
                      Envoyer message
                    </Button>
                  </div>

                </Form>

              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;

// import { useState } from "react";
// import axios from "axios";
// import { API_URL } from "../services/config";
// import NavBar from "./NavBar";
// import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
// const Contact = () => {

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: ""
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(`${API_URL}/contact`, formData);

//       alert("Message envoyé avec succès ✅");

//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         message: ""
//       });

//     } catch (error) {
//       console.log(error);
//       alert("Erreur lors de l'envoi ❌");
//     }
//   };

//   return (
   
//    <div>
//        <NavBar />
//          <>
  

//       <Container className="mt-5">
//         <Row className="justify-content-center">
//           <Col md={6}>

//             <Card className="shadow-lg p-4">
//               <Card.Body>

//                 <h3 className="text-center mb-4">
//                   Contactez-nous
//                 </h3>

//                 <Form onSubmit={handleSubmit}>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Votre nom</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="name"
//                       placeholder="Entrez votre nom"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                       type="email"
//                       name="email"
//                       placeholder="Entrez votre email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Téléphone</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="phone"
//                       placeholder="Votre numéro"
//                       value={formData.phone}
//                       onChange={handleChange}
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Message</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={4}
//                       name="message"
//                       placeholder="Votre message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Form.Group>

//                   <div className="d-grid">
//                     <Button variant="danger" type="submit">
//                       Envoyer message
//                     </Button>
//                   </div>

//                 </Form>

//               </Card.Body>
//             </Card>

//           </Col>
//         </Row>
//       </Container>
//     </>
    
//    </div>
//   );
// };

// export default Contact;