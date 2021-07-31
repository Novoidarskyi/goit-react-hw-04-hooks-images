import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from "prop-types";
import css from './Searchbar.module.css';


export default class Searchbar extends Component {
  state = {
    inputValue: ''
  };


  // Метод для передачи значения input в state
  
handleNameChange= e => {
  this.setState({inputValue: e.target.value.toLowerCase()})
}

  // Метод для передачи state из  Searchbar в App

handleSubmit = e => {
  e.preventDefault();
  if(this.state.inputValue.trim() === '')
  {
    toast.error('Введите запрос для поиска изображений!');
    return
  }
    this.props.onSubmit(this.state.inputValue);
  this.setState({inputValue: ''});
}

  render() {
    return (
      <>
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={this.handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"         
          autoComplete="off"
          autoFocus
          value={this.state.inputValue}
          placeholder="Search images and photos"
          onChange={this.handleNameChange}
        />
      </form>
    </header>
    <Toaster position="top-center" toastOptions={{ duration: 1500, style: {border: '1px solid royalblue', width: '500px'}}} />
    </>
    )
    
  }
}

Searchbar.propTypes = {
onSubmit: PropTypes.func.isRequired,  
}