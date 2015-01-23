Application created to showcase a simple API restful service based on a User Loyalty program for Button.

The API structure is as followed.

----
Name: Get All User
Description: Returns all users within the system.
API Path: GET /api/users
Returns: 200 -[{"_id":string, "firstName":string, "lastName": string, "email", string}]

----
Name: Gets User
Description: Returns a single users within the system based on the id provided within the query string.
GET /api/users/:id
Returns: 200 - {"_id":string, "firstName":string, "lastName": string, "email", string}
Errors: 500 - Invalid query data, 404 - User not Found.

----
Name: Create User
Description: Creates a user within the system. A user must contain a unique email address.
POST /api/users
Request Body: {"firstName":string, "lastName": string, "email", string}
Returns: 201 - {"_id":string, "firstName":string, "lastName": string, "email", string}
Errors: 500 - Invalid Data

----
Name: Update User
Description: Updates a current user within the system. The id of the user must be provided to update.
POST /api/users/:id
Request Body: {"firstName":string, "lastName": string, "email", string}
Returns: 200 - {"_id":string, "firstName":string, "lastName": string, "email", string}
Errors: 500 - Invalid Data, 404 - User not Found.

----
Name: Get User Loyatly Points
Description: Gets the user's current loyalty points and all transactions that have been applied to their account.
GET /api/users/:id/points
Returns 200 - {"currentAmount":number, "transactions":[{amount: number, created: date}],"lastModified":date}
Errors: 404 - User not found.

----
Name: Post User Loyalty Points
Description: Posts a user loyalty transaction to the user and updates their current points. The points can be negative if deducitng points from the user.
Request Body: {"amount":number }
Returns: 200 - Empty Body
Errors: 404 - User not Found, 409 - Conflict due to not enough points, 500 - Misc Error.