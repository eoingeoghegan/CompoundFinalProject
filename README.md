Progress of the project

Start
## Backend Technology 
# Commands used/ tech installed in order
- npm init – in VS to start project, this creates the package.json (questions about the project in json format)
# Code Quality Controls:
- npm install -D eslint - ESLint enforces a range of configurable Javascript standards + created a eslint file showing the standards
- npm install -D  prettier - Prettier is a code formatter + created prettier file showing the format settings
- Added gitignore file to prevent generated files from populating git
# Created the server
- npm install @hapi/hapi - Used to add server and can run npm run start
- created src/server.js (server) to run locally on port 3000.
- Updated package.json to include src/server.js as main + script start
- npm run start allows the application to run and view in the browser.

# To view the application
- npm install @hapi/vision - Used to view HTML pages
- 	npm install handlebars - to create the html pages to be viewed
- Then created views/routes/controllers/layout for the application
-	layout.hbs
-	main.hbs
-	compound-brand.hbs
-	welcome-menu.hbs
-	web-routes.js
-	dashboard-controller.js

- Updated the server, imported vision and handlebars and web-routes, 
- updated the init function to include server.register(Vision) and server.route(Webroutes) to allow the app to run and be viewed
