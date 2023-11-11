import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit{
  todos: Todo[] = [];
  newTodo: Todo = {
    id: '',
    description: '',
    createdDate: new Date(),
    isCompleted: true,
    completedDate: new Date()
  };

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
   this.getAllTodos();

      // Set up a timer to pull the method every 2 seconds
      setInterval(() => {
        this.getAllTodos();
      }, 2000);
  }
  
  getAllTodos(){
    this.todoService.getAllTodos()
    .subscribe({
      next: (todos) => {
        this.todos = todos;
      }
    });
  }
  addTodo() {
    console.log(this.newTodo);
    this.todoService.addTodo(this.newTodo)
    .subscribe({
      next: (todo) => {
        this.getAllTodos();
      }
    });
    }

    onCompletedChange(id: string, todo: Todo){
      todo.isCompleted = !todo.isCompleted;
      this.todoService.updateTodo(id, todo)
      .subscribe({
        next: (response) => {
          this.getAllTodos();
        }
      })
    }
    deleteTodo(id: string) {
      this.todoService.deleteTodo(id)
        .subscribe({
          next: (response) => {
            this.getAllTodos();
          }
        })
    }
  }

