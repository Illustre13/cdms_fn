import React from 'react';
import Select from 'react-select';
import { useField, useFormikContext } from 'formik';

interface MultiSelectProps {
  name: string;
  options: { value: string; label: string }[];
  isMulti?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ name, options, isMulti = true }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (selectedOptions: any) => {
    setFieldValue(name, selectedOptions);
  };

  return (
    <div>
      <Select
        name={name}
        options={options}
        value={field.value}
        onChange={handleChange}
        isMulti={isMulti}
        onBlur={() => setFieldValue(name, field.value)}
      />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
};

export default MultiSelect;
