import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension is now active!');

    // Register a command to update VSCode with the correct Linux package manager
    const updatePackageManagerCommand = vscode.commands.registerCommand('vs-code-updator.updateLinuxPackageManager', () => {
        // Check for apt
        exec('command -v apt', (error, stdout, stderr) => {
            if (stdout && stdout.trim().length > 0) {
                vscode.window.showInformationMessage('Detected package manager: apt');
            } else {
                // Check for pacman if apt not found
                exec('command -v pacman', (error2, stdout2, stderr2) => {
                    if (stdout2 && stdout2.trim().length > 0) {
                        vscode.window.showInformationMessage('Detected package manager: pacman');
                    } else {
                        // Check for dnf if neither apt nor pacman found
                        exec('command -v dnf', (error3, stdout3, stderr3) => {
                            if (stdout3 && stdout3.trim().length > 0) {
                                vscode.window.showInformationMessage('Detected package manager: dnf');
                            } else {
                                vscode.window.showInformationMessage('Package manager not detected');
                            }
                        });
                    }
                });
            }
        });
    });
    context.subscriptions.push(updatePackageManagerCommand);

	const disposable = vscode.commands.registerCommand('vs-code-updator.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from VS Code Updator!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
