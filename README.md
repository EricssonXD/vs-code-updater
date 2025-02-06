# VS Code Updater

This VS Code extension detects the Linux package manager available on your system and provides commands to perform system updates accordingly.

## Features

- **Detect Package Manager**  
  The extension identifies your Linux package manager (supports `apt`, `pacman`, and `dnf`) using the `vs-code-updater.detectPackageManager` command.

- **Perform System Update**  
  Execute the appropriate update command for your system with the `vs-code-updater.performUpdate` command. The extension automatically determines whether to run the update with `sudo` based on your system permissions.

## Installation

1. Clone the repository.
2. Run `npm install` or `pnpm install` to install dependencies.
3. Open the project in Visual Studio Code.
4. Press `F5` to launch a new Extension Development Host.

## Usage

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Type **Detect Package Manager** and select the command to see which package manager is installed.
3. Type **Perform Update** and select the command to update your system using the detected package manager.

## Development

- The main extension logic is located in `src/extension.ts`.
- Update commands are executed using Node's `child_process` with proper error handling and permission checks.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.
