"use strict";
var TodoData = /** @class */ (function () {
    function TodoData() {
        this.title = "";
        this.complete = false;
    }
    Object.defineProperty(TodoData, "Instance", {
        get: function () {
            if (this.instance === null || this.instance === undefined) {
                this.instance = new TodoData();
            }
            return this.instance;
        },
        enumerable: true,
        configurable: true
    });
    TodoData.prototype.addTodo = function (title, category) {
        this.id = ++TodoData.lastId;
        this.title = title;
        this.category = category;
        console.log("ID : " + this.id + " ,Topic : " + this.title + " ,Category : " + this.category);
    };
    TodoData.prototype.completeTodo = function (id) {
        this.complete = true;
        TodoData.TodoList[id - 1].complete = true;
    };
    TodoData.prototype.deleteTopic = function (id) {
    };
    TodoData.prototype.updateTopic = function (id, topic) {
    };
    TodoData.lastId = 0;
    TodoData.TodoList = [];
    return TodoData;
}());
var categories = {
    1: "Learning",
    2: "Shopping",
    3: "Playing",
};
document.querySelector("#add_list").addEventListener("click", function () {
    var title = document.getElementById('title').value;
    var category = parseInt(document.getElementById('category').value);
    var todo = TodoData.Instance;
    todo.addTodo(title, category);
    document.getElementById('todoApp').reset();
    var temp_todo = {
        id: todo.id,
        title: todo.title,
        category: todo.category,
        complete: todo.complete
    };
    TodoData.TodoList.push(temp_todo);
    var len_list = TodoData.TodoList.length;
    var contents = "<tr><th>ID</th><th>Title</th><th>Category</th><th>Completion Status</th><th></th></tr>";
    for (var i = 0; i < len_list; i++) {
        contents += "<tr><td>" + TodoData.TodoList[i].id + "</td><td>" + TodoData.TodoList[i].title + "</td><td>" + categories[TodoData.TodoList[i].category] + "</td><td>" + TodoData.TodoList[i].complete + "</td><td><input type='checkbox' name='completed' id='" + (i + 1) + "'></td></tr>";
    }
    document.getElementById('table_list').innerHTML = contents;
    console.log(document.getElementsByName('completed'));
});
document.querySelector("#update_list").addEventListener("click", function () {
    var checkbox_list = document.getElementsByName('completed');
    var todo = TodoData.Instance;
    for (var i = 0; i < checkbox_list.length; i++) {
        if (checkbox_list[i].checked) {
            todo.completeTodo(parseInt(checkbox_list[i].id));
            checkbox_list[i].checked = false;
            console.log(checkbox_list[i]);
        }
    }
    var len_list = TodoData.TodoList.length;
    var contents = "<tr><th>ID</th><th>Title</th><th>Category</th><th>Completion Status</th><th></th></tr>";
    for (var i = 0; i < len_list; i++) {
        contents += "<tr><td>" + TodoData.TodoList[i].id + "</td><td>" + TodoData.TodoList[i].title + "</td><td>" + categories[TodoData.TodoList[i].category] + "</td><td>" + TodoData.TodoList[i].complete + "</td><td><input type='checkbox' name='completed' id='" + (i + 1) + "'></td></tr>";
    }
    document.getElementById('table_list').innerHTML = contents;
});
document.querySelector("#clear_list").addEventListener("click", function () {
    var contents = "<tr><th>ID</th><th>Title</th><th>Category</th><th>Completion Status</th><th></th></tr>";
    document.getElementById('table_list').innerHTML = contents;
    TodoData.TodoList = [];
    TodoData.lastId = 0;
    console.log(TodoData.TodoList);
});
