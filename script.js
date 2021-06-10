var timetodo=[];

function saveTime(){

var times = document.getElementById('add-time').value;
timetodo.push(times);
};

var app = new function () {
    this.el = document.getElementById('tasks');
    this.tasks = [];

    this.FetchAll = function () {
        var elem = document.querySelector("#tasks");       
        var data;
        for (i = 0, data = ""; i < this.tasks.length; i++) {
            data += '<tr>';
            data += '<td>' + (i + 1) + '. 할 일 : ' + this.tasks[i] + ' 예정 시각 : ' + timetodo[i] + '</td>';
            data += '<td><button onclick="app.Edit(' + i + ')" class=edit-button>수정</button></td>';
            data += '<td><button onclick="app.Delete(' + i + ')" class=delete-button>삭제</button></td>';
            data += '<tr>';
            data += '</tr>';
        }

        elem.innerHTML = data;
        return data;
    };

    this.Add = function () {
        let el = document.getElementById('add-todo');
        var tm = document.getElementById('add-time');
        var task = el.value;
        var dotime = tm.value
        if (task) {
            this.tasks.push(task.trim());
            this.el.value = '';
            this.FetchAll();
        }

    };

    this.Edit = function (item) {

        this.el = document.getElementById('edit-todo');
        this.el.value = this.tasks[item];
        times = document.getElementById('edit-time');
        times.value = timetodo[item];

        document.getElementById('edit-box').style.display = 'block';        

        self = this;

        document.getElementById('save-edit').onsubmit = function () {
            var task = document.querySelector("#edit-todo").value;
            var tm = document.querySelector("#edit-time").value;

            self = app;
            
            if (task) { 
                self.tasks.splice(item, 1, task.trim());
                timetodo.splice(item, 1, tm); 
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