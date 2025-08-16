---
title: Enxero Platform Backend API v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="enxero-platform-backend-api">Enxero Platform Backend API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Comprehensive API documentation for the Enxero Platform Backend, including Authentication, User Management, Company Management, Employee Management, Payroll Management, Leave Management, Forms Management, File Management, Notifications, Audit Logging, Integrations, and System Configuration.

Base URLs:

* <a href="http://localhost:3000/api/v1">http://localhost:3000/api/v1</a>

Email: <a href="mailto:support@enxero.com">Enxero Support</a> Web: <a href="https://www.enxero.com/support">Enxero Support</a> 

# Authentication

- HTTP Authentication, scheme: bearer Enter the JWT token in the format "Bearer <token>"

<h1 id="enxero-platform-backend-api-auth">Auth</h1>

Authentication and user management

## post__auth_register

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/auth/register HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "pa$$word",
  "firstName": "string",
  "lastName": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/auth/register',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/auth/register',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/auth/register', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/auth/register', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/auth/register");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/auth/register", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /auth/register`

*Register a new user*

> Body parameter

```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "pa$$word",
  "firstName": "string",
  "lastName": "string"
}
```

<h3 id="post__auth_register-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[RegisterInput](#schemaregisterinput)|true|none|

> Example responses

> 201 Response

```json
{
  "status": "success",
  "data": {
    "accessToken": "string",
    "refreshToken": "string",
    "user": {
      "id": "string",
      "email": "string",
      "username": "string",
      "role": "string"
    }
  }
}
```

<h3 id="post__auth_register-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|User registered successfully|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request, validation error|[Error](#schemaerror)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|User already exists|[Error](#schemaerror)|

<h3 id="post__auth_register-responseschema">Response Schema</h3>

Status Code **201**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|object|false|none|none|
|»» accessToken|string|false|none|none|
|»» refreshToken|string|false|none|none|
|»» user|object|false|none|none|
|»»» id|string|false|none|none|
|»»» email|string|false|none|none|
|»»» username|string|false|none|none|
|»»» role|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__auth_login

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/auth/login HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "email": "user@example.com",
  "password": "password123"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/auth/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/auth/login',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/auth/login', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/auth/login', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/auth/login");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/auth/login", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /auth/login`

*Log in a user*

> Body parameter

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

<h3 id="post__auth_login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LoginInput](#schemalogininput)|true|none|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": {
    "accessToken": "string",
    "refreshToken": "string",
    "user": {
      "id": "string",
      "email": "string",
      "username": "string",
      "role": "string"
    }
  }
}
```

<h3 id="post__auth_login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User logged in successfully|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request, validation error|[Error](#schemaerror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized, invalid credentials|[Error](#schemaerror)|

<h3 id="post__auth_login-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|object|false|none|none|
|»» accessToken|string|false|none|none|
|»» refreshToken|string|false|none|none|
|»» user|object|false|none|none|
|»»» id|string|false|none|none|
|»»» email|string|false|none|none|
|»»» username|string|false|none|none|
|»»» role|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__auth_refresh

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/auth/refresh \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/auth/refresh HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/auth/refresh',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/auth/refresh',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/auth/refresh', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/auth/refresh', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/auth/refresh");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/auth/refresh", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /auth/refresh`

*Refresh access token using a refresh token*

> Body parameter

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

<h3 id="post__auth_refresh-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[RefreshTokenInput](#schemarefreshtokeninput)|true|none|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": {
    "accessToken": "string",
    "refreshToken": "string"
  }
}
```

<h3 id="post__auth_refresh-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Token refreshed successfully|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request, validation error|[Error](#schemaerror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized, invalid or expired refresh token|[Error](#schemaerror)|

<h3 id="post__auth_refresh-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|object|false|none|none|
|»» accessToken|string|false|none|none|
|»» refreshToken|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="enxero-platform-backend-api-users">Users</h1>

User management operations

## get__users_password-history

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/users/password-history \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/users/password-history HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/users/password-history',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/users/password-history',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/users/password-history', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/users/password-history', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/users/password-history");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/users/password-history", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /users/password-history`

*Get user password history*

> Example responses

> 200 Response

```json
{
  "passwordHistory": [
    {
      "changedAt": "2019-08-24T14:15:22Z"
    }
  ],
  "lastPasswordChange": "2019-08-24T14:15:22Z"
}
```

<h3 id="get__users_password-history-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User password history retrieved successfully|[PasswordHistoryOutput](#schemapasswordhistoryoutput)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized, no token or invalid token|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__users_profile

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/users/profile \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/users/profile HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/users/profile',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/users/profile',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/users/profile', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/users/profile', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/users/profile");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/users/profile", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /users/profile`

*Get the authenticated user's profile*

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "email": "user@example.com",
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "avatar": "string",
  "bio": "string",
  "preferences": {},
  "language": "string",
  "timezone": "string",
  "role": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "permissions": [
      "string"
    ]
  },
  "company": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string"
  }
}
```

<h3 id="get__users_profile-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User profile retrieved successfully|[UserProfile](#schemauserprofile)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized, no token or invalid token|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__users_profile

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:3000/api/v1/users/profile \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:3000/api/v1/users/profile HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "avatar": "string",
  "bio": "string",
  "preferences": {},
  "language": "st",
  "timezone": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/users/profile',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:3000/api/v1/users/profile',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:3000/api/v1/users/profile', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:3000/api/v1/users/profile', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/users/profile");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:3000/api/v1/users/profile", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /users/profile`

*Update the authenticated user's profile*

> Body parameter

```json
{
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "avatar": "string",
  "bio": "string",
  "preferences": {},
  "language": "st",
  "timezone": "string"
}
```

<h3 id="put__users_profile-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UpdateProfileInput](#schemaupdateprofileinput)|true|none|

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "email": "user@example.com",
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "avatar": "string",
  "bio": "string",
  "preferences": {},
  "language": "string",
  "timezone": "string",
  "role": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "permissions": [
      "string"
    ]
  },
  "company": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string"
  }
}
```

<h3 id="put__users_profile-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User profile updated successfully|[UserProfile](#schemauserprofile)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request, validation error|[Error](#schemaerror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized, no token or invalid token|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__users_change-password

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:3000/api/v1/users/change-password \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:3000/api/v1/users/change-password HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "currentPassword": "pa$$word",
  "newPassword": "pa$$word"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/users/change-password',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:3000/api/v1/users/change-password',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:3000/api/v1/users/change-password', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:3000/api/v1/users/change-password', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/users/change-password");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:3000/api/v1/users/change-password", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /users/change-password`

*Change the authenticated user's password*

> Body parameter

```json
{
  "currentPassword": "pa$$word",
  "newPassword": "pa$$word"
}
```

<h3 id="put__users_change-password-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ChangePasswordInput](#schemachangepasswordinput)|true|none|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": {
    "message": "Password updated successfully"
  }
}
```

<h3 id="put__users_change-password-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Password changed successfully|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request, validation error or current password incorrect|[Error](#schemaerror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized, no token or invalid token|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|[Error](#schemaerror)|

<h3 id="put__users_change-password-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|object|false|none|none|
|»» message|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__users

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/users \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/users HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/users',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/users',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/users', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/users', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/users");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/users", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /users`

*Get a list of all users with pagination, search, and filtering*

<h3 id="get__users-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Page number for pagination|
|limit|query|integer|false|Number of items per page|
|search|query|string|false|Search term for email, username, first name, or last name|
|roleId|query|string(uuid)|false|Filter users by role ID|
|isActive|query|boolean|false|Filter users by active status|
|sortBy|query|string|false|Field to sort by|
|sortOrder|query|string|false|Sort order (asc/desc)|

#### Enumerated Values

|Parameter|Value|
|---|---|
|sortBy|firstName|
|sortBy|lastName|
|sortBy|email|
|sortBy|createdAt|
|sortOrder|asc|
|sortOrder|desc|

> Example responses

> 200 Response

```json
{
  "data": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "email": "user@example.com",
      "firstName": "string",
      "lastName": "string",
      "role": {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "name": "string"
      },
      "status": "active",
      "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
      "createdAt": "2019-08-24T14:15:22Z",
      "updatedAt": "2019-08-24T14:15:22Z",
      "username": "string",
      "isActive": true,
      "company": {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "name": "string"
      }
    }
  ],
  "meta": {
    "total": 0,
    "page": 0,
    "limit": 0,
    "totalPages": 0
  }
}
```

<h3 id="get__users-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of users retrieved successfully|[UserPagination](#schemauserpagination)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized, no token or invalid token|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden, insufficient permissions|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__users_{id}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/users/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/users/{id} HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/users/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/users/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/users/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/users/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/users/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/users/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /users/{id}`

*Get a user by ID*

<h3 id="get__users_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the user to retrieve|

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "email": "user@example.com",
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "avatar": "string",
  "isActive": true,
  "role": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "permissions": [
      "string"
    ]
  },
  "company": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string"
  }
}
```

<h3 id="get__users_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User retrieved successfully|[UserDetail](#schemauserdetail)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized, no token or invalid token|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden, insufficient permissions|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__users_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:3000/api/v1/users/{id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:3000/api/v1/users/{id} HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "roleId": "7382d58e-652a-4905-b7c9-bcca1e0e5391",
  "isActive": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/users/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:3000/api/v1/users/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:3000/api/v1/users/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:3000/api/v1/users/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/users/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:3000/api/v1/users/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /users/{id}`

*Update a user by ID*

> Body parameter

```json
{
  "roleId": "7382d58e-652a-4905-b7c9-bcca1e0e5391",
  "isActive": true
}
```

<h3 id="put__users_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the user to update|
|body|body|[UpdateUserInput](#schemaupdateuserinput)|true|none|

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "email": "user@example.com",
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "avatar": "string",
  "isActive": true,
  "role": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "permissions": [
      "string"
    ]
  },
  "company": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string"
  }
}
```

<h3 id="put__users_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User updated successfully|[UserDetail](#schemauserdetail)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request, validation error|[Error](#schemaerror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized, no token or invalid token|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden, insufficient permissions|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User or Role not found|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__users_{id}_status

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:3000/api/v1/users/{id}/status \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:3000/api/v1/users/{id}/status HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "status": "active",
  "reason": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/users/{id}/status',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:3000/api/v1/users/{id}/status',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:3000/api/v1/users/{id}/status', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:3000/api/v1/users/{id}/status', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/users/{id}/status");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:3000/api/v1/users/{id}/status", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /users/{id}/status`

*Update a user's account status*

> Body parameter

```json
{
  "status": "active",
  "reason": "string"
}
```

<h3 id="put__users_{id}_status-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the user to update status for|
|body|body|[UserAccountStatusInput](#schemauseraccountstatusinput)|true|none|

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "email": "user@example.com",
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "avatar": "string",
  "isActive": true,
  "role": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "permissions": [
      "string"
    ]
  },
  "company": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string"
  }
}
```

<h3 id="put__users_{id}_status-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User account status updated successfully|[UserDetail](#schemauserdetail)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request, validation error or user ID is required|[Error](#schemaerror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized, no token or invalid token|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden, insufficient permissions|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## patch__users_{id}_toggle-active

> Code samples

```shell
# You can also use wget
curl -X PATCH http://localhost:3000/api/v1/users/{id}/toggle-active \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PATCH http://localhost:3000/api/v1/users/{id}/toggle-active HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "isActive": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/users/{id}/toggle-active',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.patch 'http://localhost:3000/api/v1/users/{id}/toggle-active',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.patch('http://localhost:3000/api/v1/users/{id}/toggle-active', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PATCH','http://localhost:3000/api/v1/users/{id}/toggle-active', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/users/{id}/toggle-active");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PATCH");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PATCH", "http://localhost:3000/api/v1/users/{id}/toggle-active", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /users/{id}/toggle-active`

