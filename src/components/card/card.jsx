import React from "react";
import './card.css';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
        }
        this.toggleCard = this.toggleCard.bind(this);
    }

    deleteCard() {
        // delete code here
        // need to interact with local storage?
    }

    toggleCard() {
        return (e) => {
            e.preventDefault();
            this.setState({ hidden: !this.state.hidden })
        }
    }

    render() {
        const { updateCard, categoryIdx, cardID, title, description } = this.props;
        return (
            <div className="card" draggable="true">
                <input className="card-title" value={title} placeholder="Title" onChange={updateCard(categoryIdx, cardID, "title")} />
                <input className="card-description" value={description} placeholder="Description" hidden={this.state.hidden} onChange={updateCard(categoryIdx, cardID, "description")} />
                <br/>
                <button onClick={this.toggleCard()}>{this.state.hidden ? (<p>Show Details</p>) : (<p>Hide Details</p>)}</button>
            </div>
        )
    }
}

export default Card;