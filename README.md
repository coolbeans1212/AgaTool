<img src="https://github.com/user-attachments/assets/428d6378-4727-4126-8da9-1aab4f0d0838" width=100%>

i chatgpt-ed the readme im sorry i cant be bothered right now<br>
<h1>AgaTool</h1>
AgaTool is a powerful and customizable bookmarklet designed for enhancing your browsing experience. Originally created for the <a href="https://hackclub.github.io/hacklet/">Hacklet YSWS</a> project and as a way to explore JavaScript development, AgaTool provides a versatile toolset for quick access to utilities and websites.

---

## 🚀 Features

- **Customizable Multi-Tool Interface**: AgaTool allows you to open multiple draggable and resizable windows embedded directly in the webpage.
- **Session Persistence**: AgaTool saves the position, size, and content of its windows locally via `localStorage` so that you can pick up where you left off.
- **Built-in Utilities**:
  - **Notepad**: A simple text editor with auto-saving functionality.
  - **Calculator**: Quickly open a JavaScript-based calculator.
  - **Search**: Perform Bing searches directly from the tool by typing `search:<query>`.
  - **Website Viewer**: Open any URL in an iframe (though most websites, including mine, block iframe embedding).

---

## 📚 Commands

Here are the available commands you can use in the input field:

- **`notepad`**: Opens a notepad where you can write and save notes.
- **`calculator`**: Launches a simple calculator application.
- **`ai`**: Opens the AIgaTool interface, powered by Hack Club.
- **`search:<query>`**: Search Bing for any query (e.g., `search:JavaScript tutorials`).
- **`<url>`**: Opens the specified URL in an iframe (e.g., `https://example.com`).

---

## 📦 Installation

4. Create a new bookmark in your browser.
5. Paste [this](https://raw.githubusercontent.com/coolbeans1212/AgaTool/refs/heads/main/bookmarklet.js) into the URL field of the bookmark.
7. Save the bookmark and click it on any webpage to activate AgaTool.<br>
Please note: this only works on certain web browsers due to some having a character limit on bookmarklets (it works on my machine).

---

## 🛠️ How It Barely Works

### AgaTool Window

- **Draggable**: Click and drag the header to move the window.
- **Resizable**: Drag the bottom-right corner of the window to resize it.
- **Persistent**: The state (position, size, and URL) of the tool is stored in `localStorage` for future sessions.

### Built-In Options

- **Information Panel**: Click the "ⓘ" icon to view detailed instructions and available commands.
- **Close Button**: Click "X" to close a window and remove its session data.
- **Delete All Data**: Click the bomb icon to clear all AgaTool-related data from `localStorage`.

---

## 🤝 Contributions

Contributions are not welcome! If you have ideas for new features, bug fixes, or improvements, do not feel free to open a pull request or an issue.

---

## 📜 License

AgaTool is licensed under the [AGPL-3.0 License](https://www.gnu.org/licenses/agpl-3.0.html).

---

![9e87e28f51c6caa8](https://github.com/user-attachments/assets/eaee3476-333d-40c3-97f7-5265d7f98caf)

---

This bookmarklet is fully supported on Chromium-based browsers only. Firefox may still work, but expect bugs.