#Application created to showcase a simple API restful service based on a User Loyalty program for Button.

###The API structure is as followed.

####Get All User
**Description:** Returns all users within the system.<br/>
**API Path:** GET /api/users<br/>
**Response Code:** 200<br/>
**Response Body:** [{"_id":string, "firstName":string, "lastName": string, "email", string}]<br/>

####Gets User
**Description:** Returns a single users within the system based on the id provided within the query string.<br/>
**API Path:** GET /api/users/:id<br/>
**Response Code:** 200<br/>
**Response Body:** {"_id":string, "firstName":string, "lastName": string, "email", string}<br/>
**Errors:** 500 - Invalid query data, 404 - User not Found.<br/>

####Create User
**Description:** Creates a user within the system. A user must contain a unique email address.<br/>
**API Path:** POST /api/users<br/>
**Request Body:** {"firstName":string, "lastName": string, "email", string}<br/>
**Response Code:** 201 - {"_id":string, "firstName":string, "lastName": string, "email", string}<br/>
**Errors:** 500 - Invalid Data<br/>

####Update User
**Description:** Updates a current user within the system. The id of the user must be provided to update.<br/>
**API Path:** POST /api/users/:id<br/>
**Request Body:** {"firstName":string, "lastName": string, "email", string}<br/>
**Response Code:** 200 - {"_id":string, "firstName":string, "lastName": string, "email", string}<br/>
**Errors:** 500 - Invalid Data, 404 - User not Found.<br/>

####Get User Loyatly Points
**Description:** Gets the user's current loyalty points and all transactions that have been applied to their account.<br/>
**API Path:** GET /api/users/:id/points<br/>
**Response Code:** 200<br/>
**Response Body:** {"currentAmount":number, "transactions":[{amount: number, created: date}],"lastModified":date}<br/>
**Errors:** 404 - User not found.<br/>

####Post User Loyalty Points
**Description:** Posts a user loyalty transaction to the user and updates their current points. The points can be negative if deducitng points from the user.<br/>
**API Path:**  POST /api/users/:id/points<br/>
**Request Body:** {"amount":number }
**Response Code:** 200<br/>
**Response Body:** Empty<br/>
**Errors:** 404 - User not Found, 409 - Conflict due to not enough points, 500 - Misc Error.<br/>