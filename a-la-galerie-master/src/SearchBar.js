import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    state = { val: '' }

    onInputChange = (event) => {
        this.setState({ val: event.target.value })
    }

    /*
    onFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.val);
    }
    */
    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.userSubmit(this.state.val);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}  className="flexContainer">
                    <label><h2>Search Image Category : &nbsp; </h2></label>
                    <input
                        className="inputStyle"
                        type="text"
                        value={this.state.val}
                        onChange={this.onInputChange}
                    />
                </form>
            </div>
        )
    }
}

    export default SearchBar;