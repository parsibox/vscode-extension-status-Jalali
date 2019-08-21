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
	
	let disposable_open_this_porject = vscode.commands.registerCommand('extensions.mohsendavari.jalali-date-statusbar-open-this-file-project', () => {
		open_this_porject();	
	});
	let disposable_porjects = vscode.commands.registerCommand('extensions.mohsendavari.jalali-date-statusbar-show-my-projects', () => {
		showProjects();	
	});
	let disposable = vscode.commands.registerCommand('extensions.mohsendavari.jalali-date-statusbar', () => {
		refreshDate();	
	});
	let disposable_click = vscode.commands.registerCommand('extensions.mohsendavari.jalali-date-statusbar-click', () => {
		refreshProjects();	
		refreshDate();	
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable_porjects);
	context.subscriptions.push(disposable_open_this_porject);
	context.subscriptions.push(disposable_click);


	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	myStatusBarItem.command = 'extensions.mohsendavari.jalali-date-statusbar-click';
	context.subscriptions.push(myStatusBarItem);
	// update status bar item once at start
	updateStatusBarItem();
}
function refreshDate(): void {
	let todayJalali = moment().format('ddd jDo jMMMM  jYYYY  ساعت  h و mm دقیقه');
	vscode.window.showInformationMessage(`هم اکنون  ${todayJalali} میباشد`);
}
function refreshProjects(): void {
	const showProjectList = vscode.workspace.getConfiguration("mohsendavari.jalali-date-statusbar").get("showProjectList");
	if( showProjectList){
		showProjects();
	}	
}
function showProjects(): void {
		vscode.commands.executeCommand('projectManager.listProjects');	
}
function open_this_porject(): void {
	let textEditor = vscode.window.activeTextEditor;
	if (typeof(textEditor) === 'undefined') {
		return ;
	  }
	let uri = textEditor.document.uri;
	let my_file_str =uri.fsPath;
	var my_folder_uri;
	    
	if (process.platform === "win32") {
		my_folder_uri =my_file_str.substring(0, my_file_str.lastIndexOf("\\"));
	} else {
		my_folder_uri =my_file_str.substring(0, my_file_str.lastIndexOf("/"));
	} 
	if( my_file_str.lastIndexOf("admin") != -1 ){
		my_folder_uri =my_folder_uri.substring(0, my_folder_uri.lastIndexOf("admin"));
	}
	if( my_file_str.lastIndexOf("include") != -1 ){
		my_folder_uri =my_folder_uri.substring(0, my_folder_uri.lastIndexOf("include"));
	}
	if( my_file_str.lastIndexOf("templates") != -1 ){
		my_folder_uri =my_folder_uri.substring(0, my_folder_uri.lastIndexOf("templates"));
	}

	//console.log( my_folder_uri );
	let uri_new = vscode.Uri.file(my_folder_uri);
	vscode.commands.executeCommand('vscode.openFolder' ,uri_new);	
	vscode.window.showInformationMessage('در حال بازکردن پروژه شما');

	
}

function updateStatusBarItem(): void {
	let todayJalali = moment().locale('fa').format('jYYYY/jM/jD');
		myStatusBarItem.text = todayJalali;
		myStatusBarItem.show();

}
