/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/


import * as vscode from 'vscode';
import * as moment from 'moment-jalaali';
let myStatusBarItem: vscode.StatusBarItem;

moment.locale('fa');
moment.loadPersian({usePersianDigits: true,dialect: 'persian-modern'});

export function activate(context: vscode.ExtensionContext) {

	// register a command that is invoked when the status bar
	const myCommandId = 'extensions.mohsendavari.jalali-date-statusbar';


	let disposable = vscode.commands.registerCommand('extensions.mohsendavari.jalali-date-statusbar', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user

		let todayJalali = moment().format('ddd jDo jMMMM  jYYYY  ساعت  h و mm دقیقه');
		vscode.window.showInformationMessage(`هم اکنون  ${todayJalali} میباشد`);
	
	});

	context.subscriptions.push(disposable);


	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	myStatusBarItem.command = myCommandId;
	context.subscriptions.push(myStatusBarItem);


	// update status bar item once at start
	updateStatusBarItem();
}

function updateStatusBarItem(): void {
	let todayJalali = moment().locale('fa').format('jYYYY/jM/jD');
		myStatusBarItem.text = todayJalali;
		myStatusBarItem.show();

}
