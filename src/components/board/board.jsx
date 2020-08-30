import React from "react";
import './board.css';
import Card from '../card/card';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: ["Todo", "In progress", "Done"],
      cards: { 0: [{ "title": "One", "description": "Apple", "columnId": 0, "cardId": 0 }],
        1: [{ "title": "Two", "description": "Banana", "columnId": 1, "cardId": 0 }],
        2: [{ "title": "Three", "description": "Carrot", "columnId": 2, "cardId": 0 }] },
      unassigned: [],
      drag: null,
      set: null,
    }

    this.update = this.update.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.createCard = this.createCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.moveCard = this.moveCard.bind(this);
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

  removeCard(idx, cardId){
    let copy = this.state.cards;
    
    for(let i = cardId+1; i < copy[idx].length; i++){
      console.log(this.state.cards, idx, i)
      copy[idx][i].cardID = i-1;
    }
    copy[idx] = copy[idx].slice(0, cardId).concat(copy[idx].slice(cardId+1));
    this.setState({cards: copy})

  }

  createCard(idx, t="", d="", c="") {
    console.log("last state", this.state.cards, c)
    return (e) => {
      e.preventDefault();
      let updated = this.state.cards;
      updated[idx].push({title: t, description: d, columnId: idx, slotId: this.state.cards[idx].length});
      this.setState({ cards: updated });
    }    
  }
  
  moveCard(idx, newIdx, cardId) {
    let copy = this.state.cards;
    let card = copy[idx][cardId];
    card.idx = newIdx;
    card.cardID = copy[newIdx].length;
    copy[newIdx].push(card);
  }

  editColumn(idx) {
    return (e) => {
      e.preventDefault();
      if (idx >= 0) {
        let copy = this.state.columns;
        for (let i = idx; i < copy.length - 1; i++) {
          copy[i] = copy[i + 1];
        }
        copy.pop();
        let cardsCopy = this.state.cards;
        for (let j = idx; j < Object.keys(cardsCopy).length - 1; j++) {
          cardsCopy[j] = cardsCopy[j+1];
        }
        let unassignedCopy = cardsCopy[Object.keys(cardsCopy).length - 1];
        delete cardsCopy[Object.keys(cardsCopy).length - 1];
        console.log(cardsCopy, idx);
        this.setState({
          unassigned: [unassignedCopy],
          columns: copy,
          cards: cardsCopy,
        });
      } else {
        let copy = this.state.columns;
        let cardsCopy = this.state.cards;
        cardsCopy[Object.keys(cardsCopy).length] = [{"title": "", "description": ""}]
        copy.push("")
        console.log(cardsCopy, idx);
        this.setState({
          columns: copy,
          cards: cardsCopy,
        });  
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
              </div>
              {this.state.cards[idx].map((card, cardID) => (
                <Card title={card.title} description={card.description} categoryIdx={idx} cardID={cardID} key={cardID} moveCard={this.moveCard} updateCard={this.updateCard} removeCard={this.removeCard}/>
                ))}
            <div className="column-buttons">
              <button onClick={this.editColumn(idx)}>Delete Column</button>
              <button onClick={this.createCard(idx)}>Add Task</button>
            </div>
            </div>
          ))}
        </div>
        {/* {this.state.unassigned.map((card, cardID) => (
          <Card title={card.title} description={card.description} categoryIdx={0} cardID={cardID} key={cardID} updateCard={this.updateCard} />
        ))} 
        Need to figure out what to do with cards that belongs to deleted columns*/}
      </div>
    )
  }
}

export default Board;
