**📌 # Project Overview**

This repository is a **common project** structure used to manage and host **multiple HTML web pages** from a single repository using GitHub Pages.
Each web page is organized inside its own folder, while shared logic is maintained centrally.


**🏗️ Project Structure**

## **html_web_pages/
│
├── widgets.json          # Common widget configuration
├── widgets-core.js       # Shared logic for all pages
│
├── ## **test1/**
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── ## **test2/**
│   ├── index.html
│   ├── style.css
│   └── script.js



**🎯 Goal**
Manage multiple HTML pages in a single repository
Use shared logic (widgets-core.js) across all pages
Host everything using GitHub Pages
Access each page via a unique URL


**🌐 Live URLs**
After hosting with GitHub Pages, pages can be accessed like:

👉 https://acme9614.github.io/html_web_pages/test1
👉 https://acme9614.github.io/html_web_pages/test2


**⚙️ How It Works**
Each folder (test1, test2, etc.) acts as an independent web page
Shared configuration is stored in widgets.json
Common functionality is handled in widgets-core.js
Pages dynamically use shared logic for consistency
