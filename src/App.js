import MainWindow from "./MainWindow/MainWindow";

function App() {
  return (
    <div className="App">
      <MainWindow />
      <img
        className="img left"
        src="/salamander.jpg"
        alt="samurai_stabs_monstrous_salamander"
      />
      <img
        className="img right flipped"
        src="/firesmite.jpg"
        alt="ghost_samurai_smites_murderer"
      />
    </div>
  );
}

export default App;
