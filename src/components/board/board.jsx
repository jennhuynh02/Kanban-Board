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
    this.addColumn = this.addColumn.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
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
      this.setState({ columns: copy});
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
      console.log(this.state)
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
          } else {
          let copy = this.state.columns;
          let b = copy[this.state.drag];
          for (let j = this.state.drag; j > idx; j--) {
            copy[j] = copy[j-1];
          }
          copy[idx] = b;
          this.setState({ 
            set: idx,
            columns: copy });
        }
      console.log(this.state.columns)
    }
  }

  render() {
    return (
      <div>
        <div className="all-columns">
          {this.state.columns.map((col, idx) => (
            <div key={idx} draggable="true" axis="x" className="column" onDrag={this.move(idx)} onDragEnter={this.set(idx)}>
              <input value={col} onChange={this.update(idx)} className="column-title"/>
              <button onClick={this.deleteColumn(idx)}>X</button>
            </div>
          ))}
        </div>
          <button onClick={this.addColumn()}>Add Column</button>
      </div>
    )
  }
}

export default Board;
