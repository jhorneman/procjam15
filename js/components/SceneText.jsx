import React, { Component, PropTypes } from 'react';

const t_re = /<\/?t>/;
const blankLine = '\n\n';
const terminalStyleClassName = "style_terminal"


function generateParagraphTags(_text) {
    let paragraphs = _text.split(blankLine);
    paragraphs = paragraphs.filter(paragraph => paragraph.length > 0);
    paragraphs = paragraphs.map(paragraph => '<p>' + paragraph + '</p>');
    return paragraphs.join('');
}

function generateStyleTags(_text) {
    return '<span class="' + terminalStyleClassName + '">' + _text + '</span>';
}

function rawMarkup(_text) {
    return { __html: _text };
}


function SceneText(props) {
    // Replace terminal lines with spans so they can be styled in CSS.
    let text = props.text.replace('--------------------------------', '<span class="divLine"></span>');

    // Replace h1 tags with spans because the h1 will be put inside a <p> tag and that looks naff.
    text = text.replace('<h1>', '<span class="game_title">');
    text = text.replace('</h1>', '</span>');

    // Split into parts alternating between not inside style tags and inside style tags.
    let parts = text.split(t_re),
        combinedText = '',
        accumulatedPart = '';

    parts.forEach((part, index) => {
        // The parts with odd indices are text inside style tags.
        let isStyled = (index % 2) === 1;

        // Is the current part empty?
        if (part.length === 0) {
            // Yes -> Is it styled?
            if (!isStyled) {
                // No -> An empty, unstyled part means there are two consecutive styled parts.
                // So we're going to flush the text we've accumulated (the previous styled part).
                // This means each styled part will be in its own paragraph, which is usually what we want.
                if (accumulatedPart.length > 0) {
                    combinedText += generateParagraphTags(accumulatedPart);
                    accumulatedPart = '';
                }
            }
            return;
        }

        // Is the current part styled?
        // (Is it a part with an odd index?)
        if (isStyled) {
            // Yes -> Does it contain blank lines?
            if (part.includes(blankLine)) {
                // Yes -> Then we have flush the text we've accumulated so far, if any.
                if (accumulatedPart.length > 0) {
                    combinedText += generateParagraphTags(accumulatedPart);
                    accumulatedPart = '';
                }

                // Break it into paragraphs, wrap it in HTML style tags, and add it to the combined text.
                combinedText += generateStyleTags(generateParagraphTags(part))
            } else {
                // No -> Wrap it in HTML style tags and add it to the text we're accumulating.
                accumulatedPart += generateStyleTags(part);
            }
        } else {
                // No -> Add it to the text we're accumulating.
                accumulatedPart += part;
        }
    });

    // Flush the text we've accumulated so far, if any.
    if (accumulatedPart.length > 0) {
        combinedText += generateParagraphTags(accumulatedPart)
    }

    return (<div dangerouslySetInnerHTML={rawMarkup(combinedText)}></div>);
}

SceneText.propTypes = {
    text: React.PropTypes.string.isRequired
}

export default SceneText;