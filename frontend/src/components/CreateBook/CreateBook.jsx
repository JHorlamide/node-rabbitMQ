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
        clearFormInput();
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

  const clearFormInput = () => {
    setFormData({
      name: "",
      authorName: "",
      description: "",
      category: "",
    });
  }

  return (
    <div className="container px-6 py-8 mx-auto bg-gray-100 rounded-xl">
      <h1 className="pb-6 text-xl font-bold text-gray-500">Create New Book</h1>

      <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
        {error && (
          <h3 className="font-semibold text-center text-red-500 text-md">
            {error}
          </h3>
        )}

        {/* Name & Author Name */}
        <div className="flex justify-center space-x-4">
          <CustomInput
            id=""
            className="w-full px-4 py-4 text-xs bg-transparent border-2 border-gray-500 rounded-full"
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
            className="w-full px-4 py-4 text-xs bg-transparent border-2 border-gray-500 rounded-full"
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
            className="w-full px-4 py-4 text-xs bg-transparent border-2 border-gray-500 rounded-full"
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
            className="w-full px-4 py-4 text-xs bg-transparent border-2 border-gray-500 rounded-full"
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
          className="w-full py-3 font-semibold text-center text-white bg-black rounded-full"
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
