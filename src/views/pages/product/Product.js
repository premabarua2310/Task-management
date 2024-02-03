
import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
const Product = () => {


  useEffect(() => {
    isRole();
  }, []);

  const navigate = useNavigate();
  const items = JSON.parse(localStorage.getItem('usersinfo'));
  const usertoken = items.token;
  const decoded = jwt_decode(usertoken);
  const userId = decoded.uid;
  const userName = decoded.username;
  const userRole = decoded.role;

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




  return (
    <>
     <Container>
      <Row>
          <Col>
          <Card>
              <Card.Body>
              <Row>
              <Col><Card.Title>Add New Product</Card.Title></Col>
              <Col className=" d-flex justify-content-end"><Link to={"/addproduct"} ><Button  variant="primary" size="sm">Add Product</Button></Link></Col>
              </Row>
            </Card.Body>
          </Card>
          </Col>
      </Row>
      </Container>
      <Container className="pt-3">
      <Row>
          <Col>
          <Card>
            <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><Link to={`/editproduct/1`}><Button variant="outline-primary" size="sm">Edit</Button></Link> || <Button variant="outline-danger" size="sm" >Delete</Button></td>
                </tr>
              </tbody>
            </Table>
            </Card.Body>
          </Card>
          </Col>
      </Row>
    </Container>
    </>
  )
}

export default Product
