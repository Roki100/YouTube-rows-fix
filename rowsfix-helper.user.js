// ==UserScript==
// @name         YouTube rows fix - Compatibility userscript
// @description  Experimental compatibility script for Youtube-rows-fix on home & feed page
// @namespace    github.com/Roki100/YouTube-rows-fix
// @homepageURL  https://github.com/Roki100/YouTube-rows-fix
// @updateURL    https://raw.githubusercontent.com/Roki100/YouTube-rows-fix/main/rowsfix-helper.user.js
// @downloadURL  https://raw.githubusercontent.com/Roki100/YouTube-rows-fix/main/rowsfix-helper.user.js
// @version      1.1.0
// @license      GPL3.0
// @author       Roki
// @run-at       document-start
// @match        *://www.youtube.com/
// @match        *://www.youtube.com/feed/subscriptions*
// @icon         https://www.youtube.com/favicon.ico
// @grant        none
// @require      https://greasyfork.org/scripts/465819-api-for-customelements-in-youtube/code/API%20for%20CustomElements%20in%20YouTube.js?version=1215280
// ==/UserScript==

'use strict';
// PLEASE USE THE USERSTYLE TO CONFIGURE - THIS IS ONLY AN EXPERIMENTAL HELPER SCRIPT - NOT INTENDED TO BE USED AS A STANDALONE ONE!
// (https://github.com/Roki100/YouTube-rows-fix / https://raw.githubusercontent.com/Roki100/YouTube-rows-fix/main/rowsfix.user.css)
setTimeout(() => {
    const variables = getComputedStyle(document.body)
    const element = "ytd-rich-grid-renderer";
    if (!variables.getPropertyValue('--rowsfix-by-roki-userscript-rows')) return;
    const shortCount = Number(variables.getPropertyValue('--rowsfix-by-roki-userscript-shortsrows') ? variables.getPropertyValue('--rowsfix-by-roki-userscript-shortsrows') : 8);
    const videoCount = Number(variables.getPropertyValue('--rowsfix-by-roki-userscript-rows') ? variables.getPropertyValue('--rowsfix-by-roki-userscript-rows') : 6);
    customYtElements.whenRegistered(element, (proto) => {
        proto.calcElementsPerRow = (a, b) => {
            return a === 194 ? shortCount : videoCount;
        };
    });
}, 400); // Timeout is needed for reliable function