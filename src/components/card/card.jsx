import React from "react";
import './card.css';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
        }
        this.toggleCard = this.toggleCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.moveCard = this.moveCard.bind(this);
        this.sIdx = this.props.categoryIdx;
        this.eIdx = 0;
        this.cIdx = this.props.cardID;
    }

    deleteCard() {
        const {categoryIdx, cardID} = this.props;
        this.props.removeCard(categoryIdx, cardID);
    }

    toggleCard() {
        return (e) => {
            e.preventDefault();
            this.setState({ hidden: !this.state.hidden })
        }
    }

    moveCard(diff) {
        const {categoryIdx, cardID} = this.props;
        this.props.moveCard(categoryIdx, categoryIdx+diff, cardID);
    }

    render() {
        const { updateCard, categoryIdx, cardID, title, description } = this.props;
        return (
            <div className="card" draggable="true" onDragEnd={(e) => {
                 e.stopPropagation()
                 let arr = this.props.fetchDragAndSet();
                 this.props.moveCard(arr[0], arr[1], cardID)
                }}>
                <input className="card-title" value={title} placeholder="Title" onChange={updateCard(categoryIdx, cardID, "title")} />
                <input className="card-description" value={description} placeholder="Description" hidden={this.state.hidden} onChange={updateCard(categoryIdx, cardID, "description")} />
                <br/>
                <button onClick={this.toggleCard()}>{this.state.hidden ? (<p>Show Details</p>) : (<p>Hide Details</p>)}</button>
                <br/>
                <button onClick={() => this.moveCard(-1)}>&lt;</button>
                <button onClick={this.deleteCard}>Delete</button>
                <button onClick={() => this.moveCard(1)}>&gt;</button>

            </div>
        )
    }
}

export default Card;