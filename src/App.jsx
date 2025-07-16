// src/App.jsx
import "./App.css";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import HomePage from "./pages/HomePages";

function App() {
  const bannerImageUrl = "https://picsum.photos/1600/900";
  const bannerTitle = "Selamat Datang di Portal Ide";
  const bannerDescription = "Temukan berbagai ide menarik dan inovatif dari kami.";

  return (
    <div className="App">
      <Header />
      <main style={{ paddingTop: '70px' }}>
        <Banner imageUrl={bannerImageUrl} title={bannerTitle} description={bannerDescription} />
        <HomePage />
      </main>
    </div>
  );
}

export default App;