import axios from "axios";

export const listBookService = axios.create({
  baseURL: "http://localhost:9090/api",
});

export const createBookService = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getBooks = async (page_number = 0, options = {}) => {
  const response = await listBookService.get(
    `/books?page_number=${page_number}`,
    options
  );

  return response.data.data;
};

export const createBook = async (bookPayload) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const response = await createBookService.post(
    "/books",
    JSON.stringify(bookPayload),
    config
  );

  return response.data.data;
};
