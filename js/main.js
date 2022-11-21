'use strict';

$(function() {
	start();
});

function start() {
	const root = $('#root');
	const task = makeTask();
	console.log('task', task)

	const unknown = task[0];
	renderTask(task, root);

	$('#unknown-value').on('input', function(e) {
		const strVal = $(e.target).val();
		const val = +strVal;
		$('#unknown-value').removeClass('wrong');
		$('#unknown-value').removeClass('correct');
		if (!strVal || isNaN(val))
			return;
		if (val == unknown) {
			$('#unknown-value').removeClass('wrong');
			$('#unknown-value').addClass('correct');
		} else {
			$('#unknown-value').removeClass('correct');
			$('#unknown-value').addClass('wrong');
		}
	});
	$('#unknown-value').focus();
	$("#next-task").click(start);
}

function renderTask(task, root) {
	root.empty();
	root.append($('<button id="next-task">&#8634;</button>'));
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
	const operations = ['+', '-'];
	const operation = randomChoice(operations);

	let result, known, unknown;
	if (operation == '+') {
		result = 4 + randomUpTo(10 - 4);
		known = randomUpTo(result);
		unknown = result - known;
		if (Math.random() >= 0.5) {
			return [unknown, known, operation, '?', '=', result];
		} else {
			return [unknown, '?', operation, known, '=', result];
		}
	} else if (operation == '-') {
		if (Math.random() >= 0.5) {
			result = randomUpTo(5);
			known = 5 + randomUpTo(5);
			unknown = known - result;
			return [unknown, known, operation, '?', '=', result];
		} else {
			result = randomUpTo(5);
			known = randomUpTo(5);
			unknown = known + result;
			return [unknown, '?', operation, known, '=', result];
		}
	}
}

function randomUpTo(max) {
	return Math.floor(Math.random() * max);
}

function randomChoice(arr) {
	return arr[randomUpTo(arr.length)];
}
