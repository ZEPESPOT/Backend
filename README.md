# Example
* Example Backend Server

* RESTful (FormUrlEncoded)방식으로 작성된 프로젝트 입니다.

* Request URL은 <http://www.example.com:PORT> 입니다.

* npm run cluster 명령어로 PM2 Cluster 서버를 가동할 수 있습니다.

* 외부API, DB계정 등의 정보는 src/config/properties.json에 기술되어 있습니다.


## Server Information

### Hosting
    
    None
    
### OS

    None

### Framework

    None
    
### DB

    None
    
### DB Service Port

    None
    
### DB Account

    None


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
