interface Todo {
  id: number;
  title: string;
  category: number;
  complete: boolean;
}



class TodoData {
  id: number;
  title: string = "";
  complete: boolean = false;
  category: number;
  static lastId: number = 0;
  static TodoList: Todo[] = []

  private static instance: TodoData;
  constructor() { }

  static get Instance() {
    if (this.instance === null || this.instance === undefined) {
      this.instance = new TodoData();
    }
    return this.instance;
  }

  addTodo(title: string, category: number): void {
    this.id = ++TodoData.lastId;
    this.title = title;
    this.category = category;
    console.log("ID : " + this.id + " ,Topic : " + this.title + " ,Category : " + this.category);
  }

  completeTodo(id: number): void {
    this.complete = true;
    TodoData.TodoList[id - 1].complete = true;
  }
}

const categories = {
  1: "Learning",
  2: "Shopping",
  3: "Playing",
}

document.querySelector("#add_list").addEventListener("click", (): void => {
  let title = (<HTMLInputElement>document.getElementById('title')).value;
  let category = parseInt((<HTMLSelectElement>document.getElementById('category')).value);
  let todo = TodoData.Instance;
  todo.addTodo(title, category);
  (<HTMLFormElement>document.getElementById('todoApp')).reset();

  let temp_todo = {
    id: todo.id,
    title: todo.title,
    category: todo.category,
    complete: todo.complete
  }

  TodoData.TodoList.push(temp_todo);

  let len_list = TodoData.TodoList.length;
  let contents = "<tr><th>ID</th><th>Title</th><th>Category</th><th>Completion Status</th><th></th></tr>";
  for (var i = 0; i < len_list; i++) {
    contents += "<tr><td>" + TodoData.TodoList[i].id + "</td><td>" + TodoData.TodoList[i].title + "</td><td>" + categories[TodoData.TodoList[i].category] + "</td><td>" + TodoData.TodoList[i].complete + "</td><td><input type='checkbox' name='completed' id='" + (i + 1) + "'></td></tr>";
  }
  document.getElementById('table_list').innerHTML = contents;
  console.log(document.getElementsByName('completed'));
});

document.querySelector("#update_list").addEventListener("click", () => {
  let checkbox_list = document.getElementsByName('completed');
  let todo = TodoData.Instance;
  for (var i = 0; i < checkbox_list.length; i++) {
    if ((<HTMLSelectElement>checkbox_list[i]).checked) {
      todo.completeTodo(parseInt(checkbox_list[i].id));
      (<HTMLSelectElement>checkbox_list[i]).checked = false;
      console.log(checkbox_list[i]);
    }
  }
  let len_list = TodoData.TodoList.length;
  let contents = "<tr><th>ID</th><th>Title</th><th>Category</th><th>Completion Status</th><th></th></tr>";
  for (var i = 0; i < len_list; i++) {
    contents += "<tr><td>" + TodoData.TodoList[i].id + "</td><td>" + TodoData.TodoList[i].title + "</td><td>" + categories[TodoData.TodoList[i].category] + "</td><td>" + TodoData.TodoList[i].complete + "</td><td><input type='checkbox' name='completed' id='" + (i + 1) + "'></td></tr>";
  }
  document.getElementById('table_list').innerHTML = contents;
})

document.querySelector("#clear_list").addEventListener("click", () => {
  let contents = "<tr><th>ID</th><th>Title</th><th>Category</th><th>Completion Status</th><th></th></tr>";
  document.getElementById('table_list').innerHTML = contents;
  TodoData.TodoList = [];
  TodoData.lastId = 0;
  console.log(TodoData.TodoList);
})