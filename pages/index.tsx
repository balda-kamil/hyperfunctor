import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-grow">main</main>
      <Footer />
    </div>
  );
};

export default Home;
