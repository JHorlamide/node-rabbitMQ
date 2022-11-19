import React from "react";
import BookCard from "./BookCard";

const ListBook = ({ books, loading }) => {
  return (
    <div className="container mx-auto mt-5 bg-gray-100 rounded-xl py-8 pl-5 pr-10 mb-20">
      <h1 className="text-gray-500 text-lg font-bold pb-8">Book List</h1>

      {loading && (
        <h1 className="text-center text-gray-700 font-bold italic">
          Loading books...
        </h1>
      )}

      <div className="grid grid-cols-3 gap-x-10 gap-y-4 w-full pb-10">
        {books.map((book, idx) => (
          <BookCard
            key={idx}
            bookName={book.name}
            authorName={book.authorName}
            category={book.category}
            description={book.description}
          />
        ))}
      </div>

      {books.length < 1 && (
        <div className="text-center py-10 rounded-xl bg-gray-200">
          Book list is empty!
        </div>
      )}
    </div>
  );
};

export default ListBook;
