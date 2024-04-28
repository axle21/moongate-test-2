import React from "react";
import { useForm } from "react-hook-form";
import { FormField, FormFieldType } from "@/models/form";

type Props = {
  fields: FormField[];
  onSubmit: (data: any) => void;
};

const FormBuilder: React.FC<Props> = ({ fields, onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const renderField = (field: FormField) => {
    const {
      type,
      key,
      label,
      placeholder,
      options,
      required,
      pattern,
      min,
      max,
      minLength,
      maxLength,
      errorMessages,
    } = field;

    const validationRules = {
      required: required
        ? errorMessages?.required || "This field is required"
        : false,
      pattern: pattern
        ? {
            value: new RegExp(pattern),
            message: errorMessages?.pattern || "Invalid format",
          }
        : undefined,
      min: min
        ? {
            value: min,
            message: errorMessages?.min || `Minimum value should be ${min}`,
          }
        : undefined,
      max: max
        ? {
            value: max,
            message: errorMessages?.max || `Maximum value should be ${max}`,
          }
        : undefined,
      minLength: minLength
        ? {
            value: minLength,
            message:
              errorMessages?.minLength ||
              `Minimum length should be ${minLength}`,
          }
        : undefined,
      maxLength: maxLength
        ? {
            value: maxLength,
            message:
              errorMessages?.maxLength ||
              `Maximum length should be ${maxLength}`,
          }
        : undefined,
    };

    switch (type) {
      case FormFieldType.TEXT:
      case FormFieldType.EMAIL:
      case FormFieldType.PASSWORD:
      case FormFieldType.TEL:
      case FormFieldType.URL:
      case FormFieldType.DATE:
      case FormFieldType.DATETIME:
      case FormFieldType.TIME:

      case FormFieldType.NUMBER:
        return (
          <input
            type={type}
            {...register(key, validationRules)}
            placeholder={placeholder}
            className='border-2 p-3  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 font-semibold'
          />
        );
      case FormFieldType.SELECT:
        return (
          <>
            <label>{field.label}</label>
            <select
              {...register(key, validationRules)}
              className='border-2 p-3  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 font-semibold'>
              {options?.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </select>
          </>
        );
      case FormFieldType.CHECKBOX:
      case FormFieldType.RADIO:
        return (
          <div className='flex flex-col'>
            <label>{field.label}</label>
            {options?.map((option) => (
              <>
                <label key={option.value} className='flex-row'>
                  <input
                    type={type}
                    value={option.value}
                    {...register(key, validationRules)}></input>
                  {option.label}
                </label>
              </>
            ))}
          </div>
        );

      case FormFieldType.TEXTAREA:
        return (
          <textarea
            {...register(key, validationRules)}
            placeholder={placeholder}
            className='xl:h-4 border-2 p-3  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 font-semibold'
          />
        );
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col xl:h-[100%] gap-2 text-black '>
      {fields.map((field) => {
        return (
          <div key={field.key}>
            {renderField(field)}
            {errors[field.key] && (
              <p className='text-red-500 m-0 mt-2'>
                {errors[field.key].message}
              </p>
            )}
          </div>
        );
      })}
      <div className='flex flex-col shadow-md h-full'>
        <button
          type='submit'
          className='bg-[#38CC8C] xl:h-full  border-b-4 border-[#258b5f] text-center p-3 rounded-md text-white uppercase hover:bg-[#73f4bc] hover:border-[#33c083]'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormBuilder;
