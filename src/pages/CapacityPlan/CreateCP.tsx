import { Form, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setPageTitle } from "../../redux/reducer/themeConfigSlice";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import {
  addCapacityPlan,
  fetchAllCapacityPlan,
} from "../../redux/action/capacityPlanAction";
import { useAppDispatch } from "../../redux/hooks";
import IconArrowBackward from "../../components/Icon/IconArrowBackward";
import Tippy from "@tippyjs/react";
import IconEdit from "../../components/Icon/IconEdit";
import { IRootState } from "../../redux/store";
import { CapacityPlanLevel, CapacityPlanStatus } from "../../util/enum";

const Add = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Add Capacity Plan"));
  }, [dispatch]);

  const fetchCapacityPlanState = useSelector(
    (state: IRootState) => state.capacityPlan.fetchState
  );

  const cpData = fetchCapacityPlanState?.data?.data;
  const rdbCPData = cpData?.capacityPlans[0];

  const handleSubmit = (values: any) => {
    dispatch(addCapacityPlan(values));
  };

  interface cpFilters {
    level?: any;
    year?: number;
  }

  const [level, setLevel] = useState<any>(CapacityPlanLevel.NATIONAL);
  const [year, setYear] = useState<any>(new Date().getFullYear());
  const cpFilters: cpFilters = {
    level: level,
    year: year,
  };

  useEffect(() => {
    dispatch(fetchAllCapacityPlan(cpFilters));
  }, [level, year, dispatch]);

  const [isEditingMode, setIsEditingMode] = useState(false);

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    type: Yup.string()
      .required("Type is required")
      .oneOf(["ANNUAL_PLAN", "QUARTELY_PLAN"], "Invalid type"),
      level: Yup.string()
      .required("Type is required")
      .oneOf(["NATIONAL"], "Invalid level"),
    year: Yup.number()
      .required("Year is required")
      .integer("Year must be an integer")
      .min(1900, "Year must be at least 1900")
      .max(new Date().getFullYear(), "Year cannot be in the future"),
    budget: Yup.number()
      .required("Budget is required")
      .positive("Budget must be a positive number")
      .min(0, "Budget must be greater than or equal to 0"),
    currency: Yup.string()
      .required("Currency is required")
      .oneOf(["RWF", "USD", "EUR"], "Invalid currency"),
  });

  const getInitialFormValues = (rdbCPData: any) => ({
    title: rdbCPData?.title || "",
    description: rdbCPData?.description || "",
    type: rdbCPData?.type || "",
    level: rdbCPData?.level || "",
    year: rdbCPData?.year || "",
    budget: rdbCPData?.totalBudget.toLocaleString() || "",
    currency: rdbCPData?.currency || "",
  });
  return (
    <>
      <div className="gap-4">
        <div className="flex flex-col w-full gap-4 pt-4 pb-8">
          <Link to="/cp/overview" className="flex items-center">
            <div className="flex flex-row gap-2 font-bold text-sm">
              <IconArrowBackward />
              <span>Back to overview</span>
            </div>
          </Link>
          <span className="flex flex-row gap-2 font-bold text-xl">
            RDB Capacity Plan
          </span>
        </div>
      </div>
      <div className="panel flex xl:flex-row flex-col gap-4">
        <div className="flex flex-col xl:w-full w-full gap-4">
          <div className="flex item-right gap-4 justify-between pr-4">
            <span></span>
            <div className="flex flex-row item-right gap-4 justify-right">
              {/* Submit Info */}

              {isEditingMode && (
                <div className="sm:col-span-2 mt-4 flex justify-end">
                  <button
                    type="submit"
                    className={`bg-cdms_primary text-white py-2 px-4 -mt-4 rounded-md hover:bg-cdms_secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                  >
                    Save
                  </button>
                </div>
              )}

              <Tippy content="Edit" placement="top">
                <div onClick={() => setIsEditingMode(!isEditingMode)}>
                  <IconEdit className="w-8 h-8 cursor-pointer" />
                </div>
              </Tippy>
            </div>
          </div>
          {cpData && rdbCPData && (
            <Formik
              initialValues={getInitialFormValues(rdbCPData)}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="p-4">
                    {/* Title input field */}
                    <div className="py-2 flex flex-row gap-2">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 w-3/12"
                      >
                        Title:
                      </label>
                      <div
                        className={
                          touched.title && errors.title
                            ? "has-error w-9/12"
                            : "w-9/12"
                        }
                      >
                        <Field
                          name="title"
                          type="text"
                          id="title"
                          placeholder="Enter capacity plan title"
                          className={`flex-1 form-input ${!isEditingMode ? "text-gray-500" : ""}`}
                          disabled={!isEditingMode}
                        />
                        <ErrorMessage
                          name="title"
                          component="div"
                          className="text-align-left text-danger mt-1"
                        />
                      </div>
                    </div>

                    {/* Description input field */}
                    <div className="py-2 flex flex-row gap-2">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 w-3/12"
                      >
                        Description:
                      </label>
                      <div
                        className={
                          touched.description && errors.description
                            ? "has-error w-9/12"
                            : "w-9/12"
                        }
                      >
                        <Field
                          name="description"
                          as="textarea"
                          id="description"
                          placeholder="Enter capacity plan description"
                          className={`flex-1 h-48 form-input ${!isEditingMode ? "text-gray-500" : ""}`}
                          disabled={!isEditingMode}
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>
                    </div>

                    {/* Level select field */}
                    <div className="py-2 flex flex-row gap-2">
                      <label
                        htmlFor="level"
                        className="block text-sm font-medium text-gray-700 w-3/12"
                      >
                        Level:
                      </label>
                      <div
                        className={
                          touched.level && errors.level
                            ? "has-error w-9/12"
                            : "w-9/12"
                        }
                      >
                        <Field
                          name="type"
                          as="select"
                          id="level"
                          className={`flex-1 form-input ${!isEditingMode ? "text-gray-500" : ""}`}
                          disabled={!isEditingMode}
                        >
                          <option value="NATIONAL">NATIONAL</option>
                        </Field>
                        <ErrorMessage
                          name="type"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>
                    </div>

                    {/* Year input field */}
                    <div className="py-2 flex flex-row gap-2">
                      <label
                        htmlFor="year"
                        className="block text-sm font-medium text-gray-700 w-3/12"
                      >
                        Year:
                      </label>
                      <div
                        className={
                          touched.year && errors.year
                            ? "has-error w-9/12"
                            : "w-9/12"
                        }
                      >
                        <Field
                          name="year"
                          type="number"
                          id="year"
                          placeholder="Enter year"
                          className={`flex-1 form-input ${!isEditingMode ? "text-gray-500" : ""}`}
                          disabled={!isEditingMode}
                        />
                        <ErrorMessage
                          name="year"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>
                    </div>


                    {/* Budget input field */}
                    <div className="py-2 flex flex-row gap-2">
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium text-gray-700 w-3/12"
                      >
                        Budget:
                      </label>
                          {/* Currency select field */}
                          <div
                        className={
                          touched.currency && errors.currency
                            ? "has-error w-2/12"
                            : touched.currency
                            ? "has-success w-2/12"
                            : "w-2/12"
                        }
                      >
                        <Field
                          name="currency"
                          as="select"
                          id="currency"
                          className={`flex-1 form-input ${!isEditingMode ? "text-gray-500" : ""}`}
                          disabled={!isEditingMode}
                        >
                          <option value="" label="Select currency" />
                          <option value="RWF" label="RWF" />
                          <option value="USD" label="USD" />
                          <option value="EUR" label="EUR" />
                        </Field>
                        <ErrorMessage
                          name="currency"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>
                      <div
                        className={
                          touched.budget && errors.budget
                            ? "has-error w-7/12"
                            : touched.budget
                            ? "has-success w-7/12"
                            : "w-7/12"
                        }
                      >
                        <Field
                          name="budget"
                          type="text"
                          id="budget"
                          placeholder="Enter budget"
                          className={`flex-1 form-input ${!isEditingMode ? "text-gray-500" : ""}`}
                          disabled={!isEditingMode}
                        />
                        <ErrorMessage
                          name="budget"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </>
  );
};

export default Add;
