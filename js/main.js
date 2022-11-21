'use strict';

$(function() {
	start();
});

function start() {
	const root = $('#root');
	const task = makeTask();

	const second = task[0];
	renderTask(task, root);

	$('#unknown-value').on('input', function(e) {
		const strVal = $(e.target).val();
		const val = +strVal;
		$('#unknown-value').removeClass('wrong');
		$('#unknown-value').removeClass('correct');
		if (!strVal || isNaN(val))
			return;
		if (val == second) {
			$('#unknown-value').removeClass('wrong');
			$('#unknown-value').addClass('correct');
		} else {
			$('#unknown-value').removeClass('correct');
			$('#unknown-value').addClass('wrong');
		}
	});
	$('#unknown-value').focus();
}

function renderTask(task, root) {
	root.empty();
	for (let i = 1; i <= 5; i++) {
		root.append(renderValueOrInput(task[i]));
	}
}

function renderValueOrInput(value) {
	if (value === '?') {
		return $('<input type="number" id="unknown-value" autofocus>');
	} else {
		return $('<span class="value">' + value + '</span>');
	}
}

function makeTask() {
	// const operations = ['+', '-'];
	const operations = ['+'];
	const operation = randomChoice(operations);

	const result = 4 + randomUpTo(10 - 4);
	const known = randomUpTo(result);

	let task;
	if (operation == '+') {
		const second = result - known;
		if (Math.random() >= 0.5) {
			task = [second, known, '+', '?', '=', result];
		} else {
			task = [second, '?', '+', known, '=', result];
		}
	}

	return task;
}

function randomUpTo(max) {
	return Math.floor(Math.random() * max);
}

function randomChoice(arr) {
	return arr[randomUpTo(arr.length - 1)];
}
