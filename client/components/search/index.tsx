// =========== Icons ============ \\
import SearchIcon from "../../public/icons/search";

// =========== UI elements ============ \\
import { InputDiv } from "../UIElements";

const Search = ({ searchValue, buttonOpener }: any) => {
  return (
    <div className="flex gap-3 items-center">
      <InputDiv className="flex items-center gap-3 shadow-sm">
        <input
          type="text"
          className="w-full text-sm"
          placeholder="Search Task..."
          onChange={(e) => searchValue(e.target.value)}
        />
        <SearchIcon />
      </InputDiv>
    </div>
  );
};

export default Search;
