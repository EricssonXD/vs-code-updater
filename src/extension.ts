import * as vscode from "vscode";
import { exec, execSync } from "child_process";

export function activate(context: vscode.ExtensionContext) {
  console.log("VS Code Updater extension is active.");

  // Register Update VSCode command
  const updateCmd = vscode.commands.registerCommand(
    "vs-code-updater.updateVSCode",
    () => {
      const packageManager = detectPackageManager();
      let updateCommand = "";

      if (packageManager === "apt") {
        updateCommand = "sudo apt update && sudo apt upgrade code -y";
      } else if (packageManager === "yum") {
        updateCommand = "sudo yum update code -y";
      } else if (packageManager === "dnf") {
        updateCommand = "sudo dnf upgrade code -y";
      } else if (packageManager === "pacman") {
        updateCommand = "sudo pacman -Syu code";
      } else if (packageManager === "zypper") {
        updateCommand = "sudo zypper update code";
      } else {
        vscode.window.showErrorMessage(
          "Unsupported package manager or none detected."
        );
        return;
      }

      vscode.window.showInformationMessage(
        `Executing update: ${updateCommand}`
      );
      exec(updateCommand, (err, stdout, stderr) => {
        if (err) {
          vscode.window.showErrorMessage(`Update failed: ${stderr}`);
          return;
        }
        vscode.window.showInformationMessage("VSCode updated successfully.");
      });
    }
  );

  context.subscriptions.push(updateCmd);
}

export function deactivate() {}

function detectPackageManager(): string {
  try {
    execSync("which apt");
    return "apt";
  } catch (e) {}
  try {
    execSync("which yum");
    return "yum";
  } catch (e) {}
  try {
    execSync("which dnf");
    return "dnf";
  } catch (e) {}
  try {
    execSync("which pacman");
    return "pacman";
  } catch (e) {}
  try {
    execSync("which zypper");
    return "zypper";
  } catch (e) {}
  return "unknown";
}
