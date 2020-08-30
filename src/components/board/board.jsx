import React from "react";
import './board.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: ["Todo", "In progress", "Done"],
    }

    this.update = this.update.bind(this);
  }

  update(idx) {
    return (e) => {
      let copy = this.state.columns;
      copy[idx] = e.currentTarget.value;
      this.setState({ columns: copy });
    }
  }

  swap() {
    
  }

  render() {
    console.log(this.state);
    return (
      <div className="all-columns">
        {this.state.columns.map((col, idx) => (
          <div key={idx} draggable="true" className="column">
            <input defaultValue={col} onChange={this.update(idx)}/>
          </div>
        ))}
      </div>
    )
  }
}

export default Board;
