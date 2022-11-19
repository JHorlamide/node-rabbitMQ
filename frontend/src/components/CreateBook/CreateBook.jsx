import React, { useState } from "react";
import CustomBtn from "../widgets/CustomBtn";
import CustomInput from "../widgets/CustomInput";
import { createBook } from "../../api/axios";

const CreateBook = ({ setBooks }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    authorName: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = Object.keys(formData).some((field) => {
      return !formData[field];
    });

    if (emptyFields) {
      setError("Please fill out all fields");
      return;
    }

    createBook(formData)
      .then((book) => {
        console.log("Book was created: ", book);
        setBooks((prevBook) => [book, ...prevBook]);
      })
      .catch((error) => {
        setError(error.toString());
      });
  };

  const handlePress = (event) => {
    event.preventDefault();

    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="container mx-auto bg-gray-100 rounded-xl py-8 px-6">
      <h1 className="text-gray-500 font-bold text-xl pb-6">Create New Book</h1>

      <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
        {error && (
          <h3 className="text-red-500 text-md text-center font-semibold">
            {error}
          </h3>
        )}

        {/* Name & Author Name */}
        <div className="flex justify-center space-x-4">
          <CustomInput
            id=""
            className="text-xs w-full px-4 py-4 rounded-full bg-transparent border-2 border-gray-500"
            inputProps={{
              type: "text",
              name: "name",
              placeholder: "Name",
              value: formData.name,
              onChange: handleChange,
            }}
          />

          <CustomInput
            id=""
            className="text-xs w-full px-4 py-4 rounded-full bg-transparent border-2 border-gray-500"
            inputProps={{
              type: "text",
              name: "authorName",
              placeholder: "Author Name",
              value: formData.authorName,
              onChange: handleChange,
            }}
          />
        </div>

        {/* Description & Category */}
        <div className="flex justify-center space-x-4">
          <CustomInput
            id=""
            className="text-xs w-full px-4 py-4 rounded-full bg-transparent border-2 border-gray-500"
            inputProps={{
              type: "text",
              name: "description",
              placeholder: "Description",
              value: formData.description,
              onChange: handleChange,
            }}
          />

          <CustomInput
            id=""
            className="text-xs w-full px-4 py-4 rounded-full bg-transparent border-2 border-gray-500"
            inputProps={{
              type: "text",
              name: "category",
              placeholder: "Category",
              value: formData.category,
              onChange: handleChange,
            }}
          />
        </div>

        <CustomBtn
          className="py-3 bg-black text-center text-white font-semibold
          w-full rounded-full"
          type="submit"
          onClick={handleSubmit}
          onKeyPress={handlePress}
        >
          Submit
        </CustomBtn>
      </form>
    </div>
  );
};

export default CreateBook;
