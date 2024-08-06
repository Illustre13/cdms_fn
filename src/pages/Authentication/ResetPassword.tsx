import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconLock from "../../components/Icon/IconLock";
import { useState, ChangeEvent, FormEvent, createRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { verifyOTP } from "../../redux/action/2FAAction";
import { fetchUserInfo } from "../../redux/action/UserAction";
import { IRootState } from "../../redux/store";
import { Link } from "react-router-dom";
import IconMenuApps from "../../components/Icon/Menu/IconMenuApps";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik } from "formik";
import { handleResetPassword } from "../../redux/action/loginAction";
import { StateOptions } from "../../util/enum";


export const ResetPassword = () => {
  const { error } = useSelector((state: IRootState) => state.tfa);
  const { status } = useSelector((state: IRootState) => state.getOtp);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Validation Schema
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    initialPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Initial password is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });
  
  // Initial Values
  const initialValues = {
    email: '',
    initialPassword: '',
    password: '',
    confirmPassword: '',
  };

  
	const rPasswordState = useSelector((state: IRootState) => state.reset);

useEffect(() => {
    if (rPasswordState.state === StateOptions.FULFILLED) {
        toast.success(rPasswordState.message, {
            type: "success",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        setTimeout(() => {
            navigate("/cdms-signin");
          }, 1000);

      } else if (rPasswordState.state === StateOptions.REJECTED) {
        toast.error(rPasswordState.message || rPasswordState.data, {
            type: "error",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
      }
}, [rPasswordState]);

  const handleSubmit = (values: any) => {
    // debugger;
    const userCredentials = {
        email: values?.email,
        password: values?.initialPassword,
        newPassword: values?.confirmPassword,
    };
    debugger;
    dispatch(handleResetPassword(userCredentials) as any);
  };

  return (
    <div className="bg-cdms_primary h-screen">
      <div className="flex justify-start pt-8 pl-8">
        <Link to="/" className="main-logo flex items-center shrink-0">
          <img
            className="w-32 ltr:-ml-1 rtl:-mr-1 inline"
            src="/assets/images/cdms_logo_002.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex items-center flex-col justify-center my-auto">
        <div className="rounded-xl p-2 sm:px-10 col-start-2 col-end-12 md:col-start-4 md:col-end-10 xl:col-start-5 xl:col-end-9 my-10 pb-10 bg-white">
          <IconMenuApps
            className={`mx-auto my-5 h-16 w-16`}
          />
          <h3 className="text-center font-semibold text-2xl font-mono">
            Reset Password
          </h3>
          <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-2 flex items-center space-x-4">
                <label
                  htmlFor="email"
                  className="block text-left text-sm font-medium text-gray-700 w-32"
                >
                  Email:
                </label>
                <div className="flex flex-col mb-2">

                     <Field
                  type="email"
                  name="email"
                  id="email"
                  className="form-input w-full border-2 rounded-md p-1"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                </div>
               
              </div>

              <div className="mb-2 flex items-center space-x-4">
                <label
                  htmlFor="initialPassword"
                  className="block text-left text-sm font-medium text-gray-700 w-32"
                >
                  Initial Password:
                </label>
                <div className="flex flex-col mb-2">

                    <Field
                  type="password"
                  name="initialPassword"
                  id="initialPassword"
                  className="form-input w-full border-2 rounded-md p-1"
                />
                <ErrorMessage
                  name="initialPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                </div>
                
              </div>

              <div className="mb-2 flex items-center space-x-4">
                <label
                  htmlFor="password"
                  className="block text-left text-sm font-medium text-gray-700 w-32"
                >
                  New Password:
                </label>
                <div className="flex flex-col mb-2">

                    <Field
                  type="password"
                  name="password"
                  id="password"
                  className="form-input w-full border-2 rounded-md p-1"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                </div>
                
              </div>
              <div className="mb-2 flex items-center space-x-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-left text-sm font-medium text-gray-700 w-32"
                >
                  Confirm Password:
                </label>

                <div className="flex flex-col mb-2">
<Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="form-input w-full border-2 rounded-md p-1"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                    
                </div>
                
              </div>
              <div className="flex justify-center mt-4">
  <button
    type="submit"
    disabled={isSubmitting}
    className="py-2 px-4 bg-cdms_primary text-white font-bold rounded-md"
  >
    Reset Password
  </button>
</div>
            </Form>
          )}
        </Formik>
        </div>
        <div>


     

        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
