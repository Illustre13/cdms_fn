// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const validationSchema = Yup.object({
//   comment: Yup.string()
//     .required('Comment is required')
//     .min(10, 'Comment must be at least 10 characters')
//     .max(500, 'Comment must be less than 500 characters'),
// });

// const initialValues = {
//   comment: '',
// };

// interface CommentFormProps {
//   onSubmit: (values: { comment: string }) => void;
// }

// const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={onSubmit}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           <div>
//             <label htmlFor="comment">Comment</label>
//             <Field
//               name="comment"
//               as="text"
//             />
//             <ErrorMessage name="comment" component="div" className="error-message" />
//           </div>
//           <button type="submit" disabled={isSubmitting}>
//             Save
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default CommentForm;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation Schema for Comment
const validationSchema = Yup.object({
  comment: Yup.string(),
});

// Form Component
const CommentForm: React.FC<{
  cpId: string;
  onSubmit: (values: { comment: string; id: string }) => void;
  commentFormRef?: any;
}> = ({ cpId, onSubmit, commentFormRef }) => {
  return (
    <Formik
    innerRef={commentFormRef}
      initialValues={{ comment: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit({ ...values, id: cpId });
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <div className="w-full text-start flex flex-col gap-8">
              <p>Are you sure you want to reject this capacity plan?</p>
            </div>
            <div className="flex flex-row w-full gap-4 my-4">
              <label htmlFor="comment" className="text-gray-700">Comment: </label>
              <Field
                name="comment"
                as="textarea"
                placeholder="Enter your comment here"
                className={"w-full"}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className="error-message"
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;
