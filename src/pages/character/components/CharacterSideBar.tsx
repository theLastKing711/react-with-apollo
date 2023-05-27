import { CheckBox } from "@mui/icons-material";

const CharacterSideBar = () => {
  return (
    <aside>
      <div>
        <h2>Sort By</h2>
        <ul>
          <li>
            <CheckBox />
          </li>
          <li>
            <CheckBox />
          </li>
          <li>
            <CheckBox />
          </li>
          <li>
            <CheckBox />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default CharacterSideBar;
