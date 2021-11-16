import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <HomePage />
      </main>
      <Footer />
    </>
  );
};

export default App;