*Toggle a user's active status*

> Body parameter

```json
{
  "isActive": true
}
```

<h3 id="patch__users_{id}_toggle-active-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the user to toggle active status for|
|body|body|[ToggleUserActiveStatusInput](#schematoggleuseractivestatusinput)|true|none|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "isActive": true,
    "accountStatus": "active",
    "message": "string"
  }
}
```

<h3 id="patch__users_{id}_toggle-active-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User active status toggled successfully|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request, validation error or isActive status is required|[Error](#schemaerror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized, no token or invalid token|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden, insufficient permissions|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|[Error](#schemaerror)|

<h3 id="patch__users_{id}_toggle-active-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[ToggleUserActiveStatusOutput](#schematoggleuseractivestatusoutput)|false|none|none|
|»» id|string(uuid)|false|none|User ID|
|»» isActive|boolean|false|none|User's new active status|
|»» accountStatus|string|false|none|User's new account status|
|»» message|string|false|none|Status message for the operation|

#### Enumerated Values

|Property|Value|
|---|---|
|accountStatus|active|
|accountStatus|suspended|
|accountStatus|deactivated|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="enxero-platform-backend-api-roles">Roles</h1>

Role management operations

## get__roles

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/roles \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/roles HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/roles',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/roles',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/roles', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/roles', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/roles");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/roles", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /roles`

*Get a list of all roles*

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "name": "string",
      "description": "string",
      "permissions": [
        "string"
      ],
      "createdAt": "2019-08-24T14:15:22Z",
      "updatedAt": "2019-08-24T14:15:22Z"
    }
  ]
}
```

<h3 id="get__roles-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of roles retrieved successfully|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[Error](#schemaerror)|

<h3 id="get__roles-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[[Role](#schemarole)]|false|none|none|
|»» id|string(uuid)|false|none|Role ID|
|»» name|string|false|none|Role name|
|»» description|string|false|none|Role description|
|»» permissions|[string]|false|none|List of permissions associated with the role|
|»» createdAt|string(date-time)|false|none|Role creation timestamp|
|»» updatedAt|string(date-time)|false|none|Last update timestamp|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__roles

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/roles \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/roles HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "name": "string",
  "description": "string",
  "permissions": [
    "string"
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/roles',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/roles',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/roles', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/roles', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/roles");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/roles", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /roles`

*Create a new role*

> Body parameter

```json
{
  "name": "string",
  "description": "string",
  "permissions": [
    "string"
  ]
}
```

<h3 id="post__roles-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateRoleInput](#schemacreateroleinput)|true|none|

> Example responses

> 201 Response

```json
{
  "status": "success",
  "data": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "description": "string",
    "permissions": [
      "string"
    ],
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
}
```

<h3 id="post__roles-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Role created successfully|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request, validation error or role already exists|[Error](#schemaerror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized, no token or invalid token|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden, insufficient permissions|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[Error](#schemaerror)|

<h3 id="post__roles-responseschema">Response Schema</h3>

Status Code **201**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[Role](#schemarole)|false|none|none|
|»» id|string(uuid)|false|none|Role ID|
|»» name|string|false|none|Role name|
|»» description|string|false|none|Role description|
|»» permissions|[string]|false|none|List of permissions associated with the role|
|»» createdAt|string(date-time)|false|none|Role creation timestamp|
|»» updatedAt|string(date-time)|false|none|Last update timestamp|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__roles_{id}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/roles/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/roles/{id} HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/roles/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/roles/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/roles/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/roles/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/roles/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/roles/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /roles/{id}`

*Get a role by ID*

<h3 id="get__roles_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the role to retrieve|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "description": "string",
    "permissions": [
      "string"
    ],
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
}
```

<h3 id="get__roles_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Role retrieved successfully|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Role not found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[Error](#schemaerror)|

<h3 id="get__roles_{id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[Role](#schemarole)|false|none|none|
|»» id|string(uuid)|false|none|Role ID|
|»» name|string|false|none|Role name|
|»» description|string|false|none|Role description|
|»» permissions|[string]|false|none|List of permissions associated with the role|
|»» createdAt|string(date-time)|false|none|Role creation timestamp|
|»» updatedAt|string(date-time)|false|none|Last update timestamp|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__roles_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:3000/api/v1/roles/{id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:3000/api/v1/roles/{id} HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "name": "string",
  "description": "string",
  "permissions": [
    "string"
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/roles/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:3000/api/v1/roles/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:3000/api/v1/roles/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:3000/api/v1/roles/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/roles/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:3000/api/v1/roles/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /roles/{id}`

*Update a role by ID*

> Body parameter

```json
{
  "name": "string",
  "description": "string",
  "permissions": [
    "string"
  ]
}
```

<h3 id="put__roles_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the role to update|
|body|body|[UpdateRoleInput](#schemaupdateroleinput)|true|none|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "description": "string",
    "permissions": [
      "string"
    ],
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
}
```

<h3 id="put__roles_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Role updated successfully|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request, validation error or role name conflict|[Error](#schemaerror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized, no token or invalid token|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden, insufficient permissions|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Role not found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[Error](#schemaerror)|

<h3 id="put__roles_{id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[Role](#schemarole)|false|none|none|
|»» id|string(uuid)|false|none|Role ID|
|»» name|string|false|none|Role name|
|»» description|string|false|none|Role description|
|»» permissions|[string]|false|none|List of permissions associated with the role|
|»» createdAt|string(date-time)|false|none|Role creation timestamp|
|»» updatedAt|string(date-time)|false|none|Last update timestamp|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__roles_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:3000/api/v1/roles/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:3000/api/v1/roles/{id} HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/roles/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:3000/api/v1/roles/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:3000/api/v1/roles/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:3000/api/v1/roles/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/roles/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:3000/api/v1/roles/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /roles/{id}`

*Delete a role by ID*

<h3 id="delete__roles_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the role to delete|

> Example responses

> 400 Response

```json
{
  "success": true,
  "message": "Invalid credentials",
  "errors": [
    "string"
  ],
  "status": "error",
  "details": {
    "field": "email",
    "message": "Email is required"
  }
}
```

<h3 id="delete__roles_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Role deleted successfully (No Content)|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request, role assigned to users|[Error](#schemaerror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized, no token or invalid token|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden, insufficient permissions|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Role not found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="enxero-platform-backend-api-companies">Companies</h1>

Company management operations

## get__companies

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/companies \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/companies HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/companies',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/companies',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/companies', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/companies', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/companies");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/companies", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /companies`

*Get a list of all companies*

<h3 id="get__companies-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Page number|
|limit|query|integer|false|Number of items per page|
|search|query|string|false|Search term|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "name": "string",
      "email": "user@example.com",
      "phone": "string",
      "address": "string",
      "city": "string",
      "state": "string",
      "country": "string",
      "postalCode": "string",
      "status": "active",
      "subscriptionPlan": "string",
      "createdAt": "2019-08-24T14:15:22Z",
      "updatedAt": "2019-08-24T14:15:22Z"
    }
  ]
}
```

<h3 id="get__companies-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of companies retrieved successfully|Inline|

<h3 id="get__companies-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[[Company](#schemacompany)]|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» name|string|false|none|none|
|»» email|string(email)|false|none|none|
|»» phone|string|false|none|none|
|»» address|string|false|none|none|
|»» city|string|false|none|none|
|»» state|string|false|none|none|
|»» country|string|false|none|none|
|»» postalCode|string|false|none|none|
|»» status|string|false|none|none|
|»» subscriptionPlan|string|false|none|none|
|»» createdAt|string(date-time)|false|none|none|
|»» updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|
|status|suspended|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__companies

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/companies \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/companies HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = 'false';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/companies',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/companies',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/companies', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/companies', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/companies");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/companies", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /companies`

*Create a new company*

> Body parameter

```json
false
```

> Example responses

> 201 Response

```json
{
  "status": "success",
  "data": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "email": "user@example.com",
    "phone": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "postalCode": "string",
    "status": "active",
    "subscriptionPlan": "string",
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
}
```

<h3 id="post__companies-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Company created successfully|Inline|

<h3 id="post__companies-responseschema">Response Schema</h3>

Status Code **201**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[Company](#schemacompany)|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» name|string|false|none|none|
|»» email|string(email)|false|none|none|
|»» phone|string|false|none|none|
|»» address|string|false|none|none|
|»» city|string|false|none|none|
|»» state|string|false|none|none|
|»» country|string|false|none|none|
|»» postalCode|string|false|none|none|
|»» status|string|false|none|none|
|»» subscriptionPlan|string|false|none|none|
|»» createdAt|string(date-time)|false|none|none|
|»» updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|
|status|suspended|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__companies_{id}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/companies/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/companies/{id} HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/companies/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/companies/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/companies/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/companies/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/companies/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/companies/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /companies/{id}`

*Get a company by ID*

<h3 id="get__companies_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the company to retrieve|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "email": "user@example.com",
    "phone": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "postalCode": "string",
    "status": "active",
    "subscriptionPlan": "string",
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
}
```

<h3 id="get__companies_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Company retrieved successfully|Inline|

<h3 id="get__companies_{id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[Company](#schemacompany)|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» name|string|false|none|none|
|»» email|string(email)|false|none|none|
|»» phone|string|false|none|none|
|»» address|string|false|none|none|
|»» city|string|false|none|none|
|»» state|string|false|none|none|
|»» country|string|false|none|none|
|»» postalCode|string|false|none|none|
|»» status|string|false|none|none|
|»» subscriptionPlan|string|false|none|none|
|»» createdAt|string(date-time)|false|none|none|
|»» updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|
|status|suspended|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__companies_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:3000/api/v1/companies/{id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:3000/api/v1/companies/{id} HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = 'false';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/companies/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:3000/api/v1/companies/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:3000/api/v1/companies/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:3000/api/v1/companies/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/companies/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:3000/api/v1/companies/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /companies/{id}`

*Update a company by ID*

> Body parameter

```json
false
```

<h3 id="put__companies_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the company to update|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "email": "user@example.com",
    "phone": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "postalCode": "string",
    "status": "active",
    "subscriptionPlan": "string",
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
}
```

<h3 id="put__companies_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Company updated successfully|Inline|

<h3 id="put__companies_{id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[Company](#schemacompany)|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» name|string|false|none|none|
|»» email|string(email)|false|none|none|
|»» phone|string|false|none|none|
|»» address|string|false|none|none|
|»» city|string|false|none|none|
|»» state|string|false|none|none|
|»» country|string|false|none|none|
|»» postalCode|string|false|none|none|
|»» status|string|false|none|none|
|»» subscriptionPlan|string|false|none|none|
|»» createdAt|string(date-time)|false|none|none|
|»» updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|
|status|suspended|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__companies_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:3000/api/v1/companies/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:3000/api/v1/companies/{id} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/companies/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:3000/api/v1/companies/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:3000/api/v1/companies/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:3000/api/v1/companies/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/companies/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:3000/api/v1/companies/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /companies/{id}`

*Delete a company by ID*

<h3 id="delete__companies_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the company to delete|

<h3 id="delete__companies_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Company deleted successfully|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden, insufficient permissions|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Company not found|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__companies_{id}_invite

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/companies/{id}/invite \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/companies/{id}/invite HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = 'false';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/companies/{id}/invite',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/companies/{id}/invite',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/companies/{id}/invite', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/companies/{id}/invite', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/companies/{id}/invite");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/companies/{id}/invite", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /companies/{id}/invite`

*Invite a user to a company*

> Body parameter

```json
false
```

<h3 id="post__companies_{id}_invite-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the company|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": {
    "inviteId": "14ca54c2-5d85-4c93-81b5-495a2e7e0ca4"
  }
}
```

<h3 id="post__companies_{id}_invite-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User invited successfully|Inline|

<h3 id="post__companies_{id}_invite-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|object|false|none|none|
|»» inviteId|string(uuid)|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__companies_{id}_members

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/companies/{id}/members \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/companies/{id}/members HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/companies/{id}/members',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/companies/{id}/members',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/companies/{id}/members', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/companies/{id}/members', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/companies/{id}/members");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/companies/{id}/members", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /companies/{id}/members`

*Get all members of a company*

<h3 id="get__companies_{id}_members-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the company|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "email": "user@example.com",
      "firstName": "string",
      "lastName": "string",
      "role": {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "name": "string"
      },
      "status": "active",
      "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
      "createdAt": "2019-08-24T14:15:22Z",
      "updatedAt": "2019-08-24T14:15:22Z",
      "username": "string",
      "isActive": true,
      "company": {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "name": "string"
      }
    }
  ]
}
```

<h3 id="get__companies_{id}_members-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Company members retrieved successfully|Inline|

<h3 id="get__companies_{id}_members-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[[User](#schemauser)]|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» email|string(email)|false|none|none|
|»» firstName|string|false|none|none|
|»» lastName|string|false|none|none|
|»» role|object|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» name|string|false|none|none|
|»» status|string|false|none|none|
|»» companyId|string(uuid)|false|none|none|
|»» createdAt|string(date-time)|false|none|none|
|»» updatedAt|string(date-time)|false|none|none|
|»» username|string|false|none|none|
|»» isActive|boolean|false|none|none|
|»» company|object|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» name|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|
|status|pending|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__companies_{id}_settings

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/companies/{id}/settings \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/companies/{id}/settings HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/companies/{id}/settings',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/companies/{id}/settings',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/companies/{id}/settings', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/companies/{id}/settings', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/companies/{id}/settings");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/companies/{id}/settings", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /companies/{id}/settings`

