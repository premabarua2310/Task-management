import React,{useState,useEffect} from 'react'
import { Link, useNavigate,useParams } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const Productupdate = () => {
  useEffect(() => {
    isRole();
  }, []);
  const isRole = () => {
    const items = localStorage.getItem('usersinfo');
    if (items != null) {
      const loggedIn = JSON.parse(items);
      const usertoken = loggedIn.token;
      const decoded = jwt_decode(usertoken);
      const userRole = decoded.role;
        if (userRole ==='user') {
          navigate('/dashboard');
        }
    }
  }

  const navigate = useNavigate();
  const { id } = useParams();



  return (
    <>
<Container>
      <Row>
          <Col>
          <Card>
            <Card.Body>
              <Card.Title>Product Update</Card.Title>
            </Card.Body>
          </Card>
          </Col>
      </Row>
      </Container>

      <Container className="pt-3">
      <Row>
          <Col>
          <Card>


          </Card>
          </Col>
      </Row>
    </Container>
    </>
  )
}

export default Productupdate
