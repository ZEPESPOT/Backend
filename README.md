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
    
    
 
* Unauthorized
>
    HTTP : 401
    
    {
        "success": false,
        "message": "가입된 정보가 존재하지 않습니다."
    }
    
#### /auth/register (회원가입) [POST]
>Requiring Params

    username, email, password, zepeto_code

* Success
>         
    HTTP : 200
    
    {
        "_id": "5cd7359bd4b39edb9c147e8d",
        "username": "조성운",
        "email": "coffee@soylatte.kr",
        "password": "qq009261",
        "zepeto_code": "12345",
        "__v": 0
    }
    
* Data Conflict 
>
    HTTP : 409
    
    {
        "success": false,
        "message": "이미 가입된 이메일 입니다."
    }


### Community 
#### /community/post (글 작성) [POST]
>Requiring Params

    course_number, title, usertoken(로그인시 받은 _id), content(글 내용), file(사진)
    
* Success 
>
    HTTP : 200
    
    {
        "success": true,
        "message": "성공적으로 글을 포스팅했습니다."
    }
    
    
#### /community/post/list (포스팅된 글의 리스트) [GET]
>Requiring Params

    course_number
    
* Success
>
    [
        {
            "time": "2019-05-11T17:10:24.845Z",
            "like": [],
            "_id": "5cd70204e15af7a403f0d2bc",
            "course_number": 1,
            "title": "제목테스트",
            "writer": "5cd6f82e96a421998b950c4e",
            "content": ";jasdgj;alskdjsdfasdf",
            "photo": "http://soylatte.kr:5000/photo/fJHSEAaAYeKtZOMVSWjE.png",
            "__v": 0
        }
    ]
    
    
#### /community/like (좋아요) [POST]
>Requiring Params

    posttoken(list에서 받은 _id)
    
* Success
>
    {
        "time": "2019-05-11T17:10:24.845Z",
        "like": [],
        "_id": "5cd70204e15af7a403f0d2bc",
        "course_number": 1,
        "title": "제목테스트",
        "writer": null,
        "content": ";jasdgj;alskdjsdfasdf",
        "photo": "http://soylatte.kr:5000/photo/fJHSEAaAYeKtZOMVSWjE.png",
        "__v": 0
    }

    
#### /community/comment (댓글 작상) [POST]
>Requiring Params

    usertoken, comment, posttoken
    
* Success
>
    {
        "success": true,
        "message": "댓글이 성공적으로 등록되었습니다."
    }
    
#### /comment/list (댓글 리스트) [POST]
>Requiring Params

    posttoken(list에서 받은 _id)
   
* Success
>
    [
        {
            "time": "2019-05-11T17:10:24.842Z",
            "_id": "5cd702abe15af7a403f0d2bd",
            "writer": {
                "_id": "5cd6f82e96a421998b950c4e",
                "username": "조성운",
                "email": "coffee@soylatte.kr",
                "password": "qq009261",
                "__v": 0
            },
            "comment": "아니 이건 좀 아니",
            "posttoken": "5cd70204e15af7a403f0d2bc",
            "__v": 0
        }
    ]

### Course & Sequence
#### /course/sequence/list (시퀸스 리스트) [POST]
>Requiring Params

    course_number(코스 번호 1로 하셈 하나밖에 없음)
   
* Success
>
    [
        {
            "_id": "5cd71e66a25f18c30f7f3bb6",
            "sequence_name": "서울로7017&청계천",
            "sequence_number": 1,
            "latitude": 37.571582,
            "longitude": 127.024649,
            "photo": "http://soylatte.kr:5000/photo/chung.jpeg",
            "cleared": false,
            "__v": 0
        },
        {
            "_id": "5cd723c4a25f18c30f7f3bb7",
            "sequence_name": "남산",
            "sequence_number": 2,
            "latitude": 37.554812,
            "longitude": 126.980905,
            "photo": "https://blog.hmgjournal.com/images_n/contents/171013_N1.png",
            "cleared": false,
            "__v": 0
        },
        {
            "_id": "5cd723f4a25f18c30f7f3bb8",
            "sequence_name": "잠실종합운동장",
            "sequence_number": 3,
            "latitude": 37.515078,
            "longitude": 127.073278,
            "photo": "http://www.newsfocus.co.kr/imgdata/newsfocus_co_kr/201801/2018012618402781.jpg",
            "cleared": false,
            "__v": 0
        },
        {
            "_id": "5cd72425a25f18c30f7f3bb9",
            "sequence_name": "반포한강공원&달빛무지개분수",
            "sequence_number": 4,
            "latitude": 37.512567,
            "longitude": 126.998015,
            "photo": "https://media.timeout.com/images/102441685/630/472/image.jpg",
            "cleared": false,
            "__v": 0
        },
        {
            "_id": "5cd72447a25f18c30f7f3bba",
            "sequence_name": "CJ THE KITCHEN",
            "sequence_number": 5,
            "latitude": 37.563891,
            "longitude": 127.003289,
            "photo": "http://www.businesskorea.co.kr/news/photo/201803/25181_20911_0.jpg",
            "cleared": false,
            "__v": 0
        }
    ]
    
#### /course/per (코스 진행 비율) [GET]
>Requiring Params

    No Params
    
* Success

    HTTP : 200
    
    {
        "percent": 0
    }
    
### Gallery 
#### /gallery/upload (갤러리 업로드) [POST]
>Requiring Params

    place_name, file(사진), usertoken

* Success
>
    {
        "success": true,
        "message": "성공적으로 갤러리에 업로드 하였습니다."
    }
        
#### /gallery/list (갤러리 리스트) [POST]
>Requiring Params

    usertoken : (로그인시 받은 _id)
    
* Success
>
    [
        {
            "_id": "5cd7440fdd181dea5d4f5c92",
            "place_name": "장소이름",
            "photo": "http://soylatte.kr:5000/photo/X1wPZmzkbTF5s88VmPkr.png",
            "usertoken": "5cd7359bd4b39edb9c147e8d",
            "__v": 0
        }
    ]
    
    
