var app = new function () {
    this.el = document.getElementById('tasks');
    this.tasks = [];


    this.FetchAll = function () {
        var elem = document.querySelector("#tasks");
        
        var data;

        for (i = 0, data = ""; i < this.tasks.length; i++) {
            data += '<tr>';
            data += '<td>' + (i + 1) + '. ' + this.tasks[i] + '</td>';
            data += '<td><button onclick="app.Edit(' + i + ')" class=edit-button>수정</button></td>';
            data += '<td><button onclick="app.Delete(' + i + ')" class=delete-button>삭제</button></td>';
            data += '<tr>';
            data += '</tr>';
        }

        // this.el.innerHTML = data;
        elem.innerHTML = data;

        return data;
    };


    this.Add = function () {
        let el = document.getElementById('add-todo');
        var task = el.value;
        if (task) {
            this.tasks.push(task.trim());
            this.el.value = '';
            this.FetchAll();
        }
    };


    this.Edit = function (item) {
        // document.querySelectorAll(<CSS 지정자>);
        // document.querySelector(<CSS 지정자>);

        this.el = document.getElementById('edit-todo');
        this.el.value = this.tasks[item];

        document.getElementById('edit-box').style.display = 'block';

        self = this;

        document.getElementById('save-edit').onsubmit = function () {
            // 이 주석을 참조해서 수정해보세요. (app 객체에만 접근할 수 있다면, 모두 해결될겁니다.)
            // 이 함수가 아예 별도의 함수이기 때문에, this 내부의 값에 접근할 수 없어요.
            // app 객체 내의 함수랑 별개로 동작하기 때문에, app 객체 내에서 존재하는 변수, 객체 등의 자료와는 아예 별개로 구분되기 때문입니다.
            var task = document.querySelector("#edit-todo").value; // 엘리먼트의 포인터를 가져옴.

            self = app;
            
            if (task) { // if 엘리먼트 포인터를 받아오는데 성공했다면
                self.tasks.splice(item, 1, task.trim());
                self.FetchAll();
                CloseInput();
            }

            console.log(self.tasks);
        }
    };


    this.Delete = function (item) {
        this.tasks.splice(item, 1);
        this.FetchAll();
    };


}

app.FetchAll();

function CloseInput() {
    document.getElementById('edit-box').style.display = 'none';
}