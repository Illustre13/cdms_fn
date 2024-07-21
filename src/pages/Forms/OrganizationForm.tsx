import { Formik, Field, ErrorMessage } from "formik";
import { useRef, useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { organizationInfoIV, organizationInfoValidation } from "../../components/Authentication/SignUp.schema";

export interface ISignupProps {
    setSignupData?: any;
    formRef?: any;
  }

export const OrganizationForm: React.FC<ISignupProps> = ({
    setSignupData = () => {},
    formRef,
  }) => {
    const handleSave = (values: any) => {

        console.log("VALUES ---> ", values)
        setSignupData(values);
    };
    return (
      <Formik
      innerRef={formRef}
        initialValues={organizationInfoIV}
        validationSchema={organizationInfoValidation}
        onSubmit={handleSave}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="p-4">
              {/*
               * Name input field
               */}
  
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Name:
                </label>
                <div
                  className={
                    touched.name && errors.name
                      ? "has-error w-9/12"
                      : touched.name
                      ? "has-success w-9/12"
                      : "w-9/12"
                  }
                >
                  <div className="flex gap-5 max-md:flex-wrap">
                    <Field
                      name="name"
                      type="text"
                      id="name"
                      placeholder="Enter organization name"
                      className="flex-1 max-md:max-w-full form-input"
                      // value={values.name}
                      // onChange={(e: any) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>
  
              {/*
               * Display name input field
               */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="displayName"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Display Name:
                </label>
                <div
                  className={
                    touched.displayName && errors.displayName
                      ? "has-error w-9/12"
                      : touched.displayName
                      ? "has-success w-9/12"
                      : "w-9/12"
                  }
                >
                  <div className="flex gap-5 max-md:flex-wrap">
                    <Field
                      name="displayName"
                      type="text"
                      id="displayName"
                      placeholder="Enter organization display name"
                      className="flex-1 max-md:max-w-full form-input"
                    />
                  </div>
                  <ErrorMessage
                    name="displayName"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>
  
              {/*
               * Logo URL input field
               */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="logoUrl"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Logo URL:
                </label>
                <div
                  className={
                    touched.logoUrl && errors.logoUrl
                      ? "has-error w-9/12"
                      : touched.logoUrl
                      ? "has-success w-9/12"
                      : "w-9/12"
                  }
                >
                  <div className="flex gap-5 max-md:flex-wrap">
                    <Field
                      name="logoUrl"
                      type="text"
                      id="logoUrl"
                      placeholder="Enter organization logo url"
                      className="flex-1 max-md:max-w-full form-input"
                    />
                  </div>
                  <ErrorMessage
                    name="logoUrl"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>
  
              {/*
               * About Us input field
               */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="aboutUs"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  About Us:
                </label>
                <div
                  className={
                    touched.aboutUs && errors.aboutUs
                      ? "has-error w-9/12"
                      : touched.aboutUs
                      ? "has-success w-9/12"
                      : "w-9/12"
                  }
                >
                  <div className="flex gap-2 px-px max-md:flex-wrap">
                    <div className="flex flex-1 gap-2 max-md:flex-wrap">
                      <Field
                        name="aboutUs"
                        type="text"
                        id="aboutUs"
                        placeholder="Enter organization about us"
                        className="flex-1 max-md:max-w-full form-input"
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="aboutUs"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>
  
              {/*
               * Mission input field
               */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="mission"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Mission:
                </label>
                <div
                  className={
                    touched.mission && errors.mission
                      ? "has-error w-9/12"
                      : touched.mission
                      ? "has-success w-9/12"
                      : "w-9/12"
                  }
                >
                  <div className="flex gap-2 px-px max-md:flex-wrap">
                    <div className="flex flex-1 gap-2 max-md:flex-wrap">
                      <Field
                        name="mission"
                        type="text"
                        id="mission"
                        placeholder="Enter organization mission"
                        className="flex-1 max-md:max-w-full form-input"
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="mission"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>
  
              {/*
               * VisionMission input field
               */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="vision"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Vision:
                </label>
                <div
                  className={
                    touched.vision && errors.vision
                      ? "has-error w-9/12"
                      : touched.vision
                      ? "has-success w-9/12"
                      : "w-9/12"
                  }
                >
                  <div className="flex gap-2 px-px max-md:flex-wrap">
                    <div className="flex flex-1 gap-2 max-md:flex-wrap">
                      <Field
                        name="vision"
                        type="text"
                        id="vision"
                        placeholder="Enter organization vision"
                        className="flex-1 max-md:max-w-full form-input"
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="vision"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>
  
              {/*
               * Industry select field
               */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Industry:
                </label>
                <div
                  className={
                    touched.industry && errors.industry
                      ? "has-error w-9/12"
                      : touched.industry
                      ? "has-success w-9/12"
                      : "w-9/12"
                  }
                >
                  <div className="flex gap-2 px-px max-md:flex-wrap">
                    <div className="flex flex-1 gap-2 max-md:flex-wrap">
                      <Field
                        name="industry"
                        id="industry"
                        label="Select your organization industry"
                        component="select"
                        className="flex-1 max-md:max-w-full form-input"
                      >
                        <option value="male">
                          Select your organization industry
                        </option>
                        <option value="Health">Health</option>
                        <option value="Education">Education</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Energy">Energy</option>
                        <option value="Water and Sanitation">
                          Water and Sanitation
                        </option>
                        <option value="Finance and Banking">
                          Finance and Banking
                        </option>
                        <option value="Telecommunications">
                          Telecommunications
                        </option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Tourism">Tourism</option>
                        <option value="Public Administration">
                          Public Administration
                        </option>
                      </Field>
                    </div>
                  </div>
                  <ErrorMessage
                    name="industry"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>
  
              {/*
               * Address input field
               */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Address:
                </label>
                <div
                  className={
                    touched.address && errors.address
                      ? "has-error w-9/12"
                      : touched.address
                      ? "has-success w-9/12"
                      : "w-9/12"
                  }
                >
                  <div className="flex gap-2 px-px max-md:flex-wrap">
                    <div className="flex flex-1 gap-2 max-md:flex-wrap">
                      <Field
                        name="address"
                        type="text"
                        id="address"
                        placeholder="Enter organization address"
                        className="flex-1 max-md:max-w-full form-input"
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>
  
              {/*
               * RSSB Number input field
               */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Phone No:
                </label>
                <div
                  className={
                    touched.phoneNumber && errors.phoneNumber
                      ? "has-error w-9/12"
                      : touched.phoneNumber
                      ? "has-success w-9/12"
                      : "w-9/12"
                  }
                >
                  <div className="flex gap-2 px-px max-md:flex-wrap">
                    <div className="flex flex-1 gap-2 max-md:flex-wrap">
                      <Field
                        name="phoneNumber"
                        type="text"
                        id="phoneNumber"
                        placeholder="Enter organization phone number"
                        className="flex-1 max-md:max-w-full form-input"
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>
  
              {/*
               * email input field
               */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Email:
                </label>
                <div
                  className={
                    touched.email && errors.email
                      ? "has-error w-9/12"
                      : touched.email
                      ? "has-success w-9/12"
                      : "w-9/12"
                  }
                >
                  <div className="flex gap-2 px-px max-md:flex-wrap">
                    <div className="flex flex-1 gap-2 max-md:flex-wrap">
                      <Field
                        name="email"
                        type="text"
                        id="email"
                        placeholder="Enter organization email address"
                        className="flex-1 max-md:max-w-full form-input"
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>
  
              {/*
               * Website input field
               */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Website:
                </label>
                <div
                  className={
                    touched.website && errors.website
                      ? "has-error w-9/12"
                      : touched.website
                      ? "has-success w-9/12"
                      : "w-9/12"
                  }
                >
                  <div className="flex gap-2 px-px max-md:flex-wrap">
                    <div className="flex flex-1 gap-2 max-md:flex-wrap">
                      <Field
                        name="website"
                        type="text"
                        id="website"
                        placeholder="Enter organization website"
                        className="flex-1 max-md:max-w-full form-input"
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="website"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>
  
              {/*
               * TIN No input field
               */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="tinNo"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Tin No:
                </label>
                <div
                  className={
                    touched.tinNo && errors.tinNo
                      ? "has-error w-9/12"
                      : touched.tinNo
                      ? "has-success w-9/12"
                      : "w-9/12"
                  }
                >
                  <div className="flex gap-2 px-px max-md:flex-wrap">
                    <div className="flex flex-1 gap-2 max-md:flex-wrap">
                      <Field
                        name="tinNo"
                        type="text"
                        id="tinNo"
                        placeholder="Enter organization tin number"
                        className="flex-1 max-md:max-w-full form-input"
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="tinNo"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
  };