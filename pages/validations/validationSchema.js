import * as Yup from 'yup';

const validationSchema = Yup.object({
    cedula: Yup.string()
        .matches(/^[0-9]+$/, 'ID must be only numbers')
        .max(12, 'ID must be at most 12 digits')
        .trim()
        .required('ID is required'),

    nombre: Yup.string()
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Full Name must contain only letters')
        .max(30, 'Full Name must be at most 30 characters')
        .trim()
        .required('Full Name is required'),

    patrono: Yup.string()
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Patron must contain only letters')
        .max(30, 'Patron must be at most 30 characters')
        .trim()
        .required('Patron is required'),

    razonSocial: Yup.string()
        .max(40, 'Company Name must be at most 40 characters')
        .trim()
        .required('Company Name is required'),

    tel1: Yup.string()
        .matches(/^[0-9]+$/, 'Phone 1 must be only numbers')
        .max(10, 'Phone 1 must be at most 10 digits')
        .trim()
        .required('Phone 1 is required'),

    tel2: Yup.string()
        .matches(/^[0-9]+$/, 'Phone 2 must be only numbers')
        .max(10, 'Phone 2 must be at most 10 digits')
        .trim(),

    salario: Yup.string()
        .matches(/^[0-9]+$/, 'Salary must be only numbers')
        .max(10, 'Salary must be at most 10 digits')
        .trim()
        .required('Salary is required'),
});

export default validationSchema;