import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import lscache from 'ls-cache';

import { executeOption,
         restartGame } from 'choba-engine';

import SceneText from './SceneText';
import Options from './Options';
import AboutPage from './AboutPage';
import GameVarTable from './GameVarTable';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = { showAboutPage: false };
    }

    rerender(_newScene, _newDynamicState) {
        lscache.set('scene', _newScene);
        lscache.set('gameState', _newDynamicState);
        ReactDOM.render(
            <App
                scene={_newScene}
                dynamicState={_newDynamicState}
                context={this.props.context}
                showDebug={this.props.showDebug}
                container={this.props.container} />,
            this.props.container
        );
    }

    onOptionClicked(_index, event) {
        event.preventDefault();
        let { newScene, dynamicState } = executeOption(this.props.dynamicState, this.props.context, this.props.scene.options[_index]);
        this.rerender(newScene, dynamicState);
    }

    onRestartClicked(event) {
        event.preventDefault();
        let { newScene, dynamicState } = restartGame(this.props.context);
        this.rerender(newScene, dynamicState);
    }

    onShowAboutClicked(event) {
        event.preventDefault();
        this.setState({ showAboutPage: true });
    }

    onHideAboutClicked(event) {
        event.preventDefault();
        this.setState({ showAboutPage: false });
    }

    _modifyClassList(_modifier, _props) {
        const scene = _props.scene;
        // (For backward compatibility, ugh.)
        if (scene.hasOwnProperty('desc')) {
            let styleClasses = [].concat(scene.desc.styles || [], [_props.dynamicState.vars['flesh_act'].value]);
            styleClasses.map(className => document.body.classList[_modifier](className));
        }
    }

    componentDidMount() {
        this._modifyClassList('add', this.props);
    }

    componentWillReceiveProps(nextProps) {
        this._modifyClassList('remove', this.props);
        this._modifyClassList('add', nextProps);
    }

    componentWillUnmount() {
        this._modifyClassList('remove', this.props);
    }

    render() {
        const scene = this.props.scene;

        const debugView = this.props.showDebug ? (<GameVarTable gameVars={this.props.dynamicState.vars} />) : null;

        let contents,
            footer;

        if (this.state.showAboutPage) {
            contents = (<AboutPage />);
            footer = (
                <footer>
                    <ul>
                        <li><a href="#" onClick={this.onHideAboutClicked.bind(this)}>Back to the game</a></li>
                    </ul>
                    &copy; 2015 Liz England &amp; Jurie Horneman
                </footer>
            );

        } else {
            contents = (
                <section>
                    <SceneText text={scene.text} />
                    <Options options={scene.options} onOptionClicked={this.onOptionClicked.bind(this)} />
                    {debugView}
                </section>
            );
            footer = (
                <footer>
                    <ul>
                        <li><a href='#' onClick={this.onRestartClicked.bind(this)}>Start over</a></li>
                        <li><a href="#" onClick={this.onShowAboutClicked.bind(this)}>About this game</a></li>
                    </ul>
                    &copy; 2015 Liz England &amp; Jurie Horneman
                </footer>
            );
        }

        return (<div>
            {contents}
            {footer}
        </div>);
    }
}

App.propTypes = {
    scene: React.PropTypes.object.isRequired,
    dynamicState: React.PropTypes.object.isRequired,
    context: React.PropTypes.object.isRequired,
    container: React.PropTypes.object.isRequired,
    showDebug: React.PropTypes.bool
}

App.defaultProps = {
    showDebug: false
}

export default App;