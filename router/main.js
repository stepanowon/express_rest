module.exports = function(app)
{
    var last_id = 2;
    var data = [
        { id:1, name:'홍길동', tel:'010-2121-3232' },
        { id:2, name:'이몽룡', tel:'010-2121-4341' }
    ];
 
    app.get('/users', function (req, res) {
        console.log("GET /users");
        res.json(data);
    })

    app.get('/users/:id', function (req, res) {
        var user = null;
        for (var i=0; i < data.length; i++) {
            if (data[i].id == req.params.id) {
                user = data[i]; 
                break;
            }
        }

        if (user == null) {
            user = { 
                status  : "fail",
                message : "요청하신 정보(id:" + req.params.id + ")는 존재하지 않습니다."
            }
        }
        res.json(user);
    })

    app.post('/users', function (req, res) {
        console.log("POST /users")
        var result = { 
            status : "Created",
            message : ""
        };
        console.log(req.body);
        var name = req.body.name;
        var tel = req.body.tel;

        if (!name ||!tel) {
            result.status = "Missing Parameter";
            result.message = "이름과 전화번호는 반드시 입력합니다.";
            res.status(401);
        } else {
            data.push({ id:++last_id, name:name, tel:tel });
            result.message = "id : " + last_id + " 데이터가 추가되었습니다";
            res.status(201);
        }

        res.json(result);
    })

    app.put('/users/:id', function (req, res) {
        console.log("PUT /users/:id");
        var id = req.params.id;
        var name = req.body.name;
        var tel = req.body.tel;

        var index = 0;
        var result = { 
            status : "updated",
            message : ""
        };

        for (var i=0; i < data.length; i++) {
            if (data[i].id == id) {
                index = i;
            }
        }

        if (index == 0) {
            result.status = "not exist";
            result.message = "id에 해당하는 데이터가 존재하지 않습니다.";
            res.status(401);
        } else {
            data[index].name = name;
            data[index].tel = tel;
            result.message = "id : " + last_id + " 데이터가 변경되었습니다";
            res.status(200);
        }

        res.json(result);
    });

    app.delete('/users/:id', function (req, res) {
        var id = 0;;
        var result = { 
            status : "deleted",
            message : ""
        };

        for (var i=0; i < data.length; i++) {
            if (data[i].id == req.params.id) {
                data.splice(i,1);
                id = req.params.id;
                break;
            }
        }

        if (id == 0) {
            result.status = "not exist";제
            result.message = "id의 데이터가 존재하지 않습니다.";
            res.status(401);
        } else {
            result.message =  "id : " + last_id + " 데이터가 삭제되었습니다";
        }
        res.json(result);

    });
}