import React from "react";
import './board.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: ["Todo", "In progress", "Done"],
      drag: null,
      set: null,
    }

    this.update = this.update.bind(this);
    this.move = this.move.bind(this);
    this.set = this.set.bind(this);
  }

  update(idx) {
    return (e) => {
      let copy = this.state.columns;
      copy[idx] = e.currentTarget.value;
      this.setState({ columns: copy });
    }
  }

  move(idx) {
    return (e) => {
      e.preventDefault();
      this.setState({ drag: idx });
    }
  }

  set(idx) {
    return (e) => {
        e.preventDefault();
      if (this.state.drag < idx) {
        let copy = this.state.columns;
        let a = copy[this.state.drag];
        for (let i = this.state.drag; i <= idx; i++) {
          copy[i] = copy[i+1];
        }
        copy[idx] = a;
        this.setState({ 
          set: idx,
          columns: copy });
        console.log("copy", copy)
      }
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="all-columns">
        {this.state.columns.map((col, idx) => (
          <div key={idx} draggable="true" className="column" onDrag={this.move(idx)} onDragEnter={this.set(idx)}>
            <input value={col} onChange={this.update(idx)}/>
          </div>
        ))}
      </div>
    )
  }
}

export default Board;
