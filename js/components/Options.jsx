import React, { Component, PropTypes } from 'react';


function rawMarkup(_text) {
    return { __html: _text };
}

function Option(props) {
    return (
        <li><a href="" onClick={props.onOptionClicked} dangerouslySetInnerHTML={rawMarkup(props.text)} /></li>
    );
}

Option.propTypes = {
    text: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    onOptionClicked: React.PropTypes.func.isRequired
};


function Options(props) {
    return (
        <ul id='options'>
        {props.options.map((option, index) => (
            <Option key={index} text={option.text} index={index} onOptionClicked={props.onOptionClicked.bind(undefined, index)} />
        ))}
        </ul>
    );
}

Options.propTypes = {
    options: React.PropTypes.array.isRequired,
    onOptionClicked: React.PropTypes.func.isRequired
}

export default Options;