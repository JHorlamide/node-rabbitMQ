import React, { Fragment, useState } from "react";
import CustomBtn from "../widgets/CustomBtn";
import BookDetailModal from "./BookDetailModal";

const BookCard = ({ bookName, authorName, category, description }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <Fragment>
      <BookDetailModal
        isOpen={isOpen}
        closeModal={closeModal}
        openModal={openModal}
        bookName={bookName}
        authorName={authorName}
        category={category}
        description={description}
      />

      <div
        className="bg-gray-700 w-64 h-46 py-8 px-4 flex flex-col space-y-4
        justify-center items-center rounded-xl border-4 border-gray-400"
      >
        {/* Book Name */}
        <h1 className="text-gray-300 text-center text-md font-bold">
          {bookName}
        </h1>

        {/* Description */}
        <p className="font-medium text-sm text-gray-100 text-center">
          {description}
        </p>

        <p className="text-md text-center text-gray-50 italic font-extralight">
          By
        </p>

        <p className="text-md text-gray-200 italic">{authorName}</p>

        <CustomBtn
          className={
            "py-3 px-10 bg-gray-900 rounded-full text-white text-center"
          }
          onClick={openModal}
        >
          Learn More
        </CustomBtn>
      </div>
    </Fragment>
  );
};

export default BookCard;
