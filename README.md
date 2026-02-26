Progress of the project


# Backend Technology 
## Sprint 2 - 23/02/2026
## Session 1 - 3 hours
-	Updated list workout partial to include button with workout id
-	Created new view for adding exercises to a custom workout card. Created list and add exercise partials for this along with new controller, memory store for exercises and updated the routes + db. 
-	Updated workout memory store to retrieve exercises that are add to workout.
-	Now the user can create a custom workout card, enter the card and add workout information to it. 
-	Created a predefinedCards partial for dashboard view, used AI for generated images for predefined cards. Made cards a link to workouts.
-	Created views, controller for  predefined cards along with route to view these cards.
## Session 2 – 3 hours
-	Hardcoded workouts for predefined cards. Created a table for these.
-	Changed how dash displays information. 
-	Work on updating and deleting workouts and editing/deleting exercises, created button to delete workout/id for workout and workout/{{../workout._id}}/deleteexercise/{{_id}} for exercise in a workout, updated route added delete workout and exercises to controllers. 
-	Sessions work - Installed hapi/cookie, updated cookie session strategy in server  to trigger for all routes. Added validate function and updated login function to set cookie if the user logs in successfully. Turned auth to false in accounts to allow access to the pages in browser. To fix the global information updated the dashboard controller + added getUserWorkouts function in workout store to allow logged in user to view their own data.
-	Installed dot.env to protect sensitive application information
	

## App Progress
- Now user can delete workouts,exercises. The application has authentication/validation using cookies + session. The application renders loggedInUsers information so it’s not global.  Application tested without .env and it failed to load so all working.

## Session 3 - 2 hours
First let user edit workout information.
-	Added view for Tracker tab + created controller, store and updated routes.
-	Add a form to where the user adds exercises to the workout. This is a button which copies the users added exercises. When copied it save this and displays It on the tracker tab showing the title of the workout, the date and the workout completed. 
## Session3 progress
The user can create a workout, when inside the workout there is a track workout button now. When pressed it copies whatever exercises that are added and saves this to the tracker tab. It record the time and date the workout is completed and shows the workout title. This has a controller for tracker and uses the workout controller. It has a trackers store in memory and the routes are completed to allow info to be displayed. Need to be fine tuned but working as planned.

## TODO !!!!!
-	When updated navbar with exercises  must make views for these and update routes and create controllers. 
-	Change button icon in list workout partial
-	Edit customs workouts
-	Add track workout to predefined cards. Need to rework this to let user edit the workouts first as hardcoded. Or leave as is and have starting at lower weights so user can start with this and make their own version??
-	Change to json
-	Change to mongo
-	Joi validation
-	Maybe add images to custom workout cards by user?? In add workout maybe drop option to select body part?? From predefined images??
-	Tracker tab not highlighted with colour
-	Make tracker view nicer when exercises are added.
-	Fix the date on tracker.
-	Delete/edit tracked workouts when saved.

## Down the line
-	Filter saved workouts
-	Group workouts body type

## FUNCTIONALITY!!
-	Tracker tab to store an entry of the exercise completed.. works selecting tracker tab, seeing an option for select workout- allowing user picking a predefined card or custom workout from dashboard and having the option to complete one which saves with timestamp
## Challenges
-	1) The dashboard has predefined cards for upper, lower, full body and core. The user can create customs workouts also. All the workouts store the description, equipment used, weight, reps, and set in a table. this is fine for viewing workouts. In my tracker tab I’m having difficulty thinking of how it will work, and how it will be different from the dashboard
-	1) Solution - Rethinking of logic to application- Dashboard displays predefined workouts and user can make custom ones. The user should be able to click into a workout(predefined or custom) to view the workout and be able to edit and update the weight, reps and sets. There should be a button then to allow user to start the workout which copies the information in the table. The tracker tab should then display the workout that was done with the information for that session and a timestamp. So if a new workout is edited and started it will record and display this on tab tracker. 
	

## References 
The Compound images for the application was generated using ChatGPT (OpenAI) image generation tools.
All brand assets are original and AI-generated for this project.
- Compound Logo - Logo generated using ChatGPT (OpenAI), 2026
- Compound Welcome Screen image - Welcome Screen generated using ChatGPT (OpenAI), 2026
- Compound Dashboard Predefined Card images, upper.png, lower.png, core.png, full.png, predefinedCards.png generated using ChatGPT (OpenAI), 2026
