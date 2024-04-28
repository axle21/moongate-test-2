import React from "react";
import FormBuilder from "@/components/FormBuilder/FormBuilder";
import { FormField, FormFieldType } from "@/models/form";

const Home: React.FC = () => {
  const fields: FormField[] = [
    {
      key: "email",
      label: "Email",
      type: FormFieldType.EMAIL,
      required: true,
      placeholder: "Enter your email",
      errorMessages: { required: "Email is required" },
    },
    {
      key: "password",
      label: "Password",
      type: FormFieldType.PASSWORD,
      required: true,
      placeholder: "Enter your password",
      errorMessages: { required: "Password is required" },
    },
    {
      key: "phone",
      label: "Phone",
      type: FormFieldType.TEL,
      placeholder: "Enter your phone number",
    },
    {
      key: "dateOfBirth",
      label: "Date of Birth",
      type: FormFieldType.DATE,
      placeholder: "Select your date of birth",
    },
    {
      key: "age",
      label: "Age",
      type: FormFieldType.NUMBER,
      placeholder: "Enter your age",
      min: 1,
      max: 99,
    },
    {
      key: "gender",
      label: "Gender",
      type: FormFieldType.SELECT,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
    },
  ];

  const onSubmit = async (data: any) => {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    alert(res.message);
    console.log(res);
  };

  return (
    <>
      <main className='min-h-[1000px] xl:min-h-[800px] h-[100%] xl:w-[100%] flex flex-col justify-around  relative'>
        <div className='absolute bg-[#FF7A7A] w-[100%] h-[100%] z-0'></div>

        <div className='z-20 w-full top-10 xl:top-[20%] xl:left-[15%] xl:h-[60%] xl:w-[70%] absolute px-5 xl:px-0 flex flex-col xl:flex-row'>
          <div className='text-center xl:text-left text-white pb-2 mt-3 xl:mt-0 xl:w-[50%] xl:flex xl:flex-col xl:justify-center'>
            <h1 className='mb-8 font-bold text-2xl px-10 xl:px-0 xl:text-5xl'>
              Moongate Coding Challenge Task 2
            </h1>
          </div>
          <div className='flex flex-col xl:h-full gap-5 xl:gap-6 xl:w-[50%] '>
            <div className='bg-white p-4 xl:p-10 xl:px-10 rounded-md flex flex-col shadow-personal gap-2 xl:gap-0'>
              <FormBuilder fields={fields} onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Home;
