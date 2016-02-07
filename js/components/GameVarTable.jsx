import React, { Component, PropTypes } from 'react';

class GameVarTable extends Component {
    render() {
        return (
            <div id="debug-view">
                <table id="game-state">
                    <caption>Current game state</caption>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.props.gameVars).sort().map((varName, index) => (
                            <tr key={index}>
                                <td>{varName}</td>
                                <td>{this.props.gameVars[varName].value}</td>
                                <td>{this.props.gameVars[varName].type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GameVarTable;