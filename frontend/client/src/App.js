
import './App.css';

function App() {
  return (
    <div>
    
      <BrowserRouter>
       
       
        <section className="container">
          
          <Routes>
            <Route exact path = "/register" element={<Register />} />
            <Route exact path = "/login" element= {<Login />} />
            
          </Routes>
        </section>
      </BrowserRouter>
    
  </div>
  );
}

export default App;
