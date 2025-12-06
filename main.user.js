// ==UserScript==
// @name         uOLibraryProxyBtn
// @version      1
// @description  Adds a button to Google Scholar to access articles via uOttawa Library EZproxy.
// @author       FrzMtrsprt
// @homepage     https://github.com/FrzMtrsprt/uOLibraryProxyBtn
// @include      https://scholar.google.*/scholar?*
// ==/UserScript==

(function () {
    'use strict';

    function scanAllResults() {
        const results = document.querySelectorAll('div.gs_r.gs_or.gs_scl');

        for (const result of results) {
            if (result.dataset.uoProxyBtnAdded) continue;
            const item = result.querySelector('div.gs_ri');
            const h3 = item.querySelector('h3');
            const a = h3.querySelector('a');

            const btn = document.createElement('button');
            btn.style.display = 'flex';
            btn.style.justifyContent = 'space-evenly';
            btn.style.alignItems = 'center';
            const svg = `<svg height="16" viewBox="0 0 24 34"><g><path d="M20.8,6.2v-1.5h-2.9c-1.2-2-3.3-3.1-6-3.1s-4.7,1.1-6,3.1h-2.9v1.5H.3v22.2h23.3V6.2h-2.8ZM1.5,27.2V7.5h2.8v-1.5h2.4l.2-.3c1.2-2.3,3.4-2.8,5.1-2.8s3.8.5,5.1,2.8l.2.3h2.4v1.5h2.8v19.7H1.5Z"/><g><rect x="2.8" y="23.8" width="18.4" height="1.2"/><path d="M19.8,21.3l-.2-6.8h.2c.2,0,.4-.2.4-.4s0-.2-.1-.3h.3v-.7H3.5v.7h.3s0,.2,0,.3c0,.2.2.4.4.4h.2l-.2,6.8h-1.3v1.2h18.4v-1.2h-1.4ZM16.3,14.5c.2,0,.4-.2.4-.4s0-.2-.1-.3h1.4s-.1.2-.1.3c0,.2.2.4.4.4h.2l-.2,6.8h-2l-.2-6.8h.2ZM12.8,14.5c.2,0,.4-.2.4-.4s0-.2-.1-.3h1.4s-.1.2-.1.3c0,.2.2.4.4.4h.2l-.2,6.8h-2l-.2-6.8h.2ZM9.2,14.5c.2,0,.4-.2.4-.4s0-.2-.1-.3h1.4s-.1.2-.1.3c0,.2.2.4.4.4h.2l-.2,6.8h-2l-.2-6.8h.2ZM5.5,14.5h.2c.2,0,.4-.2.4-.4s0-.2,0-.3h1.4s0,.2,0,.3c0,.2.2.4.4.4s.2,0,.2,0l-.2,6.8h-2l-.2-6.8h0Z"/><polygon points="13.8 8.8 12 8.2 10.1 8.8 2.8 11.6 3.2 12.7 12 9.5 20.7 12.7 21.1 11.6 13.8 8.8"/></g></g></svg>`;
            btn.innerHTML = svg + 'Proxy';
            btn.style.marginRight = '12px';
            btn.addEventListener('click', function (e) {
                const proxied = 'https://login.proxy.bib.uottawa.ca/login?url=' + a.href;
                window.open(proxied, '_blank', 'noopener,noreferrer');
            });

            let ggs = result.querySelector('div.gs_ggs');
            if (!ggs) {
                ggs = document.createElement('div');
                ggs.classList.add('gs_ggs');
                result.insertAdjacentElement('afterBegin', ggs);
            }
            ggs.insertAdjacentElement('beforeEnd', btn);

            result.dataset.uoProxyBtnAdded = '1';
        }
    }

    scanAllResults()

    let debounceTimer = null;
    const observer = new MutationObserver((mutations) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            scanAllResults();
        }, 500);
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
