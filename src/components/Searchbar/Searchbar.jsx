import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from "prop-types";
import css from './Searchbar.module.css';


const  Searchbar = (onSubmit) => {

const [inputValue, setInputValue] = useState("")

// Метод для передачи значения input в state
  
const handleNameChange = e =>setInputValue(e.target.value.toLowerCase())


// Метод для передачи state из  Searchbar в App
  
const handleSubmit = e => {
  e.preventDefault();
  if(inputValue.trim() === '')
  {
    toast.error('Введите запрос для поиска изображений!');
    return
  }
    onSubmit(inputValue);
  setInputValue('');
}

  return (
    
      <>
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"         
          autoComplete="off"
          autoFocus
          value={inputValue}
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </form>
    </header>
    <Toaster position="top-center" toastOptions={{ duration: 1500, style: {border: '1px solid royalblue', width: '500px'}}} />
    </>
    
  )
}

Searchbar.propTypes = {
onSubmit: PropTypes.func.isRequired,  
}

export default Searchbar