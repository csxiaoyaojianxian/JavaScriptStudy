/**
 * @file ui.js
 */

define(function (require) {
    'use strict';

    function createDom(text, type) {
        let $dom = document.querySelector('.ui-toast');
        if ($dom) {
            $dom.remove();
        }

        $dom = document.createElement('div');
        $dom.classList.add('ui-toast');
        $dom.classList.add(type || 'default');
        $dom.innerHTML = text;
        return $dom;
    }

    return {
        showToast(text, type) {
            let $dom = createDom(text, type);
            document.body.appendChild($dom);
            setTimeout(() => {
                $dom.classList.add('show');
            }, 1);

            $dom.addEventListener('click', function (event) {
                $dom.classList.remove('show');
            });
        }
    };
});