*Get company settings*

<h3 id="get__companies_{id}_settings-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the company|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": {
    "settings": {}
  }
}
```

<h3 id="get__companies_{id}_settings-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Company settings retrieved successfully|Inline|

<h3 id="get__companies_{id}_settings-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|object|false|none|none|
|»» settings|object|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__companies_{id}_settings

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:3000/api/v1/companies/{id}/settings \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:3000/api/v1/companies/{id}/settings HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "settings": {}
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/companies/{id}/settings',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:3000/api/v1/companies/{id}/settings',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:3000/api/v1/companies/{id}/settings', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:3000/api/v1/companies/{id}/settings', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/companies/{id}/settings");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:3000/api/v1/companies/{id}/settings", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /companies/{id}/settings`

*Update company settings*

> Body parameter

```json
{
  "settings": {}
}
```

<h3 id="put__companies_{id}_settings-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the company|
|body|body|object|true|none|
|» settings|body|object|false|none|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": {
    "settings": {}
  }
}
```

<h3 id="put__companies_{id}_settings-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Company settings updated successfully|Inline|

<h3 id="put__companies_{id}_settings-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|object|false|none|none|
|»» settings|object|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="enxero-platform-backend-api-employees">Employees</h1>

Employee management operations

## get__employees

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/employees \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/employees HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/employees',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/employees',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/employees', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/employees', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/employees");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/employees", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /employees`

*Get a list of all employees*

<h3 id="get__employees-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Page number|
|limit|query|integer|false|Number of items per page|
|search|query|string|false|Search term|
|department|query|string|false|Filter by department|
|position|query|string|false|Filter by position|
|status|query|string|false|Filter by status|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "employeeId": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "user@example.com",
      "phone": "string",
      "position": "string",
      "department": "string",
      "hireDate": "2019-08-24",
      "salary": 0,
      "status": "active",
      "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
      "createdAt": "2019-08-24T14:15:22Z",
      "updatedAt": "2019-08-24T14:15:22Z"
    }
  ]
}
```

<h3 id="get__employees-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of employees retrieved successfully|Inline|

<h3 id="get__employees-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[[Employee](#schemaemployee)]|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» employeeId|string|false|none|none|
|»» firstName|string|false|none|none|
|»» lastName|string|false|none|none|
|»» email|string(email)|false|none|none|
|»» phone|string|false|none|none|
|»» position|string|false|none|none|
|»» department|string|false|none|none|
|»» hireDate|string(date)|false|none|none|
|»» salary|number|false|none|none|
|»» status|string|false|none|none|
|»» companyId|string(uuid)|false|none|none|
|»» createdAt|string(date-time)|false|none|none|
|»» updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|
|status|terminated|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__employees

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/employees \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/employees HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = 'false';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/employees',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/employees',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/employees', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/employees', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/employees");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/employees", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /employees`

*Create a new employee*

> Body parameter

```json
false
```

> Example responses

> 201 Response

```json
{
  "status": "success",
  "data": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "employeeId": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "user@example.com",
    "phone": "string",
    "position": "string",
    "department": "string",
    "hireDate": "2019-08-24",
    "salary": 0,
    "status": "active",
    "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
}
```

<h3 id="post__employees-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Employee created successfully|Inline|

<h3 id="post__employees-responseschema">Response Schema</h3>

Status Code **201**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[Employee](#schemaemployee)|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» employeeId|string|false|none|none|
|»» firstName|string|false|none|none|
|»» lastName|string|false|none|none|
|»» email|string(email)|false|none|none|
|»» phone|string|false|none|none|
|»» position|string|false|none|none|
|»» department|string|false|none|none|
|»» hireDate|string(date)|false|none|none|
|»» salary|number|false|none|none|
|»» status|string|false|none|none|
|»» companyId|string(uuid)|false|none|none|
|»» createdAt|string(date-time)|false|none|none|
|»» updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|
|status|terminated|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__employees_{id}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/employees/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/employees/{id} HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/employees/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/employees/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/employees/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/employees/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/employees/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/employees/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /employees/{id}`

*Get an employee by ID*

<h3 id="get__employees_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the employee to retrieve|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "employeeId": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "user@example.com",
    "phone": "string",
    "position": "string",
    "department": "string",
    "hireDate": "2019-08-24",
    "salary": 0,
    "status": "active",
    "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
}
```

<h3 id="get__employees_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Employee retrieved successfully|Inline|

<h3 id="get__employees_{id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[Employee](#schemaemployee)|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» employeeId|string|false|none|none|
|»» firstName|string|false|none|none|
|»» lastName|string|false|none|none|
|»» email|string(email)|false|none|none|
|»» phone|string|false|none|none|
|»» position|string|false|none|none|
|»» department|string|false|none|none|
|»» hireDate|string(date)|false|none|none|
|»» salary|number|false|none|none|
|»» status|string|false|none|none|
|»» companyId|string(uuid)|false|none|none|
|»» createdAt|string(date-time)|false|none|none|
|»» updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|
|status|terminated|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__employees_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:3000/api/v1/employees/{id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:3000/api/v1/employees/{id} HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = 'false';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/employees/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:3000/api/v1/employees/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:3000/api/v1/employees/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:3000/api/v1/employees/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/employees/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:3000/api/v1/employees/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /employees/{id}`

*Update an employee by ID*

> Body parameter

```json
false
```

<h3 id="put__employees_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the employee to update|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "employeeId": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "user@example.com",
    "phone": "string",
    "position": "string",
    "department": "string",
    "hireDate": "2019-08-24",
    "salary": 0,
    "status": "active",
    "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
}
```

<h3 id="put__employees_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Employee updated successfully|Inline|

<h3 id="put__employees_{id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[Employee](#schemaemployee)|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» employeeId|string|false|none|none|
|»» firstName|string|false|none|none|
|»» lastName|string|false|none|none|
|»» email|string(email)|false|none|none|
|»» phone|string|false|none|none|
|»» position|string|false|none|none|
|»» department|string|false|none|none|
|»» hireDate|string(date)|false|none|none|
|»» salary|number|false|none|none|
|»» status|string|false|none|none|
|»» companyId|string(uuid)|false|none|none|
|»» createdAt|string(date-time)|false|none|none|
|»» updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|
|status|terminated|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__employees_{id}_manager

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/employees/{id}/manager \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/employees/{id}/manager HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/employees/{id}/manager',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/employees/{id}/manager',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/employees/{id}/manager', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/employees/{id}/manager', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/employees/{id}/manager");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/employees/{id}/manager", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /employees/{id}/manager`

*Get an employee's manager*

<h3 id="get__employees_{id}_manager-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the employee|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "employeeId": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "user@example.com",
    "phone": "string",
    "position": "string",
    "department": "string",
    "hireDate": "2019-08-24",
    "salary": 0,
    "status": "active",
    "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
}
```

<h3 id="get__employees_{id}_manager-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Employee's manager retrieved successfully|Inline|

<h3 id="get__employees_{id}_manager-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[Employee](#schemaemployee)|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» employeeId|string|false|none|none|
|»» firstName|string|false|none|none|
|»» lastName|string|false|none|none|
|»» email|string(email)|false|none|none|
|»» phone|string|false|none|none|
|»» position|string|false|none|none|
|»» department|string|false|none|none|
|»» hireDate|string(date)|false|none|none|
|»» salary|number|false|none|none|
|»» status|string|false|none|none|
|»» companyId|string(uuid)|false|none|none|
|»» createdAt|string(date-time)|false|none|none|
|»» updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|
|status|terminated|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__employees_{id}_direct-reports

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/employees/{id}/direct-reports \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/employees/{id}/direct-reports HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/employees/{id}/direct-reports',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/employees/{id}/direct-reports',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/employees/{id}/direct-reports', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/employees/{id}/direct-reports', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/employees/{id}/direct-reports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/employees/{id}/direct-reports", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /employees/{id}/direct-reports`

*Get an employee's direct reports*

<h3 id="get__employees_{id}_direct-reports-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the employee|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "data": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "employeeId": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "user@example.com",
      "phone": "string",
      "position": "string",
      "department": "string",
      "hireDate": "2019-08-24",
      "salary": 0,
      "status": "active",
      "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
      "createdAt": "2019-08-24T14:15:22Z",
      "updatedAt": "2019-08-24T14:15:22Z"
    }
  ]
}
```

<h3 id="get__employees_{id}_direct-reports-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Employee's direct reports retrieved successfully|Inline|

<h3 id="get__employees_{id}_direct-reports-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» data|[[Employee](#schemaemployee)]|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» employeeId|string|false|none|none|
|»» firstName|string|false|none|none|
|»» lastName|string|false|none|none|
|»» email|string(email)|false|none|none|
|»» phone|string|false|none|none|
|»» position|string|false|none|none|
|»» department|string|false|none|none|
|»» hireDate|string(date)|false|none|none|
|»» salary|number|false|none|none|
|»» status|string|false|none|none|
|»» companyId|string(uuid)|false|none|none|
|»» createdAt|string(date-time)|false|none|none|
|»» updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|
|status|terminated|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="enxero-platform-backend-api-payroll">Payroll</h1>

Payroll management operations

## get__payroll_config

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/payroll/config \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/payroll/config HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/payroll/config',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/payroll/config',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/payroll/config', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/payroll/config', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/payroll/config");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/payroll/config", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /payroll/config`

