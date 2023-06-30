
- [x] Registrasi dan Autentikasi Pengguna
    - [x] /users
        - Method: POST
        - Body Request:
            ```json
            {
                "fullname" : "string",
                "username" : "string",
                "password" : "string"
            }
            ```
        - Response: 
            ```json
            {
                "status": "success",
                "data": {
                    "userId": "user_id"
                }
            }
            ```
    - [x] /authentictions
        - Method: POST
        - Body Request:
            ```json
            {
                "username" : "string",
                "password" : "string"
            }
            ```
        - Response: 
            ```json
            {
                "status": "success",
                "data": {
                    "accessToken": "token",
                    "refreshToken": "token"
                }
            }
            ```
    - [x] /authentictions
        - Method: PUT
        - Body Request:
            ```json
            {
                "refreshToken" : "token"
            }
            ```
        - Response: 
            ```json
            {
                "status": "success",
                "data": {
                    "accessToken": "token"
                }
            }
            ```
    - [x] /authentictions
        - Method: DELETE
        - Body Request:
            ```json
            {
                "refreshToken" : "token"
            }
            ```
        - Response: 
            ```json
            {
                "status": "success",
                "data": {
                    "accessToken": "token"
                }
            }
            ```