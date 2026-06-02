# Design Decisions

## 1. Why I Chose This Stack

I chose Node.js and Express.js for the backend because they provide a simple and lightweight way to build REST APIs. Since JavaScript is also used on the frontend, it allowed me to work with a single programming language throughout the project.

I chose MongoDB with Mongoose because the application involves related data such as Users, Events, and Registrations. MongoDB makes it easy to store and retrieve this data, while Mongoose provides schema validation and a structured way to interact with the database.

The frontend was built using HTML, CSS, and JavaScript to keep the application simple and easy to understand without introducing additional frameworks.

---

## 2. One Decision I Made That Was Not Specified in the Brief

I decided to implement capacity validation on the backend in addition to disabling the registration button on the frontend.

While the frontend prevents users from registering for full events through the user interface, backend validation ensures that event capacity limits cannot be bypassed by sending direct API requests.

This approach keeps the application more reliable and maintains data integrity by guaranteeing that registrations never exceed the event capacity.
 
--- 

## 3. One Thing I Would Improve With More Time

Given additional time, I would implement JWT-based authentication and password hashing.

Currently, authentication is implemented using basic username and password validation for simplicity. A production-ready version would store hashed passwords and use secure authentication tokens to protect user sessions.

Additional improvements could include:

* Event editing and deletion
* Search and filtering for events
* Responsive mobile design
* Email notifications for registrations

These enhancements would improve both security and user experience.

---