*Retrieve payroll configuration for the current company*

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "payFrequency": "weekly",
  "taxSettings": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="get__payroll_config-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Payroll configuration retrieved successfully|[PayrollConfig](#schemapayrollconfig)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__payroll_config

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/payroll/config \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/payroll/config HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "payFrequency": "weekly",
  "taxSettings": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/payroll/config',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/payroll/config',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/payroll/config', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/payroll/config', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/payroll/config");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/payroll/config", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /payroll/config`

*Create payroll configuration for the company*

> Body parameter

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "payFrequency": "weekly",
  "taxSettings": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="post__payroll_config-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[PayrollConfig](#schemapayrollconfig)|true|none|

> Example responses

> 201 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "payFrequency": "weekly",
  "taxSettings": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="post__payroll_config-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Payroll config created successfully|[PayrollConfig](#schemapayrollconfig)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__payroll_config_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:3000/api/v1/payroll/config/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:3000/api/v1/payroll/config/{id} HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "payFrequency": "weekly",
  "taxSettings": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/payroll/config/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:3000/api/v1/payroll/config/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:3000/api/v1/payroll/config/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:3000/api/v1/payroll/config/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/payroll/config/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:3000/api/v1/payroll/config/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /payroll/config/{id}`

*Update payroll configuration*

> Body parameter

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "payFrequency": "weekly",
  "taxSettings": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="put__payroll_config_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|PayrollConfig UUID|
