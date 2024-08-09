import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="bg-cdms_primary h-screen">
      <div className="flex justify-start pt-8 pl-8">
        <Link to="/" className="main-logo flex items-center shrink-0">
          <img
            className="w-24 ltr:-ml-1 rtl:-mr-1 inline"
            src="/assets/images/cdms_logo_002.png"
            alt="logo"
          />
        </Link>
      </div>
      <div>
        <div className="flex flex-col justify-center text-center mt-8 font-semibold dark:text-white">
          <h2 className="mb-5 text-3xl font-bold text-white md:text-5xl">
            404 - NOT FOUND
          </h2>
          <h4 className="mb-7 text-xl sm:text-2xl">
            Please visit us again shortly.
          </h4>
        </div>

        <Link
          to="/"
          className="btn btn-primary bg-white text-cdms_primary mx-auto !mt-7 w-max border-0 uppercase shadow-none"
        >
          Go Back
        </Link>
        <Link
          to="/"
          className="btn btn-primary bg-white text-cdms_primary mx-auto !mt-7 w-max border-0 uppercase shadow-none"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
