import { Container, Row , Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import products from '../data.json'
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import Pagination from "../Pagination/Pagination";
import { useState } from 'react';
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function Brands() {
  useEffect(() => {
    AOS.init({ duration: 1700 });
  }, []);
  const {id} = useParams();
  let items = products.filter((items) => items.brands.id == id);
  console.log(items);
  let b = products.filter((b) => b.brands.id == id);
  b = b[0];
  const PER_PAGE = 4;
  const [currentPage,setcurrentPage] = useState(0);
  const handPageClick = ({selected: selecTedPage}) => {
    setcurrentPage(selecTedPage);
  };
  const offset = currentPage * PER_PAGE;
  const currentPageData = items.slice(offset,offset + PER_PAGE);
  const pageCount = Math.ceil(items.length / PER_PAGE);
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Container>
      {b == null && (
        <Alert>
          <h1 className='text-center'>Updating Products...</h1>
        </Alert>
      )}
      
    <Row>
      <Col xs={12} sm={12} md={12}>
        {b != null && <h1>{b.brands.name} </h1>}
      </Col>
    </Row>
    <div >
    <Row>
      {currentPageData.map((items, index) => (
      <Col xs={12} sm={6} md={3} key={index} className='a2'>
      <Card className='boder01'>
      <Link to={`/detail/${items.id}`}>
    <Card.Img variant="top" src={items.img} data-aos="zoom-in" alt={items.name}/>
        </Link>
    <Card.Body data-aos="zoom-in">
    <Link to={`/detail/${items.id}`}>
      <Card.Title>{items.name}</Card.Title>
      </Link>
      <Card.Text>${items.price}
      </Card.Text>
      <Link to={`/detail/${items.id}`}>
      <Button variant="primary"> Detail</Button>
      </Link>
    </Card.Body>
  </Card>
  </Col>
  ))}
  </Row>
  </div>
  <Row>
    <Col>
    <div className='card pagination'>
    <Pagination pageCount={pageCount} handPageClick={handPageClick}/>
    </div>
    </Col>
  </Row>
  
  </Container>
  </motion.div>
  )
}

export default Brands