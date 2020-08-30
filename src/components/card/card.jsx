import React from "react";
import './card.css';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
        }
    }

    deleteCard() {
        // delete code here
        // need to interact with local storage?
    }

    toggleCard() {
        this.setState({ hidden: !this.state.hidden })
    }

    render() {
        const { updateCard, categoryIdx, cardID, title, description } = this.props;
        return (
            <div className="card" draggable="true">
                <input className="cardTitle" value={title} onChange={updateCard(categoryIdx, cardID, "title")} />
                <input className="cardDescription" value={description} hidden={this.state.hidden} onChange={updateCard(categoryIdx, cardID, "description")} />
            </div>
        )
    }
}

export default Card;