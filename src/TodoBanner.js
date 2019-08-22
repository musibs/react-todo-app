import React, { Component } from 'react'

export default class TodoBanner extends Component {
    render = () => 
            <h4 className="bg-primary text-white text-center">
                {this.props.name}'s To DO List
                ({this.props.tasks.filter(t => !t.done).length}'s to do)
            </h4>
    
}
