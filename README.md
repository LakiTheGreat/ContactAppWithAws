# Contact App Frontend Shell

This is a barebones application. It's a frontend project developed in React. The concept behind this project is to offer a frontend template, essentially a sandbox, for other projects.

"Shell" in this context means that the Contact app serves as a basic framework or structure with user interface components and some minimal functionality but lacks in-depth or fully implemented features. It provides a starting point for building a more complex application but doesn't perform any substantial actions on its own. Buttons and elements may be present, but they don't have real functionality beyond basic rendering or routing

All data is mocked and can be found in "__mock__" folder.

### What this app HAS? 
1.  Material UI, 
2.  React-hook forms (with Yup),
3.  React-router-dom

### What this app HAS NOT? 
1.  No store of any kind,
2.  Feching library

In the project directory, you can run:

### `npm install`, in frontend folder

To everything that is needed, and then:


### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


**Feel free to make any changes to the app, including the already installed libraries. There is no data storage or retrieval mechanisms in place, providing you with the flexibility to adapt this project to your specific requirements. We encourage you to tailor it according to your needs rather than pushing you towards predefined solutions.**

P.S. There is a single component responsible for rendering all contacts, including those in 'All' and 'Favorites' categories, as well as contacts with existing and potential future labels. When the URL changes, the component dynamically updates the displayed data. Feel free to modify this approach according to your preferences.


