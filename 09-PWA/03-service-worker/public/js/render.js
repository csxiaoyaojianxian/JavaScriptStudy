/**
 * @file render.js
 */

define(function (require) {
    'use strict';

    return function (data) {
        let html = data.subjects.map(function (subject) {
            return `
            <li>
                <img src="${subject.images.medium}"/>
                <p>${subject.title}</p>
            </li>
            `;
        }).join('');
        return html;
    };
});
