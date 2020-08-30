import React from "react";
import './board.css';
import Card from '../card/card';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: ["Todo", "In progress", "Done"],
      cards: { 0: [{ "title": "One", "description": "Apple" }], 1: [{ "title": "Two", "description": "Banana" }], 2: [{ "title": "Three", "description": "Carrot" }] },
      drag: null,
      set: null,
    }

    this.update = this.update.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.editColumn = this.editColumn.bind(this);
    this.swap = this.swap.bind(this);
  }

  update(idx, field) {
    return (e) => {
      e.preventDefault();
      if (field === "drag" || field === "set") {
        this.setState({ [field]: idx });
      } else {
        let copy = this.state.columns;
        copy[idx] = e.currentTarget.value;
        this.setState({ columns: copy });
      }
    }
  }

  updateCard(columnIdx, cardID, field) {
    return (e) => {
      e.preventDefault();
      let updated = this.state.cards;
      updated[columnIdx][cardID][field] = e.currentTarget.value;
      this.setState({ cards: updated });
    }    
  }

  editColumn(idx) {
    return (e) => {
      e.preventDefault();
      if (idx) {
        let copy = this.state.columns;
        for (let i = idx; i < copy.length - 1; i++) {
          copy[i] = copy[i + 1];
        }
        copy.pop();
        this.setState({
          columns: copy,
        });
      } else {
        let copy = this.state.columns;
        copy.push("")
        this.setState({ columns: copy });        
      }
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
    console.log(this.state)
    return (
      <div className="board">
        <button onClick={this.editColumn()}>Add Column</button>
        <div className="all-columns">
          {this.state.columns.map((col, idx) => (
            <div key={idx} draggable="true" axis="x" className="column" onDrag={this.update(idx, "drag")} onDragOver={this.update(idx, "set")} onDrop={this.swap()}>
              <div className="column-head">
                <input value={col} onChange={this.update(idx)} className="column-title" />
                <button onClick={this.editColumn(idx)}>X</button>
                <button>+</button>
              </div>
              {this.state.cards[idx].map((card, cardID) => (
                <Card title={card.title} description={card.description} categoryIdx={idx} cardID={cardID} key={cardID} updateCard={this.updateCard}/>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Board;
