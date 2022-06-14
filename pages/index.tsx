import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="max-w-7xl">
        <nav className="bg-gray-500">Nawigavja</nav>
      </header>
      <main className="flex-grow">main</main>
      <Footer />
    </div>
  );
};

export default Home;
