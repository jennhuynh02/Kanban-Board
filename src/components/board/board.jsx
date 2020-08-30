import React from "react";
import './board.css';
import Card from '../card/card';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: ["Todo", "In progress", "Done"],
      drag: null,
      set: null,
    }

    this.update = this.update.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.move = this.move.bind(this);
    this.set = this.set.bind(this);
    this.swap = this.swap.bind(this);
  }

  update(idx) {
    return (e) => {
      let copy = this.state.columns;
      copy[idx] = e.currentTarget.value;
      this.setState({ columns: copy });
    }
  }

  deleteColumn(idx) {
    return (e) => {
      e.preventDefault();
      let copy = this.state.columns;
      for (let i = idx; i < copy.length - 1; i++) {
        copy[i] = copy[i + 1];
      }
      copy.pop();
      this.setState({
        columns: copy,
      });
    }
  }

  addColumn() {
    return (e) => {
      e.preventDefault();
      let copy = this.state.columns;
      copy.push("")
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
      e.stopPropagation();
      e.preventDefault();
      this.setState({ set: idx })
    }
  }

  swap() {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (this.state.drag < this.state.set) {
        let copy = this.state.columns;
        let a = copy[this.state.drag];
        for (let i = this.state.drag; i < this.state.set; i++) {
          copy[i] = copy[i + 1];
        }
        copy[this.state.set] = a;
        this.setState({
          columns: copy
        });
      } else {
        let copy = this.state.columns;
        let b = copy[this.state.drag];
        for (let j = this.state.drag; j > this.state.set; j--) {
          copy[j] = copy[j - 1];
        }
        copy[this.state.set] = b;
        this.setState({
          columns: copy
        });
      }
    }
  }

  render() {
    return (
      <div className="board">
        <button onClick={this.addColumn()}>Add Column</button>
        <div className="all-columns">
          {this.state.columns.map((col, idx) => (
            <div key={idx} draggable="true" axis="x" className="column" onDrag={this.move(idx)} onDragOver={this.set(idx)} onDrop={this.swap()}>
              <div className="column-head">
                <input value={col} onChange={this.update(idx)} className="column-title" />
                <button onClick={this.deleteColumn(idx)}>X</button>
                <button>+</button>
              </div>
              {/* <Card /> */}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Board;
