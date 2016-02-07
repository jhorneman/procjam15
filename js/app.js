import React from 'react';
import { render } from 'react-dom';
import lscache from 'ls-cache';

import { initializeGame,
         getRandomInt,
         expressionEvaluators,
         actionHandlers,
         nullValue,
         getRandomlySelectedItemIndexByTags } from 'choba-engine';

import { firstSceneId, initialVars, sceneDescriptions, blockDescriptions, dataNames, firstNames, lastNames, jobTitles } from './data';
import App from './components/App'


// This returns a string value. In the original Mainframe, this directly modified the 'data' gameplay variable.
function evaluateGenDataExpression(_parameters, _dynamicState, _context) {
    const dataNameIndex = getRandomlySelectedItemIndexByTags(
        _context.dataNames,
        [_dynamicState.vars['flesh_act'].value],
        _dynamicState.tagState,
        _context
    );
    if (dataNameIndex !== undefined) {
        const dataName = _context.dataNames[dataNameIndex];
        return {
            type: 'string',
            value: '<span class="data-name">' + dataName['content'] + '</span>'
        };
    } else {
        _context.reportError('Couldn\'t find a data name.');
    }
    return nullValue;
}

export function evaluateGenPlayerExpression(_parameters, _dynamicState, _context) {
    // In Mainframe we had a deck logic for this, where we tracked state. We don't do that here because it's
    // not very useful.

    let jobTitle = 'passenger';
    const fleshAct = _dynamicState.vars.flesh_act.value;
    if (_context.jobTitles.hasOwnProperty(fleshAct)) {
        const nrJobTitles = _context.jobTitles[fleshAct].length;
        const jobTitleIndex = getRandomInt(_context, nrJobTitles);
        jobTitle = _context.jobTitles[fleshAct][jobTitleIndex];
    }

    const newVars = Object.assign({}, _dynamicState.vars, {
        'PC_first': {
            type: 'string',
            value: _context.firstNames[getRandomInt(_context, _context.firstNames.length)]
        },
        'PC_last': {
            type: 'string',
            value: _context.lastNames[getRandomInt(_context, _context.lastNames.length)]
        },
        'PC_job': {
            type: 'string',
            value: jobTitle
        }
    });

    _dynamicState.vars = newVars
    return {
        type: 'dynamicState',
        value: _dynamicState
    };
}

export function handleRespawnAction(_parameters, _dynamicState, _context) {
    const wakeUpTags = [
        'pc_start',
        _dynamicState.vars['flesh_act'].value
    ];
    let wakeUpSceneId = getRandomlySelectedItemIndexByTags(_context.scenes, wakeUpTags, _dynamicState.tagState, _context);
    if (wakeUpSceneId) {
        return Object.assign(
            {},
            _dynamicState, {
                currentSceneId: wakeUpSceneId
            }
        );
    } else {
        _context.reportError('Couldn\'t find a wake up scene.');
        return nullValue;
    }
}


let { newScene, dynamicState, context } = initializeGame({
    firstSceneId: firstSceneId,
    initialVars: Object.assign(
        {},
        initialVars
    ),
    scenes: sceneDescriptions,
    blocks: blockDescriptions,
    dataNames: dataNames,
    firstNames: firstNames,
    lastNames: lastNames,
    jobTitles: jobTitles,
    expressionEvaluators: Object.assign({}, expressionEvaluators, {
        'genData': evaluateGenDataExpression,
        'genPlayer': evaluateGenPlayerExpression
    }),
    actionHandlers: Object.assign({}, actionHandlers, {
        'respawn': handleRespawnAction
    })
});

let cachedScene = lscache.get('scene'),
    cachedGameState = lscache.get('gameState')

if (cachedScene && cachedGameState) {
    newScene = cachedScene;
    dynamicState = cachedGameState;
}

let container = document.getElementById('root');
render(
    <App scene={newScene} dynamicState={dynamicState} context={context} container={container}/>,
    container
);
