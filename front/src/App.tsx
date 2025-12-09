import React from 'react';



function App() {
  return (
        <BrowserRouter>
          <nav>
              <ul>
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>

                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>

                    <Link to={"/pages/Consumo/CadastrarConsumoAgua"}>
                      Cadastrar consumo água {" "}
                    </Link>
                  </li>

                  <Link to={"/pages/Consumo/ListarConsumoAgua"}>
                      Listar consumo água {" "}
                    </Link>
                  </li>
 
 
 <Routes>
                    <Route path="/" element={<ListarConsumo />} />
                    <Route 
                      path="/pages/consumo/Cadastrar"
                      element={<Listar/>}
                      />
                </Routes>

                 <Routes>
                    <Route path="/" element={<ListarConsumo />} />
                    <Route 
                      path="/pages/consumo/listar"
                      element={<Listar/>}
                      />
                </Routes>


</nav>
</ul>

</BrowserRouter>
  );
}

export default App;
