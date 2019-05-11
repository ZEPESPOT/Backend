# ZEPESPOT
* ZEPESPOT Backend Server

* RESTful (FormUrlEncoded)방식으로 작성된 프로젝트 입니다.

* Request URL은 <http://soylatte.kr:5000> 입니다.

* 외부API, DB계정 등의 정보는 src/config/properties.json에 기술되어 있습니다.


## Server Information

### Hosting
    
    Personal Develop Server
    
### OS

    Ubuntu 16.04 LTS

### Framework

    Node.JS
    
### DB

    MongoDB


## Status Code
### 200

    Success Processing Request
    
### 400

    Bad Request

### 401

    Unauthorized -> Login Error, access_token Error
    
### 403

    Forbidden -> Authority Error
    
### 404

    URL Not Founded
    
### 409

    Conflict -> 데이터 충돌 (회원가입시 아이디 중복 등)
   
### 500

    Server Error
    
   
## API Document
### Auth
#### /auth/login (로그인) [POST]
>Requiring Params

    email, password
    

* Success
>         
    HTTP : 200
    
    {
        "_id": "5cd689e799d22e4c1351369e",
        "email": "coffee@soylatte.kr",
        "password": "qq009261",
        "usertoken": "sNyeW0V8be",
        "__v": 0
    }
    
 
* Unauthorized
>
    HTTP : 401
    
    {
        "success": false,
        "message": "가입된 정보가 존재하지 않습니다."
    }
    
#### /auth/register (회원가입) [POST]
>Requiring Params

    email, password

* Success
>         
    HTTP : 200
    
    {
        "_id": "5cd689e799d22e4c1351369e",
        "email": "coffee@soylatte.kr",
        "password": "qq009261",
        "usertoken": "sNyeW0V8be",
        "__v": 0
    }
    
* Data Conflict 
>
    HTTP : 409
    
    {
        "success": false,
        "message": "이미 가입된 이메일 입니다."
    }
