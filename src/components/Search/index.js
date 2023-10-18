import PropTypes from "prop-types";
import './styles.scss';

const Search = ({ searchTerm, onSearchTermChange, onSortChange, onTypeFilter }) => {

  Search.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchTermChange: PropTypes.func.isRequired,
    onSortChange: PropTypes.func.isRequired,
    onTypeFilter: PropTypes.func.isRequired,
  };

  return (
    <div className="Search">
      <input
        className="Search-input"
        type="text"
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />
      <div className="Search-controls">
        <select onChange={(e) => onSortChange(e.target.value)}>
          <option value="numerical">Lowest Number to Highest</option>
          <option value="reverseNumerical">Highest Number to Lowest</option>
          <option value="alphabetical">A-Z</option>
          <option value="reverseAlphabetical">Z-A</option>
        </select>
        <button class = "All" onClick={() => onTypeFilter('')}>All Types </button>
        <button class = "Normal" onClick={() => onTypeFilter('normal')}>Normal</button>
        <button class = "Fire" onClick={() => onTypeFilter('fire')}>Fire</button>
        <button class = "Water" onClick={() => onTypeFilter('water')}>Water</button>
        <button class = "Grass" onClick={() => onTypeFilter('grass')}>Grass</button>
        <button class = "Flying" onClick={() => onTypeFilter('flying')}>Flying</button>
        <button class = "Fighting" onClick={() => onTypeFilter('fighting')}>Fighting</button>
        <button class = "Poison" onClick={() => onTypeFilter('poison')}>Poison</button>
        <button class = "Electric" onClick={() => onTypeFilter('electric')}>Electric</button>
        <button class = "Ground" onClick={() => onTypeFilter('ground')}>Ground</button>
        <button class = "Rock" onClick={() => onTypeFilter('rock')}>Rock</button>
        <button class = "Psychic" onClick={() => onTypeFilter('psychic')}>Psychic</button>
        <button class = "Ice" onClick={() => onTypeFilter('ice')}>Ice</button>
        <button class = "Bug" onClick={() => onTypeFilter('bug')}>Bug</button>
        <button class = "Ghost" onClick={() => onTypeFilter('ghost')}>Ghost</button>
        <button class = "Steel" onClick={() => onTypeFilter('steel')}>Steel</button>
        <button class = "Dragon" onClick={() => onTypeFilter('dragon')}>Dragon</button>
        <button class = "Dark" onClick={() => onTypeFilter('dark')}>Dark</button>
        <button class = "Fairy" onClick={() => onTypeFilter('fairy')}>Fairy</button>
        
        
        {/* Add more type buttons as needed */}
      </div>
    </div>
  );
};

export default Search;
