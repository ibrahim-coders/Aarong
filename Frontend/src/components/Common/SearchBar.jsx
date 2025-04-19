import { useState } from 'react';
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchProductsByFilters,
  setFilters,
} from '../../Redux/slice/productsSlice';
const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearchBar = () => {
    setOpen(!isOpen);
  };
  const handleSearch = e => {
    e.preventDefault();
    dispatch(setFilters({ search: search }));
    dispatch(fetchProductsByFilters({ search: search }));
    navigate(`collections/all/?search=${search}`);
    setOpen(false);
  };
  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? 'absolute top-0 left-0 w-full bg-white h-24 z-50' : 'w-auto'
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            {/* search icon */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="h-6 w-6 text-gray-700 cursor-pointer" />
            </button>
          </div>
          {/* close button */}
          <button
            type="button"
            onClick={handleSearchBar}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            <HiMiniXMark className="h-6 w-6 text-gray-700 cursor-pointer" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchBar}>
          <HiMagnifyingGlass className="h-6 w-6 text-gray-700 cursor-pointer" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
