/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/


import * as vscode from 'vscode';
import * as moment from 'moment-jalaali';
let myStatusBarItem: vscode.StatusBarItem;

moment.locale('fa');
moment.loadPersian({usePersianDigits: true,dialect: 'persian-modern'});

export function activate(context: vscode.ExtensionContext) {

	let myCommandId = 'extensions.mohsendavari.jalali-date-statusbar';
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(cfg => {
        if (cfg.affectsConfiguration("extensions.mohsendavari.jalali-date-statusbar")) {
				refreshProjects();
        }
	}));
	
	let disposable = vscode.commands.registerCommand(myCommandId, () => {
		refreshProjects();	
	});

	context.subscriptions.push(disposable);


	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	myStatusBarItem.command = myCommandId;
	context.subscriptions.push(myStatusBarItem);
	// update status bar item once at start
	updateStatusBarItem();
}
function refreshProjects(): void {
	let todayJalali = moment().format('ddd jDo jMMMM  jYYYY  ساعت  h و mm دقیقه');
	vscode.window.showInformationMessage(`هم اکنون  ${todayJalali} میباشد`);
	const showProjectList = vscode.workspace.getConfiguration("mohsendavari.jalali-date-statusbar").get("showProjectList");
	if( showProjectList){
		vscode.commands.executeCommand('projectManager.listProjects');
	}
}
function updateStatusBarItem(): void {
	let todayJalali = moment().locale('fa').format('jYYYY/jM/jD');
		myStatusBarItem.text = todayJalali;
		myStatusBarItem.show();

}
