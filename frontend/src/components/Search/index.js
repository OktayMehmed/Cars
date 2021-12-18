import { useState } from "react";
import './styles.css'
import { useNavigate } from "react-router-dom";

const SearchByMake = () => {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { search } = Object.fromEntries(formData);

    if (search.trim()) {
      navigate(`/search/${search}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="car-search"
      >
        <input type="text" name="search" id="search" placeholder="Search car" />
        <button>Search</button>
      </form>
    </>
  );
};

export default SearchByMake;
