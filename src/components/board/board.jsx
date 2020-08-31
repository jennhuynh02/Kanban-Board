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
    this.fetchDragAndSet = this.fetchDragAndSet.bind(this);
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

  fetchDragAndSet() {
    return [this.state.drag, this.state.set]
  }

  removeCard(idx, cardId){
    let copy = this.state.cards;
    
    for(let i = cardId+1; i < copy[idx].length; i++){
      copy[idx][i].cardId = i-1;
    }
    copy[idx] = copy[idx].slice(0, cardId).concat(copy[idx].slice(cardId+1));
    this.setState({cards: copy})

  }

  createCard(idx, t="", d="") {
    return (e) => {
      e.preventDefault();
      let updated = this.state.cards;
      updated[idx].push({title: t, description: d, columnId: idx, cardId: this.state.cards[idx].length});
      this.setState({ cards: updated });
    }    
  }
  
  moveCard(idx, newIdx, cardId) {
    if(newIdx < 0 || newIdx >= Object.keys(this.state.columns).length) return
    let copy = this.state.cards;
    let card = copy[idx][cardId];
    card.columnId = newIdx;
    card.cardId = copy[newIdx].length;
    copy[newIdx].push(card);
    this.removeCard(idx, cardId);
    this.setState({
      cards: copy
    })
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
      // debugger;
      // if(this.state.dragElement === "ncard") return;
      let copyCards = this.state.cards;
      if (this.state.drag < this.state.set) {
        let copy = this.state.columns;
        let a = copy[this.state.drag];
        let cards = copyCards[this.state.drag];
        for (let i = this.state.drag; i < this.state.set; i++) {
          copy[i] = copy[i + 1];
          copyCards[i+1].map(c => {
            c.columnId--;
            return c;
          })
          copyCards[i] = copyCards[i+1]
        }
        copy[this.state.set] = a;
        copyCards[this.state.set] = cards;
        this.setState({
          columns: copy
        });
      } else {
        let copy = this.state.columns;
        let b = copy[this.state.drag];
        let cards = copyCards[this.state.drag];
        for (let j = this.state.drag; j > this.state.set; j--) {
          copy[j] = copy[j - 1];
          copyCards[j-1].map(c => {
            c.columnId++;
            return c;
          })
          copyCards[j] = copyCards[j-1];
        }
        copy[this.state.set] = b;
        copyCards[this.state.set] = cards;
        this.setState({
          columns: copy
        });
      }
      this.setState({
          cards: copyCards
        });
    }
  }

  render() {
    return (
      <div className="board">
        <button onClick={this.editColumn()}>Add Column</button>
        <div className="all-columns">
          {this.state.columns.map((col, idx) => (
            <div key={idx} draggable="true" axis="x" id="column" className="column" onDrag={this.update(idx, "drag")} onDragOver={this.update(idx, "set")} onDragEnd={this.swap()}>
              <div className="column-head">
                <input value={col} onChange={this.update(idx)} className="column-title" />
              </div>
              
              <div className="column-buttons">
                <button onClick={this.editColumn(idx)}>Delete Column</button>
                <button onClick={this.createCard(idx)}>Add Task</button>
              </div>
              {this.state.cards[idx].map((card, cardID) => (
                <Card title={card.title} description={card.description} categoryIdx={idx} cardID={cardID} key={cardID} fetchDragAndSet={this.fetchDragAndSet} moveCard={this.moveCard} updateCard={this.updateCard} removeCard={this.removeCard}/>
                ))}
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
