# Vacation-Manager

To run the web client:
1. Navigate to the client folder
2. npm i - to install the packages
3. npm start- to get the client running

To run the web server:
1. navigate to server folder
2. npm i - to install the packages
3. npm start- to get the server running


To start the slack server:
 
1. to make the server for slack running we need to expose the localhost to slack server
2. https://dashboard.ngrok.com/get-started - navigate to this page (do sign up if needed)
3. install ngrok in local
4. check ngrok is porperly installed
5. navigate to slack folder 
6. npm i - to install required packages
7. npm start - to get the server running
6. open command prompt "ngrok http {port number of slack server}" 
7. copy the forwading url from the command line
8. navigate to "https://api.slack.com/apps" - login to 180bar40 workspace
9. open "vacation manger" app from the list
10. from the list of features in the  left side , choose "slash commnads"
11. Choose edit and paste the copied url form step 7 save and exit
12. from the list of features in the left side , chose "interactive components"
13. enter "{URL form step}/slack/actions" in request url and save
14. "/vacation" in slack app should bring message from server
