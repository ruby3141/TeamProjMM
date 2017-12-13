api documentation
========
### format: api name here
request type: get or post

	/api/name/here/[variable]
	variable - description here
	"property_name": "description here",
	"url_encoded_when_get": "json_encoded_when_post"

response json:

	{
		"property_name": "description here",
		"": 
	}

additional description can be provided here

### login
request type: post

	/api/user/login
	"id": "text id of user."
	"password": "text password of user."

response json:

	{
		"success": "true or false"
	}

login token will be located in cookie.

### list groups
request type: get

	/api/group/list

response json:

	{
		"groups":
		[{
			"id": "integer id of group",
			"name": "string name of group",
			"members": "number of group member"
			"maxmembers": "maximum number of group member"
		}, ...]
	}

### join groups
request type: post

	/api/group/join
	"groupid": "integer id of group"

response json:

	{
		"success": "true or false"
	}

when failed, response may contain "reason": "reason why failed".

### create groups
request type: post

	/api/group/create
	"name": "string name of group"
	"maxmembers": "maximum number of group number"

response json:

	{
		"success": "true or false"
	}

when success, response always contain "id": "integer id of group"

### get group detail

request type: get

	/api/group/[id]
	id - integer id of group

response json:

	{
		"maxmember": "maximum number of member",
		"member":
		[{
			"name": "string name of member",
			"contact":
			[{
				"type": "string, like email, telephone number, etc...",
				"value": "contact point here"
			}, ...]
		}, ...]
	}

### list my contacts
request type: get

	/api/user/contacts/list

response json:

	{
		"contact":
		[{
			"id": "integer id of contact.",
			"type": "string, like email, telephone number, etc...",
			"value": "contact point here"
		}, ...]
	}

### add my contacts
request type: post

	/api/user/contacts/add
	"type": "string, like email, telephone number, etc...",
	"value": "contact point here"

response json:

	{
		"success": "true or false"
	}
