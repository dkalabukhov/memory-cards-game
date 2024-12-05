import { uniqueId } from "lodash";

export default function Menu({ handleChoosingLevel, menuLevels }) {
  const entries = Object.entries(menuLevels);

  const renderMenuItems = () => {
    return entries.map(([key, value]) => {
      return (
        <li key={uniqueId()} className="menu__list-item"><button onClick={() =>handleChoosingLevel(key)} className="btn btn_primary btn_whole-width">{value}</button></li>
      );
    });
  }

  return (
    <aside className="menu">
      <h2 className="menu__heading">Choose a level</h2>
      <ul className="menu__list">
        {renderMenuItems()}
      </ul>
    </aside>
  )
}