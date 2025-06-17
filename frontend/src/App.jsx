// App.jsx
import Header from './components/Header';
import Home from './components/mainapp';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
        {/* You can add more components here like <Features />, <Testimonials />, etc. */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
