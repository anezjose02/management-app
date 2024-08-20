import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';


const DataDetails = ({ data, onBack }) => {
  if (!data) {
    return null;
  }

  return (
    <div className="bg-light py-3 py-md-5 mt-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
              <Row className="mb-3 mt-2 justify-content-md-center">
                <Col className="text-center">
                  <h2><strong>Registration Details:</strong></h2>
                </Col>
              </Row>
              <Row className="mb-3 mt-2">
                <Col><strong>ID:</strong> {data.cedula}</Col>
              </Row>
              <Row className="mb-3">
                <Col><strong>Full name:</strong> {data.nombre}</Col>
              </Row>
              <Row className="mb-3">
                <Col><strong>Patron:</strong> {data.patrono}</Col>
              </Row>
              <Row className="mb-3">
                <Col><strong>Company Name:</strong> {data.razonSocial}</Col>
              </Row>
              <Row className="mb-3">
                <Col><strong>Phone 1:</strong> {data.tel1}</Col>
              </Row>
              <Row className="mb-3">
                <Col><strong>Phone 2:</strong> {data.tel2 ? data.tel2 : 'N/A'}</Col>
              </Row>
              <Row className="mb-3">
                <Col><strong>Salary:</strong> {data.salario}</Col>
              </Row>
              <Row className="mb-3">
                <Col><strong>Estado:</strong> {data.active ? 'Active' : 'Idle'}</Col>
              </Row>

              <Button variant="secondary" onClick={onBack}>
                Return
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDetails;
