import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import validationSchema from '../validations/validationSchema';  
import { useFormik } from 'formik';  

const DataForm = ({ initialData, saveData, onCancel, userId }) => {
  const formik = useFormik({
    initialValues: {
      cedula: '',
      nombre: '',
      patrono: '',
      razonSocial: '',
      tel1: '',
      tel2: '',
      salario: '',
      active: 1,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...values, userId: Number(userId) }),
        });

        if (!response.ok) {
          throw new Error('Error saving data');
        }

        const result = await response.json();
        saveData(result);
        onCancel();
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (initialData) {
      formik.setValues(initialData);
    }
  }, [initialData]);

  return (
    <div className="bg-light py-3 py-md-5 mt-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
              <Form onSubmit={formik.handleSubmit}>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formCedula">
                      <Form.Label>ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="cedula"
                        value={formik.values.cedula}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.cedula && !!formik.errors.cedula}
                        disabled={!!initialData}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.cedula}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formNombre">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.nombre && !!formik.errors.nombre}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.nombre}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formPatrono">
                      <Form.Label>Patron</Form.Label>
                      <Form.Control
                        type="text"
                        name="patrono"
                        value={formik.values.patrono}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.patrono && !!formik.errors.patrono}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.patrono}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formRazonSocial">
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="razonSocial"
                        value={formik.values.razonSocial}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.razonSocial && !!formik.errors.razonSocial}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.razonSocial}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formTel1">
                      <Form.Label>Phone 1</Form.Label>
                      <Form.Control
                        type="text"
                        name="tel1"
                        value={formik.values.tel1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.tel1 && !!formik.errors.tel1}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.tel1}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formTel2">
                      <Form.Label>Phone 2</Form.Label>
                      <Form.Control
                        type="text"
                        name="tel2"
                        value={formik.values.tel2}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.tel2 && !!formik.errors.tel2}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.tel2}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formSalario">
                      <Form.Label>Salary</Form.Label>
                      <Form.Control
                        type="text"
                        name="salario"
                        value={formik.values.salario}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.salario && !!formik.errors.salario}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.salario}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit" className='mt-2'>
                  {initialData ? 'Save Changes' : 'Add'}
                </Button>{' '}
                <Button variant="secondary" onClick={onCancel} className='mt-2'>
                  Cancel
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataForm;
