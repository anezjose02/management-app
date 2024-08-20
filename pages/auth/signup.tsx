import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { validationSchema } from '../validations/validationFormRegister';

const Signup = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registered!',
          text: 'Your account has been created successfully.',
          confirmButtonText: 'Proceed to Sign In',
        }).then(() => {
          router.push('/auth/signin');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: 'Something went wrong. Please try again later.',
        });
      }
    },
  });

  return (
    <div className="bg-light py-3 py-md-5 mt-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
              <div className="row">
                <div className="col-12">
                  <div className="col-12 d-flex justify-content-center">
                    <a href="#!">
                      <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" alt="Logo" width="175" height="57" />
                    </a>
                  </div>
                </div>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-danger">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="surname" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="surname"
                    name="surname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.surname}
                  />
                  {formik.touched.surname && formik.errors.surname ? (
                    <div className="text-danger">{formik.errors.surname}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="text-danger">{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
              </form>
              <div className="row">
                <div className="col-12">
                  <hr className="mt-5 mb-4 border-secondary-subtle" />
                  <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center">
                    <a href="/auth/signin" className="link-secondary text-decoration-none">Signin with your account</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
