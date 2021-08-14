// ==UserScript==
// @name         Notion Fix
// @namespace    https://github.com/alanleungcn/notion-fix
// @version      1.1
// @author       Alan Leung
// @description  Fix bugs in Notion
// @match        https://www.notion.so/*
// @license      MIT
// ==/UserScript==

(function () {
	'use strict';

	let preView = null;
	let curView = null;
	const checkInterval = 100;
	const viewList = [
		'table',
		'board',
		'timeline',
		'calendar',
		'gallery',
		'list',
	];

	const init = setInterval(() => {
		queryView();
		if (curView) {
			clearInterval(init);
			applyFix();
		}
	}, checkInterval);

	window.addEventListener('click', () => {
		applyFix();
	});

	// function fixTimelineDividerPosition() {
	// 	document.querySelector('.pseudoSelection').style.position = '';
	// }

	function fixScrollbarPosition() {
		document.querySelector(
			'.notion-scroller.vertical.horizontal'
		).scrollLeft = 0;
	}

	function queryView() {
		viewList.forEach((view, i) => {
			if (document.querySelector(`.notion-${view}-view`)) {
				curView = viewList[i];
			}
		});
	}

	function applyFix() {
		requestAnimationFrame(() => {
			queryView();
			// if (curView === 'timeline') {
			// 	fixTimelineDividerPosition();
			// }
			if (curView !== preView && preView === 'timeline') {
				fixScrollbarPosition();
			}
			preView = curView;
		});
	}
})();
