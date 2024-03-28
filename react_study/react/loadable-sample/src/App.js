import React, { Component } from 'react';
//import notify from './notify';

class App extends Component {
  handleClick = () => {
    //notify();
    import('./notify').then(({ default: notify }) => {
      notify();
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

export default App;