|body|body|[PayrollConfig](#schemapayrollconfig)|true|none|

<h3 id="put__payroll_config_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Payroll config updated successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__payroll_periods

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/payroll/periods \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/payroll/periods HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/payroll/periods',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/payroll/periods',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/payroll/periods', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/payroll/periods', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/payroll/periods");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/payroll/periods", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /payroll/periods`

*Retrieve a list of payroll periods*

<h3 id="get__payroll_periods-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Page number|
|limit|query|integer|false|Number of items per page|
|status|query|string|false|Filter by status (open, closed, processed)|

<h3 id="get__payroll_periods-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of payroll periods|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__payroll_periods

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/payroll/periods \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/payroll/periods HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "startDate": "2019-08-24",
  "endDate": "2019-08-24",
  "status": "open",
  "totalAmount": 0,
  "createdAt": "2019-08-24T14:15:22Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/payroll/periods',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/payroll/periods',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/payroll/periods', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/payroll/periods', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/payroll/periods");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/payroll/periods", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /payroll/periods`

*Create a new payroll period*

> Body parameter

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "startDate": "2019-08-24",
  "endDate": "2019-08-24",
  "status": "open",
  "totalAmount": 0,
  "createdAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="post__payroll_periods-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[PayrollPeriod](#schemapayrollperiod)|true|none|

<h3 id="post__payroll_periods-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Payroll period created successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__payroll_periods_{id}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/payroll/periods/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/payroll/periods/{id} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/payroll/periods/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/payroll/periods/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/payroll/periods/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/payroll/periods/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/payroll/periods/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/payroll/periods/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /payroll/periods/{id}`

*Get payroll period by ID*

<h3 id="get__payroll_periods_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|PayrollPeriod UUID|

<h3 id="get__payroll_periods_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Payroll period details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__payroll_periods_{id}_process

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/payroll/periods/{id}/process \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/payroll/periods/{id}/process HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/payroll/periods/{id}/process',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/payroll/periods/{id}/process',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/payroll/periods/{id}/process', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/payroll/periods/{id}/process', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/payroll/periods/{id}/process");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/payroll/periods/{id}/process", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /payroll/periods/{id}/process`

*Process payroll for a period*

<h3 id="post__payroll_periods_{id}_process-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|PayrollPeriod UUID|

<h3 id="post__payroll_periods_{id}_process-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Payroll processed successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__payroll_periods_{id}_approve

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/payroll/periods/{id}/approve \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/payroll/periods/{id}/approve HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/payroll/periods/{id}/approve',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/payroll/periods/{id}/approve',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/payroll/periods/{id}/approve', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/payroll/periods/{id}/approve', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/payroll/periods/{id}/approve");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/payroll/periods/{id}/approve", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /payroll/periods/{id}/approve`

*Approve payroll for a period*

<h3 id="post__payroll_periods_{id}_approve-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|PayrollPeriod UUID|

<h3 id="post__payroll_periods_{id}_approve-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Payroll approved successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__payroll_records

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/payroll/records \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/payroll/records HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/payroll/records',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/payroll/records',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/payroll/records', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/payroll/records', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/payroll/records");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/payroll/records", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /payroll/records`

*Retrieve a list of payroll records for the company*

<h3 id="get__payroll_records-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|periodId|query|string|false|Filter by payroll period|
|employeeId|query|string|false|Filter by employee|
|status|query|string|false|Filter by status (pending, processed, paid)|
|page|query|integer|false|Page number|
|limit|query|integer|false|Number of items per page|

<h3 id="get__payroll_records-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of payroll records|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__payroll_records

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/payroll/records \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/payroll/records HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "employeeId": "b0e78c8f-8c8b-4410-8293-9239e39d9e17",
  "periodId": "7cc85576-6d6b-4609-a8e6-020187b27a09",
  "grossSalary": 0,
  "totalDeductions": 0,
  "netPay": 0,
  "status": "pending",
  "createdAt": "2019-08-24T14:15:22Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/payroll/records',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/payroll/records',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/payroll/records', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/payroll/records', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/payroll/records");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/payroll/records", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /payroll/records`

*Create a new payroll record*

> Body parameter

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "employeeId": "b0e78c8f-8c8b-4410-8293-9239e39d9e17",
  "periodId": "7cc85576-6d6b-4609-a8e6-020187b27a09",
  "grossSalary": 0,
  "totalDeductions": 0,
  "netPay": 0,
  "status": "pending",
  "createdAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="post__payroll_records-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[PayrollRecord](#schemapayrollrecord)|true|none|

<h3 id="post__payroll_records-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Payroll record created successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__payroll_records_{id}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/payroll/records/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/payroll/records/{id} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/payroll/records/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/payroll/records/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/payroll/records/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/payroll/records/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/payroll/records/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/payroll/records/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /payroll/records/{id}`

*Get payroll record by ID*

<h3 id="get__payroll_records_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|PayrollRecord UUID|

<h3 id="get__payroll_records_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Payroll record details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__payroll_records_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:3000/api/v1/payroll/records/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:3000/api/v1/payroll/records/{id} HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "employeeId": "b0e78c8f-8c8b-4410-8293-9239e39d9e17",
  "periodId": "7cc85576-6d6b-4609-a8e6-020187b27a09",
  "grossSalary": 0,
  "totalDeductions": 0,
  "netPay": 0,
  "status": "pending",
  "createdAt": "2019-08-24T14:15:22Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/payroll/records/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:3000/api/v1/payroll/records/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:3000/api/v1/payroll/records/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:3000/api/v1/payroll/records/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/payroll/records/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:3000/api/v1/payroll/records/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /payroll/records/{id}`

*Update payroll record by ID*

> Body parameter

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "employeeId": "b0e78c8f-8c8b-4410-8293-9239e39d9e17",
  "periodId": "7cc85576-6d6b-4609-a8e6-020187b27a09",
  "grossSalary": 0,
  "totalDeductions": 0,
  "netPay": 0,
  "status": "pending",
  "createdAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="put__payroll_records_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|PayrollRecord UUID|
|body|body|[PayrollRecord](#schemapayrollrecord)|true|none|

<h3 id="put__payroll_records_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Payroll record updated successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__payroll_employee_{employeeId}_period_{periodId}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/payroll/employee/{employeeId}/period/{periodId} \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/payroll/employee/{employeeId}/period/{periodId} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/payroll/employee/{employeeId}/period/{periodId}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/payroll/employee/{employeeId}/period/{periodId}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/payroll/employee/{employeeId}/period/{periodId}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/payroll/employee/{employeeId}/period/{periodId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/payroll/employee/{employeeId}/period/{periodId}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/payroll/employee/{employeeId}/period/{periodId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /payroll/employee/{employeeId}/period/{periodId}`

*Get payroll details for an employee in a specific period*

<h3 id="get__payroll_employee_{employeeid}_period_{periodid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|employeeId|path|string|true|Employee UUID|
|periodId|path|string|true|PayrollPeriod UUID|

<h3 id="get__payroll_employee_{employeeid}_period_{periodid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Payroll details for the employee and period|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="enxero-platform-backend-api-leave">Leave</h1>

Leave management operations

## get__leave_types

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/leave/types \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/leave/types HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/leave/types',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/leave/types',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/leave/types', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/leave/types', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/leave/types");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/leave/types", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /leave/types`

*Retrieve a list of leave types for the company*

<h3 id="get__leave_types-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of leave types|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__leave_types

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/leave/types \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/leave/types HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "name": "string",
  "description": "string",
  "maxDays": 0,
  "isActive": true,
  "createdAt": "2019-08-24T14:15:22Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/leave/types',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/leave/types',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/leave/types', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/leave/types', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/leave/types");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/leave/types", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /leave/types`

*Create a new leave type*

> Body parameter

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "name": "string",
  "description": "string",
  "maxDays": 0,
  "isActive": true,
  "createdAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="post__leave_types-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LeaveType](#schemaleavetype)|true|none|

<h3 id="post__leave_types-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Leave type created successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__leave_types_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:3000/api/v1/leave/types/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:3000/api/v1/leave/types/{id} HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "name": "string",
  "description": "string",
  "maxDays": 0,
  "isActive": true,
  "createdAt": "2019-08-24T14:15:22Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/leave/types/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:3000/api/v1/leave/types/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:3000/api/v1/leave/types/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:3000/api/v1/leave/types/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/leave/types/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:3000/api/v1/leave/types/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /leave/types/{id}`

*Update a leave type*

> Body parameter

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "name": "string",
  "description": "string",
  "maxDays": 0,
  "isActive": true,
  "createdAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="put__leave_types_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|LeaveType UUID|
|body|body|[LeaveType](#schemaleavetype)|true|none|

<h3 id="put__leave_types_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Leave type updated successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__leave_requests

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/leave/requests \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/leave/requests HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/leave/requests',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/leave/requests',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/leave/requests', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/leave/requests', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/leave/requests");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/leave/requests", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /leave/requests`

*Retrieve a list of leave requests with filtering and pagination*

<h3 id="get__leave_requests-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|employeeId|query|string|false|Filter by employee|
|status|query|string|false|Filter by status (pending, approved, rejected, cancelled)|
|type|query|string|false|Filter by leave type|
|page|query|integer|false|Page number|
|limit|query|integer|false|Number of items per page|

<h3 id="get__leave_requests-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of leave requests|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__leave_requests

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/leave/requests \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/leave/requests HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "employeeId": "b0e78c8f-8c8b-4410-8293-9239e39d9e17",
  "leaveTypeId": "84af864f-44a4-4851-be6e-47c344d6d735",
  "startDate": "2019-08-24",
  "endDate": "2019-08-24",
  "status": "pending",
  "reason": "string",
  "createdAt": "2019-08-24T14:15:22Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/leave/requests',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/leave/requests',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/leave/requests', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/leave/requests', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/leave/requests");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/leave/requests", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /leave/requests`

*Create a new leave request*

> Body parameter

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "employeeId": "b0e78c8f-8c8b-4410-8293-9239e39d9e17",
  "leaveTypeId": "84af864f-44a4-4851-be6e-47c344d6d735",
  "startDate": "2019-08-24",
  "endDate": "2019-08-24",
  "status": "pending",
  "reason": "string",
  "createdAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="post__leave_requests-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LeaveRequest](#schemaleaverequest)|true|none|

<h3 id="post__leave_requests-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Leave request created successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__leave_requests_{id}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/leave/requests/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/leave/requests/{id} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/leave/requests/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/leave/requests/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/leave/requests/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/leave/requests/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/leave/requests/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/leave/requests/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /leave/requests/{id}`

*Retrieve a specific leave request by ID*

<h3 id="get__leave_requests_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|LeaveRequest UUID|

<h3 id="get__leave_requests_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Leave request details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__leave_requests_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:3000/api/v1/leave/requests/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:3000/api/v1/leave/requests/{id} HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "employeeId": "b0e78c8f-8c8b-4410-8293-9239e39d9e17",
  "leaveTypeId": "84af864f-44a4-4851-be6e-47c344d6d735",
  "startDate": "2019-08-24",
  "endDate": "2019-08-24",
  "status": "pending",
  "reason": "string",
  "createdAt": "2019-08-24T14:15:22Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/leave/requests/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:3000/api/v1/leave/requests/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:3000/api/v1/leave/requests/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:3000/api/v1/leave/requests/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/leave/requests/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:3000/api/v1/leave/requests/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /leave/requests/{id}`

*Update a leave request*

> Body parameter

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "employeeId": "b0e78c8f-8c8b-4410-8293-9239e39d9e17",
  "leaveTypeId": "84af864f-44a4-4851-be6e-47c344d6d735",
  "startDate": "2019-08-24",
  "endDate": "2019-08-24",
  "status": "pending",
  "reason": "string",
  "createdAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="put__leave_requests_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|LeaveRequest UUID|
|body|body|[LeaveRequest](#schemaleaverequest)|true|none|

<h3 id="put__leave_requests_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Leave request updated successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__requests_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:3000/api/v1/requests/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:3000/api/v1/requests/{id} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/requests/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:3000/api/v1/requests/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:3000/api/v1/requests/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:3000/api/v1/requests/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/requests/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:3000/api/v1/requests/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /requests/{id}`

*Delete a leave request by ID*

<h3 id="delete__requests_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|ID of the leave request to delete|

<h3 id="delete__requests_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Leave request deleted successfully|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Cannot delete non-pending leave request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden, insufficient permissions|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Leave request not found|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__leave_balance

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/leave/balance \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/leave/balance HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/leave/balance',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/leave/balance',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/leave/balance', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/leave/balance', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/leave/balance");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/leave/balance", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /leave/balance`

*Retrieve leave balances for employees*

<h3 id="get__leave_balance-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|employeeId|query|string|false|Filter by employee|
|year|query|integer|false|Filter by year|

<h3 id="get__leave_balance-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of leave balances|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="enxero-platform-backend-api-forms">Forms</h1>

Dynamic forms management

## get__forms

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/forms \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/forms HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/forms',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/forms',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/forms', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/forms', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/forms");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/forms", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /forms`

*Retrieve a list of forms with pagination and filtering*

<h3 id="get__forms-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Page number|
|limit|query|integer|false|Number of items per page|
|search|query|string|false|Search term for form title|
|type|query|string|false|Filter by form type|
|status|query|string|false|Filter by status (active, inactive)|

<h3 id="get__forms-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of forms|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__forms

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/forms \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/forms HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string",
  "description": "string",
  "type": "string",
  "fields": [
    {}
  ],
  "status": "active",
  "createdBy": "25a02396-1048-48f9-bf93-102d2fb7895e",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/forms',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/forms',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/forms', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/forms', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/forms");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/forms", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /forms`

*Create a new form*

> Body parameter

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string",
  "description": "string",
  "type": "string",
  "fields": [
    {}
  ],
  "status": "active",
  "createdBy": "25a02396-1048-48f9-bf93-102d2fb7895e",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="post__forms-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Form](#schemaform)|true|none|

<h3 id="post__forms-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Form created successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__forms_{id}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/forms/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/forms/{id} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/forms/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/forms/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/forms/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/forms/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/forms/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/forms/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /forms/{id}`

*Retrieve a specific form by its ID*

<h3 id="get__forms_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Form UUID|

<h3 id="get__forms_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Form details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## patch__forms_{id}

> Code samples

```shell
# You can also use wget
curl -X PATCH http://localhost:3000/api/v1/forms/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PATCH http://localhost:3000/api/v1/forms/{id} HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string",
  "description": "string",
  "type": "string",
  "fields": [
    {}
  ],
  "status": "active",
  "createdBy": "25a02396-1048-48f9-bf93-102d2fb7895e",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/forms/{id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.patch 'http://localhost:3000/api/v1/forms/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.patch('http://localhost:3000/api/v1/forms/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PATCH','http://localhost:3000/api/v1/forms/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/forms/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PATCH");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PATCH", "http://localhost:3000/api/v1/forms/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /forms/{id}`

*Update a form*

> Body parameter

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string",
  "description": "string",
  "type": "string",
  "fields": [
    {}
  ],
  "status": "active",
  "createdBy": "25a02396-1048-48f9-bf93-102d2fb7895e",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="patch__forms_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Form UUID|
|body|body|[Form](#schemaform)|true|none|

<h3 id="patch__forms_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Form updated successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__forms_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:3000/api/v1/forms/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:3000/api/v1/forms/{id} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/forms/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:3000/api/v1/forms/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:3000/api/v1/forms/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:3000/api/v1/forms/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/forms/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:3000/api/v1/forms/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /forms/{id}`

*Delete a form*

<h3 id="delete__forms_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Form UUID|

<h3 id="delete__forms_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Form deleted successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__forms_{id}_submissions

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/forms/{id}/submissions \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/forms/{id}/submissions HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/forms/{id}/submissions',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/forms/{id}/submissions',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/forms/{id}/submissions', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/forms/{id}/submissions', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/forms/{id}/submissions");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/forms/{id}/submissions", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /forms/{id}/submissions`

*Retrieve submissions for a specific form*

<h3 id="get__forms_{id}_submissions-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Form UUID|
|page|query|integer|false|Page number|
|limit|query|integer|false|Number of items per page|

<h3 id="get__forms_{id}_submissions-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of form submissions|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__forms_{id}_submit

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/forms/{id}/submit \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/forms/{id}/submit HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/forms/{id}/submit',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/forms/{id}/submit',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/forms/{id}/submit', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/forms/{id}/submit', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/forms/{id}/submit");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/forms/{id}/submit", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /forms/{id}/submit`

*Submit a form*

> Body parameter

```json
{}
```

<h3 id="post__forms_{id}_submit-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Form UUID|
|body|body|object|true|none|

<h3 id="post__forms_{id}_submit-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Form submitted successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="enxero-platform-backend-api-files">Files</h1>

File upload, download, and metadata management

## get__files

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/files \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/files HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/files',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/files',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/files', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/files', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/files");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/files", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /files`

*Retrieve a paginated list of files with optional filtering and sorting*

<h3 id="get__files-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Page number|
|limit|query|integer|false|Items per page|
|search|query|string|false|Search term for filename|
|entityType|query|string|false|Filter by entity type|
|entityId|query|string|false|Filter by entity ID|
|sortBy|query|string|false|Sort field (filename, createdAt)|
|sortOrder|query|string|false|Sort direction (asc, desc)|

<h3 id="get__files-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of files|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__files_{id}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/files/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/files/{id} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/files/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/files/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/files/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/files/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/files/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/files/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /files/{id}`

*Retrieve metadata for a specific file*

<h3 id="get__files_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|File UUID|

<h3 id="get__files_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|File metadata|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__files_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:3000/api/v1/files/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:3000/api/v1/files/{id} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/files/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:3000/api/v1/files/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:3000/api/v1/files/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:3000/api/v1/files/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/files/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:3000/api/v1/files/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /files/{id}`

*Delete a specific file and its metadata*

<h3 id="delete__files_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|File UUID|

<h3 id="delete__files_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|File deleted successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__files_{id}_download

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/files/{id}/download \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/files/{id}/download HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/files/{id}/download',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/files/{id}/download',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/files/{id}/download', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/files/{id}/download', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/files/{id}/download");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/files/{id}/download", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /files/{id}/download`

*Download a specific file*

<h3 id="get__files_{id}_download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|File UUID|

<h3 id="get__files_{id}_download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|File stream|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__files_upload

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/files/upload \
  -H 'Content-Type: multipart/form-data' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/files/upload HTTP/1.1
Host: localhost:3000
Content-Type: multipart/form-data

```

```javascript
const inputBody = '{
  "file": "string",
  "description": "string",
  "tags": [
    "string"
  ],
  "entityType": "string",
  "entityId": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/files/upload',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'multipart/form-data',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/files/upload',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/files/upload', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'multipart/form-data',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/files/upload', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/files/upload");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"multipart/form-data"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/files/upload", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /files/upload`

*Upload a new file with optional metadata*

> Body parameter

```yaml
file: string
description: string
tags:
  - string
entityType: string
entityId: string

```

<h3 id="post__files_upload-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|
|» description|body|string|false|none|
|» tags|body|[string]|false|none|
|» entityType|body|string|false|none|
|» entityId|body|string|false|none|

<h3 id="post__files_upload-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|File uploaded successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="enxero-platform-backend-api-notifications">Notifications</h1>

User notifications management

## get__notifications

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/notifications \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/notifications HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/notifications',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/notifications',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/notifications', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/notifications', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/notifications");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/notifications", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /notifications`

*Retrieve a paginated list of notifications with optional filtering and sorting*

<h3 id="get__notifications-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Page number|
|limit|query|integer|false|Items per page|
|search|query|string|false|Search term for message content|
|type|query|string|false|Filter by notification type|
|status|query|string|false|Filter by status (unread, read)|
|sortBy|query|string|false|Sort field (createdAt, type, status)|
|sortOrder|query|string|false|Sort direction (asc, desc)|

<h3 id="get__notifications-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of notifications|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## patch__notifications_{id}_read

> Code samples

```shell
# You can also use wget
curl -X PATCH http://localhost:3000/api/v1/notifications/{id}/read \
  -H 'Authorization: Bearer {access-token}'

```

```http
PATCH http://localhost:3000/api/v1/notifications/{id}/read HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/notifications/{id}/read',
{
  method: 'PATCH',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.patch 'http://localhost:3000/api/v1/notifications/{id}/read',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.patch('http://localhost:3000/api/v1/notifications/{id}/read', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PATCH','http://localhost:3000/api/v1/notifications/{id}/read', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/notifications/{id}/read");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PATCH");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PATCH", "http://localhost:3000/api/v1/notifications/{id}/read", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /notifications/{id}/read`

*Mark a specific notification as read*

<h3 id="patch__notifications_{id}_read-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Notification UUID|

<h3 id="patch__notifications_{id}_read-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Notification marked as read|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__notifications_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:3000/api/v1/notifications/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:3000/api/v1/notifications/{id} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/notifications/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:3000/api/v1/notifications/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:3000/api/v1/notifications/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:3000/api/v1/notifications/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/notifications/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:3000/api/v1/notifications/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /notifications/{id}`

*Delete a specific notification*

<h3 id="delete__notifications_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Notification UUID|

<h3 id="delete__notifications_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Notification deleted successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__notifications_send

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/notifications/send \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/notifications/send HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "userId": "string",
  "type": "string",
  "message": "string",
  "data": {}
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/notifications/send',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/notifications/send',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/notifications/send', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/notifications/send', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/notifications/send");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/notifications/send", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /notifications/send`

*Send a new notification to a specific user*

> Body parameter

```json
{
  "userId": "string",
  "type": "string",
  "message": "string",
  "data": {}
}
```

<h3 id="post__notifications_send-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» userId|body|string|false|none|
|» type|body|string|false|none|
|» message|body|string|false|none|
|» data|body|object|false|none|

<h3 id="post__notifications_send-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Notification sent successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="enxero-platform-backend-api-audit">Audit</h1>

Audit trail management

## get__audit_logs

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/audit/logs \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/audit/logs HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/audit/logs',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/audit/logs',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/audit/logs', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/audit/logs', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/audit/logs");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/audit/logs", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /audit/logs`

*Get audit logs*

<h3 id="get__audit_logs-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Page number|
|limit|query|integer|false|Number of items per page|
|action|query|string|false|Filter by action|
|entityType|query|string|false|Filter by entity type|
|entityId|query|string|false|Filter by entity ID|
|userId|query|string|false|Filter by user ID|
|startDate|query|string(date-time)|false|Filter by start date|
|endDate|query|string(date-time)|false|Filter by end date|

<h3 id="get__audit_logs-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of audit logs|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__audit_logs_{id}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/audit/logs/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/audit/logs/{id} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/audit/logs/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/audit/logs/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/audit/logs/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/audit/logs/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/audit/logs/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/audit/logs/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /audit/logs/{id}`

*Get audit log by ID*

<h3 id="get__audit_logs_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Audit log ID|

<h3 id="get__audit_logs_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Audit log details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__audit_logs_entity_{entityType}_{entityId}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/audit/logs/entity/{entityType}/{entityId} \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/audit/logs/entity/{entityType}/{entityId} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/audit/logs/entity/{entityType}/{entityId}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/audit/logs/entity/{entityType}/{entityId}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/audit/logs/entity/{entityType}/{entityId}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/audit/logs/entity/{entityType}/{entityId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/audit/logs/entity/{entityType}/{entityId}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/audit/logs/entity/{entityType}/{entityId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /audit/logs/entity/{entityType}/{entityId}`

*Get audit logs for an entity*

<h3 id="get__audit_logs_entity_{entitytype}_{entityid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|entityType|path|string|true|Entity type|
|entityId|path|string|true|Entity ID|
|page|query|integer|false|Page number|
|limit|query|integer|false|Number of items per page|

<h3 id="get__audit_logs_entity_{entitytype}_{entityid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of audit logs for the entity|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="enxero-platform-backend-api-integrations">Integrations</h1>

Third-party integrations management

## get__integrations

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/integrations \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/integrations HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/integrations',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/integrations',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/integrations', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/integrations', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/integrations");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/integrations", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /integrations`

*Retrieve a list of integrations for the company*

<h3 id="get__integrations-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of integrations|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__integrations

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/integrations \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/integrations HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "name": "string",
  "type": "string",
  "status": "active",
  "config": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/integrations',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/integrations',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/integrations', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/integrations', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/integrations");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/integrations", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /integrations`

*Create a new integration*

> Body parameter

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "name": "string",
  "type": "string",
  "status": "active",
  "config": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="post__integrations-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Integration](#schemaintegration)|true|none|

<h3 id="post__integrations-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Integration created successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__integrations_{id}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/integrations/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/integrations/{id} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/integrations/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/integrations/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/integrations/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/integrations/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/integrations/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/integrations/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /integrations/{id}`

*Retrieve a specific integration by its ID*

<h3 id="get__integrations_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Integration UUID|

<h3 id="get__integrations_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Integration details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__integrations_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:3000/api/v1/integrations/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:3000/api/v1/integrations/{id} HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "name": "string",
  "type": "string",
  "status": "active",
  "config": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/integrations/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:3000/api/v1/integrations/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:3000/api/v1/integrations/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:3000/api/v1/integrations/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/integrations/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:3000/api/v1/integrations/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /integrations/{id}`

*Update an integration*

> Body parameter

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "name": "string",
  "type": "string",
  "status": "active",
  "config": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="put__integrations_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Integration UUID|
|body|body|[Integration](#schemaintegration)|true|none|

<h3 id="put__integrations_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Integration updated successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__integrations_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:3000/api/v1/integrations/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:3000/api/v1/integrations/{id} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/integrations/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:3000/api/v1/integrations/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:3000/api/v1/integrations/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:3000/api/v1/integrations/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/integrations/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:3000/api/v1/integrations/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /integrations/{id}`

*Delete an integration*

<h3 id="delete__integrations_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Integration UUID|

<h3 id="delete__integrations_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Integration deleted successfully|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__integrations_{id}_logs

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/integrations/{id}/logs \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/integrations/{id}/logs HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/integrations/{id}/logs',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/integrations/{id}/logs',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/integrations/{id}/logs', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/integrations/{id}/logs', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/integrations/{id}/logs");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/integrations/{id}/logs", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /integrations/{id}/logs`

*Retrieve logs for a specific integration*

<h3 id="get__integrations_{id}_logs-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Integration UUID|
|page|query|integer|false|Page number|
|limit|query|integer|false|Number of items per page|
|status|query|string|false|Filter by status (success, error)|

<h3 id="get__integrations_{id}_logs-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of integration logs|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="enxero-platform-backend-api-system">System</h1>

System configuration and management

## get__system_configs

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/system/configs \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/system/configs HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/system/configs',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/system/configs',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/system/configs', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/system/configs', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/system/configs");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/system/configs", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /system/configs`

*Get system configurations*

<h3 id="get__system_configs-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Page number|
|limit|query|integer|false|Number of items per page|
|search|query|string|false|Search term|

<h3 id="get__system_configs-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of system configurations|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__system_configs

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/v1/system/configs \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/v1/system/configs HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "key": "string",
  "value": {},
  "description": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/system/configs',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/v1/system/configs',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/v1/system/configs', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/v1/system/configs', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/system/configs");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/v1/system/configs", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /system/configs`

*Create system configuration*

> Body parameter

```json
{
  "key": "string",
  "value": {},
  "description": "string"
}
```

<h3 id="post__system_configs-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» key|body|string|false|none|
|» value|body|object|false|none|
|» description|body|string|false|none|

<h3 id="post__system_configs-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|System configuration created|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__system_configs_{key}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/system/configs/{key} \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/system/configs/{key} HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/system/configs/{key}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/system/configs/{key}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/system/configs/{key}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/system/configs/{key}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/system/configs/{key}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/system/configs/{key}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /system/configs/{key}`

*Get system configuration by key*

<h3 id="get__system_configs_{key}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|key|path|string|true|Configuration key|

<h3 id="get__system_configs_{key}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|System configuration details|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__system_configs_{key}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:3000/api/v1/system/configs/{key} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:3000/api/v1/system/configs/{key} HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "value": {},
  "description": "string",
  "isActive": true
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/system/configs/{key}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:3000/api/v1/system/configs/{key}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:3000/api/v1/system/configs/{key}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:3000/api/v1/system/configs/{key}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/system/configs/{key}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:3000/api/v1/system/configs/{key}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /system/configs/{key}`

*Update system configuration*

> Body parameter

```json
{
  "value": {},
  "description": "string",
  "isActive": true
}
```

<h3 id="put__system_configs_{key}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|key|path|string|true|Configuration key|
|body|body|object|true|none|
|» value|body|object|false|none|
|» description|body|string|false|none|
|» isActive|body|boolean|false|none|

<h3 id="put__system_configs_{key}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|System configuration updated|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__system_logs

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/v1/system/logs \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/v1/system/logs HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/v1/system/logs',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/v1/system/logs',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/v1/system/logs', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/v1/system/logs', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/v1/system/logs");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/v1/system/logs", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /system/logs`

*Get system logs*

<h3 id="get__system_logs-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Page number|
|limit|query|integer|false|Number of items per page|
|level|query|string|false|Log level filter|

<h3 id="get__system_logs-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of system logs|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

# Schemas

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "email": "user@example.com",
  "firstName": "string",
  "lastName": "string",
  "role": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string"
  },
  "status": "active",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z",
  "username": "string",
  "isActive": true,
  "company": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|email|string(email)|false|none|none|
|firstName|string|false|none|none|
|lastName|string|false|none|none|
|role|object|false|none|none|
|» id|string(uuid)|false|none|none|
|» name|string|false|none|none|
|status|string|false|none|none|
|companyId|string(uuid)|false|none|none|
|createdAt|string(date-time)|false|none|none|
|updatedAt|string(date-time)|false|none|none|
|username|string|false|none|none|
|isActive|boolean|false|none|none|
|company|object|false|none|none|
|» id|string(uuid)|false|none|none|
|» name|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|
|status|pending|

<h2 id="tocS_Company">Company</h2>
<!-- backwards compatibility -->
<a id="schemacompany"></a>
<a id="schema_Company"></a>
<a id="tocScompany"></a>
<a id="tocscompany"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "name": "string",
  "email": "user@example.com",
  "phone": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "country": "string",
  "postalCode": "string",
  "status": "active",
  "subscriptionPlan": "string",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|name|string|false|none|none|
|email|string(email)|false|none|none|
|phone|string|false|none|none|
|address|string|false|none|none|
|city|string|false|none|none|
|state|string|false|none|none|
|country|string|false|none|none|
|postalCode|string|false|none|none|
|status|string|false|none|none|
|subscriptionPlan|string|false|none|none|
|createdAt|string(date-time)|false|none|none|
|updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|
|status|suspended|

<h2 id="tocS_Employee">Employee</h2>
<!-- backwards compatibility -->
<a id="schemaemployee"></a>
<a id="schema_Employee"></a>
<a id="tocSemployee"></a>
<a id="tocsemployee"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "employeeId": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "user@example.com",
  "phone": "string",
  "position": "string",
  "department": "string",
  "hireDate": "2019-08-24",
  "salary": 0,
  "status": "active",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|employeeId|string|false|none|none|
|firstName|string|false|none|none|
|lastName|string|false|none|none|
|email|string(email)|false|none|none|
|phone|string|false|none|none|
|position|string|false|none|none|
|department|string|false|none|none|
|hireDate|string(date)|false|none|none|
|salary|number|false|none|none|
|status|string|false|none|none|
|companyId|string(uuid)|false|none|none|
|createdAt|string(date-time)|false|none|none|
|updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|
|status|terminated|

<h2 id="tocS_PayrollConfig">PayrollConfig</h2>
<!-- backwards compatibility -->
<a id="schemapayrollconfig"></a>
<a id="schema_PayrollConfig"></a>
<a id="tocSpayrollconfig"></a>
<a id="tocspayrollconfig"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "payFrequency": "weekly",
  "taxSettings": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|companyId|string(uuid)|false|none|none|
|payFrequency|string|false|none|none|
|taxSettings|object|false|none|none|
|createdAt|string(date-time)|false|none|none|
|updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|payFrequency|weekly|
|payFrequency|biweekly|
|payFrequency|monthly|

<h2 id="tocS_PayrollPeriod">PayrollPeriod</h2>
<!-- backwards compatibility -->
<a id="schemapayrollperiod"></a>
<a id="schema_PayrollPeriod"></a>
<a id="tocSpayrollperiod"></a>
<a id="tocspayrollperiod"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "startDate": "2019-08-24",
  "endDate": "2019-08-24",
  "status": "open",
  "totalAmount": 0,
  "createdAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|companyId|string(uuid)|false|none|none|
|startDate|string(date)|false|none|none|
|endDate|string(date)|false|none|none|
|status|string|false|none|none|
|totalAmount|number|false|none|none|
|createdAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|open|
|status|closed|
|status|processed|

<h2 id="tocS_PayrollRecord">PayrollRecord</h2>
<!-- backwards compatibility -->
<a id="schemapayrollrecord"></a>
<a id="schema_PayrollRecord"></a>
<a id="tocSpayrollrecord"></a>
<a id="tocspayrollrecord"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "employeeId": "b0e78c8f-8c8b-4410-8293-9239e39d9e17",
  "periodId": "7cc85576-6d6b-4609-a8e6-020187b27a09",
  "grossSalary": 0,
  "totalDeductions": 0,
  "netPay": 0,
  "status": "pending",
  "createdAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|employeeId|string(uuid)|false|none|none|
|periodId|string(uuid)|false|none|none|
|grossSalary|number|false|none|none|
|totalDeductions|number|false|none|none|
|netPay|number|false|none|none|
|status|string|false|none|none|
|createdAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|pending|
|status|processed|
|status|paid|

<h2 id="tocS_LeaveType">LeaveType</h2>
<!-- backwards compatibility -->
<a id="schemaleavetype"></a>
<a id="schema_LeaveType"></a>
<a id="tocSleavetype"></a>
<a id="tocsleavetype"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "name": "string",
  "description": "string",
  "maxDays": 0,
  "isActive": true,
  "createdAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|companyId|string(uuid)|false|none|none|
|name|string|false|none|none|
|description|string|false|none|none|
|maxDays|integer|false|none|none|
|isActive|boolean|false|none|none|
|createdAt|string(date-time)|false|none|none|

<h2 id="tocS_LeaveRequest">LeaveRequest</h2>
<!-- backwards compatibility -->
<a id="schemaleaverequest"></a>
<a id="schema_LeaveRequest"></a>
<a id="tocSleaverequest"></a>
<a id="tocsleaverequest"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "employeeId": "b0e78c8f-8c8b-4410-8293-9239e39d9e17",
  "leaveTypeId": "84af864f-44a4-4851-be6e-47c344d6d735",
  "startDate": "2019-08-24",
  "endDate": "2019-08-24",
  "status": "pending",
  "reason": "string",
  "createdAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|employeeId|string(uuid)|false|none|none|
|leaveTypeId|string(uuid)|false|none|none|
|startDate|string(date)|false|none|none|
|endDate|string(date)|false|none|none|
|status|string|false|none|none|
|reason|string|false|none|none|
|createdAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|pending|
|status|approved|
|status|rejected|
|status|cancelled|

<h2 id="tocS_LeaveBalance">LeaveBalance</h2>
<!-- backwards compatibility -->
<a id="schemaleavebalance"></a>
<a id="schema_LeaveBalance"></a>
<a id="tocSleavebalance"></a>
<a id="tocsleavebalance"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "employeeId": "b0e78c8f-8c8b-4410-8293-9239e39d9e17",
  "leaveTypeId": "84af864f-44a4-4851-be6e-47c344d6d735",
  "year": 0,
  "totalDays": 0,
  "usedDays": 0,
  "remainingDays": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|employeeId|string(uuid)|false|none|none|
|leaveTypeId|string(uuid)|false|none|none|
|year|integer|false|none|none|
|totalDays|integer|false|none|none|
|usedDays|integer|false|none|none|
|remainingDays|integer|false|none|none|

<h2 id="tocS_Form">Form</h2>
<!-- backwards compatibility -->
<a id="schemaform"></a>
<a id="schema_Form"></a>
<a id="tocSform"></a>
<a id="tocsform"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string",
  "description": "string",
  "type": "string",
  "fields": [
    {}
  ],
  "status": "active",
  "createdBy": "25a02396-1048-48f9-bf93-102d2fb7895e",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|title|string|false|none|none|
|description|string|false|none|none|
|type|string|false|none|none|
|fields|[object]|false|none|none|
|status|string|false|none|none|
|createdBy|string(uuid)|false|none|none|
|companyId|string(uuid)|false|none|none|
|createdAt|string(date-time)|false|none|none|
|updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|

<h2 id="tocS_FormSubmission">FormSubmission</h2>
<!-- backwards compatibility -->
<a id="schemaformsubmission"></a>
<a id="schema_FormSubmission"></a>
<a id="tocSformsubmission"></a>
<a id="tocsformsubmission"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "formId": "126460ed-49b2-4c69-849a-bd8904ec5d8f",
  "data": {},
  "submittedBy": "a641a425-2470-49a5-92c2-5825c2833a34",
  "createdAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|formId|string(uuid)|false|none|none|
|data|object|false|none|none|
|submittedBy|string(uuid)|false|none|none|
|createdAt|string(date-time)|false|none|none|

<h2 id="tocS_File">File</h2>
<!-- backwards compatibility -->
<a id="schemafile"></a>
<a id="schema_File"></a>
<a id="tocSfile"></a>
<a id="tocsfile"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "filename": "string",
  "storageName": "string",
  "mimetype": "string",
  "size": 0,
  "description": "string",
  "tags": [
    "string"
  ],
  "entityType": "string",
  "entityId": "156e622c-6cdf-4c27-9bc9-2f2db69919f5",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|File ID|
|filename|string|false|none|Original filename|
|storageName|string|false|none|Name of the file in storage|
|mimetype|string|false|none|MIME type of the file|
|size|integer|false|none|File size in bytes|
|description|string|false|none|File description|
|tags|[string]|false|none|File tags|
|entityType|string|false|none|Type of entity the file is associated with|
|entityId|string(uuid)|false|none|ID of the entity the file is associated with|
|createdAt|string(date-time)|false|none|File creation timestamp|
|updatedAt|string(date-time)|false|none|Last update timestamp|

<h2 id="tocS_Notification">Notification</h2>
<!-- backwards compatibility -->
<a id="schemanotification"></a>
<a id="schema_Notification"></a>
<a id="tocSnotification"></a>
<a id="tocsnotification"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "userId": "2c4a230c-5085-4924-a3e1-25fb4fc5965b",
  "type": "system_alert",
  "message": "string",
  "data": {},
  "status": "unread",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|Notification ID|
|userId|string(uuid)|false|none|User ID|
|type|string|false|none|Notification type|
|message|string|false|none|Notification message|
|data|object|false|none|Additional notification data|
|status|string|false|none|Notification status|
|createdAt|string(date-time)|false|none|Notification creation timestamp|
|updatedAt|string(date-time)|false|none|Last update timestamp|

#### Enumerated Values

|Property|Value|
|---|---|
|type|system_alert|
|type|user_mention|
|type|document_shared|
|type|task_assigned|
|type|leave_request|
|type|payroll_update|
|type|system_update|
|status|unread|
|status|read|

<h2 id="tocS_AuditLog">AuditLog</h2>
<!-- backwards compatibility -->
<a id="schemaauditlog"></a>
<a id="schema_AuditLog"></a>
<a id="tocSauditlog"></a>
<a id="tocsauditlog"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "action": "string",
  "entityType": "string",
  "entityId": "156e622c-6cdf-4c27-9bc9-2f2db69919f5",
  "userId": "2c4a230c-5085-4924-a3e1-25fb4fc5965b",
  "description": "string",
  "ipAddress": "string",
  "createdAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|action|string|false|none|none|
|entityType|string|false|none|none|
|entityId|string(uuid)|false|none|none|
|userId|string(uuid)|false|none|none|
|description|string|false|none|none|
|ipAddress|string|false|none|none|
|createdAt|string(date-time)|false|none|none|

<h2 id="tocS_Integration">Integration</h2>
<!-- backwards compatibility -->
<a id="schemaintegration"></a>
<a id="schema_Integration"></a>
<a id="tocSintegration"></a>
<a id="tocsintegration"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
  "name": "string",
  "type": "string",
  "status": "active",
  "config": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|companyId|string(uuid)|false|none|none|
|name|string|false|none|none|
|type|string|false|none|none|
|status|string|false|none|none|
|config|object|false|none|none|
|createdAt|string(date-time)|false|none|none|
|updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|inactive|

<h2 id="tocS_IntegrationLog">IntegrationLog</h2>
<!-- backwards compatibility -->
<a id="schemaintegrationlog"></a>
<a id="schema_IntegrationLog"></a>
<a id="tocSintegrationlog"></a>
<a id="tocsintegrationlog"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "integrationId": "497a18ca-284e-40c0-985d-f72be35d468e",
  "status": "success",
  "message": "string",
  "createdAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|integrationId|string(uuid)|false|none|none|
|status|string|false|none|none|
|message|string|false|none|none|
|createdAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|success|
|status|error|

<h2 id="tocS_SystemConfig">SystemConfig</h2>
<!-- backwards compatibility -->
<a id="schemasystemconfig"></a>
<a id="schema_SystemConfig"></a>
<a id="tocSsystemconfig"></a>
<a id="tocssystemconfig"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "key": "string",
  "value": "string",
  "description": "string",
  "active": true,
  "createdAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|key|string|false|none|none|
|value|string|false|none|none|
|description|string|false|none|none|
|active|boolean|false|none|none|
|createdAt|string(date-time)|false|none|none|

<h2 id="tocS_SystemLog">SystemLog</h2>
<!-- backwards compatibility -->
<a id="schemasystemlog"></a>
<a id="schema_SystemLog"></a>
<a id="tocSsystemlog"></a>
<a id="tocssystemlog"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "level": "info",
  "message": "string",
  "createdAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|level|string|false|none|none|
|message|string|false|none|none|
|createdAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|level|info|
|level|warning|
|level|error|

<h2 id="tocS_Pagination">Pagination</h2>
<!-- backwards compatibility -->
<a id="schemapagination"></a>
<a id="schema_Pagination"></a>
<a id="tocSpagination"></a>
<a id="tocspagination"></a>

```json
{
  "page": 0,
  "limit": 0,
  "total": 0,
  "pages": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|page|integer|false|none|none|
|limit|integer|false|none|none|
|total|integer|false|none|none|
|pages|integer|false|none|none|

<h2 id="tocS_Error">Error</h2>
<!-- backwards compatibility -->
<a id="schemaerror"></a>
<a id="schema_Error"></a>
<a id="tocSerror"></a>
<a id="tocserror"></a>

```json
{
  "success": true,
  "message": "Invalid credentials",
  "errors": [
    "string"
  ],
  "status": "error",
  "details": {
    "field": "email",
    "message": "Email is required"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|success|boolean|false|none|none|
|message|string|false|none|none|
|errors|[string]|false|none|none|
|status|string|false|none|none|
|details|object|false|none|none|

<h2 id="tocS_RegisterInput">RegisterInput</h2>
<!-- backwards compatibility -->
<a id="schemaregisterinput"></a>
<a id="schema_RegisterInput"></a>
<a id="tocSregisterinput"></a>
<a id="tocsregisterinput"></a>

```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "pa$$word",
  "firstName": "string",
  "lastName": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string(email)|true|none|none|
|username|string|true|none|none|
|password|string(password)|true|none|User's password (min 6 characters)|
|firstName|string|false|none|User's first name (optional)|
|lastName|string|false|none|User's last name (optional)|

<h2 id="tocS_LoginInput">LoginInput</h2>
<!-- backwards compatibility -->
<a id="schemalogininput"></a>
<a id="schema_LoginInput"></a>
<a id="tocSlogininput"></a>
<a id="tocslogininput"></a>

```json
{
  "email": "user@example.com",
  "password": "password123"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string(email)|true|none|none|
|password|string(password)|true|none|none|

<h2 id="tocS_RefreshTokenInput">RefreshTokenInput</h2>
<!-- backwards compatibility -->
<a id="schemarefreshtokeninput"></a>
<a id="schema_RefreshTokenInput"></a>
<a id="tocSrefreshtokeninput"></a>
<a id="tocsrefreshtokeninput"></a>

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|refreshToken|string|true|none|none|

<h2 id="tocS_ToggleUserActiveStatusInput">ToggleUserActiveStatusInput</h2>
<!-- backwards compatibility -->
<a id="schematoggleuseractivestatusinput"></a>
<a id="schema_ToggleUserActiveStatusInput"></a>
<a id="tocStoggleuseractivestatusinput"></a>
<a id="tocstoggleuseractivestatusinput"></a>

```json
{
  "isActive": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|isActive|boolean|true|none|Set user's active status (true for active, false for inactive)|

<h2 id="tocS_ToggleUserActiveStatusOutput">ToggleUserActiveStatusOutput</h2>
<!-- backwards compatibility -->
<a id="schematoggleuseractivestatusoutput"></a>
<a id="schema_ToggleUserActiveStatusOutput"></a>
<a id="tocStoggleuseractivestatusoutput"></a>
<a id="tocstoggleuseractivestatusoutput"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "isActive": true,
  "accountStatus": "active",
  "message": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|User ID|
|isActive|boolean|false|none|User's new active status|
|accountStatus|string|false|none|User's new account status|
|message|string|false|none|Status message for the operation|

#### Enumerated Values

|Property|Value|
|---|---|
|accountStatus|active|
|accountStatus|suspended|
|accountStatus|deactivated|

<h2 id="tocS_UserProfile">UserProfile</h2>
<!-- backwards compatibility -->
<a id="schemauserprofile"></a>
<a id="schema_UserProfile"></a>
<a id="tocSuserprofile"></a>
<a id="tocsuserprofile"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "email": "user@example.com",
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "avatar": "string",
  "bio": "string",
  "preferences": {},
  "language": "string",
  "timezone": "string",
  "role": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "permissions": [
      "string"
    ]
  },
  "company": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|User ID|
|email|string(email)|false|none|User's email address|
|username|string|false|none|User's username|
|firstName|string|false|none|User's first name|
|lastName|string|false|none|User's last name|
|phoneNumber|string|false|none|User's phone number|
|avatar|string|false|none|URL to user's avatar|
|bio|string|false|none|User's short biography|
|preferences|object|false|none|User's preferences (e.g., UI settings)|
|language|string|false|none|User's preferred language (e.g., 'en')|
|timezone|string|false|none|User's timezone|
|role|object|false|none|none|
|» id|string(uuid)|false|none|none|
|» name|string|false|none|none|
|» permissions|[string]|false|none|none|
|company|object|false|none|none|
|» id|string(uuid)|false|none|none|
|» name|string|false|none|none|

<h2 id="tocS_UpdateProfileInput">UpdateProfileInput</h2>
<!-- backwards compatibility -->
<a id="schemaupdateprofileinput"></a>
<a id="schema_UpdateProfileInput"></a>
<a id="tocSupdateprofileinput"></a>
<a id="tocsupdateprofileinput"></a>

```json
{
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "avatar": "string",
  "bio": "string",
  "preferences": {},
  "language": "st",
  "timezone": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|firstName|string|false|none|User's first name|
|lastName|string|false|none|User's last name|
|phoneNumber|string|false|none|User's phone number|
|avatar|string(url)|false|none|URL to user's avatar|
|bio|string|false|none|User's short biography|
|preferences|object|false|none|User's preferences (e.g., UI settings)|
|language|string|false|none|User's preferred language (e.g., 'en')|
|timezone|string|false|none|User's timezone|

<h2 id="tocS_ChangePasswordInput">ChangePasswordInput</h2>
<!-- backwards compatibility -->
<a id="schemachangepasswordinput"></a>
<a id="schema_ChangePasswordInput"></a>
<a id="tocSchangepasswordinput"></a>
<a id="tocschangepasswordinput"></a>

```json
{
  "currentPassword": "pa$$word",
  "newPassword": "pa$$word"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|currentPassword|string(password)|true|none|User's current password|
|newPassword|string(password)|true|none|User's new password (min 6 characters)|

<h2 id="tocS_PasswordHistoryEntry">PasswordHistoryEntry</h2>
<!-- backwards compatibility -->
<a id="schemapasswordhistoryentry"></a>
<a id="schema_PasswordHistoryEntry"></a>
<a id="tocSpasswordhistoryentry"></a>
<a id="tocspasswordhistoryentry"></a>

```json
{
  "changedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|changedAt|string(date-time)|false|none|Timestamp when the password was changed|

<h2 id="tocS_PasswordHistoryOutput">PasswordHistoryOutput</h2>
<!-- backwards compatibility -->
<a id="schemapasswordhistoryoutput"></a>
<a id="schema_PasswordHistoryOutput"></a>
<a id="tocSpasswordhistoryoutput"></a>
<a id="tocspasswordhistoryoutput"></a>

```json
{
  "passwordHistory": [
    {
      "changedAt": "2019-08-24T14:15:22Z"
    }
  ],
  "lastPasswordChange": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|passwordHistory|[[PasswordHistoryEntry](#schemapasswordhistoryentry)]|false|none|List of past password change entries|
|lastPasswordChange|string(date-time)|false|none|Last time the password was changed|

<h2 id="tocS_UpdateUserInput">UpdateUserInput</h2>
<!-- backwards compatibility -->
<a id="schemaupdateuserinput"></a>
<a id="schema_UpdateUserInput"></a>
<a id="tocSupdateuserinput"></a>
<a id="tocsupdateuserinput"></a>

```json
{
  "roleId": "7382d58e-652a-4905-b7c9-bcca1e0e5391",
  "isActive": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|roleId|string(uuid)|false|none|New role ID for the user|
|isActive|boolean|false|none|User's active status|

<h2 id="tocS_UserAccountStatusInput">UserAccountStatusInput</h2>
<!-- backwards compatibility -->
<a id="schemauseraccountstatusinput"></a>
<a id="schema_UserAccountStatusInput"></a>
<a id="tocSuseraccountstatusinput"></a>
<a id="tocsuseraccountstatusinput"></a>

```json
{
  "status": "active",
  "reason": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|true|none|New account status for the user|
|reason|string|false|none|Reason for status change (e.g., deactivation reason)|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|suspended|
|status|deactivated|

<h2 id="tocS_UserPagination">UserPagination</h2>
<!-- backwards compatibility -->
<a id="schemauserpagination"></a>
<a id="schema_UserPagination"></a>
<a id="tocSuserpagination"></a>
<a id="tocsuserpagination"></a>

```json
{
  "data": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "email": "user@example.com",
      "firstName": "string",
      "lastName": "string",
      "role": {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "name": "string"
      },
      "status": "active",
      "companyId": "8bb73d03-06b4-47c7-80c7-59301f770eda",
      "createdAt": "2019-08-24T14:15:22Z",
      "updatedAt": "2019-08-24T14:15:22Z",
      "username": "string",
      "isActive": true,
      "company": {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "name": "string"
      }
    }
  ],
  "meta": {
    "total": 0,
    "page": 0,
    "limit": 0,
    "totalPages": 0
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[User](#schemauser)]|false|none|none|
|meta|object|false|none|none|
|» total|integer|false|none|none|
|» page|integer|false|none|none|
|» limit|integer|false|none|none|
|» totalPages|integer|false|none|none|

<h2 id="tocS_UserDetail">UserDetail</h2>
<!-- backwards compatibility -->
<a id="schemauserdetail"></a>
<a id="schema_UserDetail"></a>
<a id="tocSuserdetail"></a>
<a id="tocsuserdetail"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "email": "user@example.com",
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "avatar": "string",
  "isActive": true,
  "role": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "permissions": [
      "string"
    ]
  },
  "company": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|none|
|email|string(email)|false|none|none|
|username|string|false|none|none|
|firstName|string|false|none|none|
|lastName|string|false|none|none|
|phoneNumber|string|false|none|none|
|avatar|string|false|none|none|
|isActive|boolean|false|none|none|
|role|object|false|none|none|
|» id|string(uuid)|false|none|none|
|» name|string|false|none|none|
|» permissions|[string]|false|none|none|
|company|object|false|none|none|
|» id|string(uuid)|false|none|none|
|» name|string|false|none|none|

<h2 id="tocS_Role">Role</h2>
<!-- backwards compatibility -->
<a id="schemarole"></a>
<a id="schema_Role"></a>
<a id="tocSrole"></a>
<a id="tocsrole"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "name": "string",
  "description": "string",
  "permissions": [
    "string"
  ],
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|false|none|Role ID|
|name|string|false|none|Role name|
|description|string|false|none|Role description|
|permissions|[string]|false|none|List of permissions associated with the role|
|createdAt|string(date-time)|false|none|Role creation timestamp|
|updatedAt|string(date-time)|false|none|Last update timestamp|

<h2 id="tocS_CreateRoleInput">CreateRoleInput</h2>
<!-- backwards compatibility -->
<a id="schemacreateroleinput"></a>
<a id="schema_CreateRoleInput"></a>
<a id="tocScreateroleinput"></a>
<a id="tocscreateroleinput"></a>

```json
{
  "name": "string",
  "description": "string",
  "permissions": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Name of the role|
|description|string|false|none|Optional description of the role|
|permissions|[string]|true|none|List of permissions for the role|

<h2 id="tocS_UpdateRoleInput">UpdateRoleInput</h2>
<!-- backwards compatibility -->
<a id="schemaupdateroleinput"></a>
<a id="schema_UpdateRoleInput"></a>
<a id="tocSupdateroleinput"></a>
<a id="tocsupdateroleinput"></a>

```json
{
  "name": "string",
  "description": "string",
  "permissions": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|New name for the role|
|description|string|false|none|New description for the role|
|permissions|[string]|false|none|New list of permissions for the role|

