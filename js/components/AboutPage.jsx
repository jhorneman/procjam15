import React from 'react';


const aboutPageHtml = `
<p>Mainframe is a horror game by <a href="http://www.lizengland.com" target="_blank">Liz England</a> & <a href="http://www.intelligent-artifice.com" target="_blank">Jurie Horneman</a>, developed for <a href="http://www.procjam.com" target="_blank">Procjam 2015</a>.</p>
<p>It makes use of <a href="https://github.com/jhorneman/choba-engine" target="_blank">Choba</a>, <a href="https://facebook.github.io/react/" target="_blank">React</a>, <a href="https://www.python.org" target="_blank">Python</a>, <a href="http://getskeleton.com" target="_blank">Skeleton</a>, and <a href="https://github.com/dariusk/corpora" target="_blank">Darius Kazemi's corpora</a>.</p>
<p>The texts, assets, and source code can be found on  <a href="https://github.com/jhorneman/procjam15/tree/choba"target="_blank">GitHub</a>.</p>
<p>The content of this game is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) license. The source code is licensed under the MIT License. See <a href="https://github.com/jhorneman/procjam15/blob/choba/LICENSE" target="_blank">here</a> for more details.</p>
<p><b>Content Warning</b>: This game is a piece of horror interactive fiction. It touches on medical and body horror that is often graphic in nature and covers some common phobias. All content is expressed in text.</p>
`;


function rawMarkup(_html) {
    return { __html: _html };
}

function AboutPage(props) {
    return (<section dangerouslySetInnerHTML={rawMarkup(aboutPageHtml)}></section>);
}

export default AboutPage;