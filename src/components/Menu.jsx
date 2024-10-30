export default function Menu({ handleChoosingLevel }) {
  return (
    <aside className="menu">
      <h2 className="menu__heading">Choose a level</h2>
      <ul className="menu__list">
        <li className="menu__list-item"><button onClick={handleChoosingLevel(6)} className="btn btn_primary btn_whole-width">6 Cards</button></li>
        <li className="menu__list-item"><button onClick={handleChoosingLevel(8)} className="btn btn_primary btn_whole-width">8 Cards</button></li>
        <li className="menu__list-item"><button onClick={handleChoosingLevel(10)} className="btn btn_primary btn_whole-width">10 Cards</button></li>
        <li className="menu__list-item"><button onClick={handleChoosingLevel(12)} className="btn btn_primary btn_whole-width">12 Cards</button></li>
        <li className="menu__list-item"><button onClick={handleChoosingLevel(16)} className="btn btn_primary btn_whole-width">16 Cards</button></li>
      </ul>
    </aside>
  )
}