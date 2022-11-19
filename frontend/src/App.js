import Layout from "./components/Layout";
import CreateBook from "./components/CreateBook/CreateBook";
import ListBook from "./components/ListBook/ListBook";
import useBookHandler from "./hooks/useBookHandler";

const App = () => {
  const { books, loading, error, isError, setBooks } = useBookHandler(0);

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <Layout>
      <CreateBook setBooks={setBooks} />
      <ListBook books={books} loading={loading} />
    </Layout>
  );
};

export default App;
