import React from "react";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            description: props.description,
            hidden: true,
        }
    }

    updateTitle(t){
        this.setState({title: t});
    }

    updateDescription(desc){
        this.setState({desc: desc});
    }

    deleteCard(){
        // delete code here
        // need to interact with local storage?
    }

    toggleCard(){
        this.setState({hidden: !this.state.hidden})
    }

    render(){
        return (
            <div className="card">
                <div className="cardTitle">
                    {this.state.title}
                </div>
                {this.state.hidden ?
                    (<div className="cardDescription" hidden>
                        {this.state.description}
                    </div>) :
                    (<div className="cardDescription">
                        {this.state.description}
                    </div>)
                }
                
            </div>
        )
    }
}

export default Card;