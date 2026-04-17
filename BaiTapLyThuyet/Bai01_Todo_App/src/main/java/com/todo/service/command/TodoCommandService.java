package com.todo.service.command;

import com.todo.dto.request.CreateTodoRequest;
import com.todo.dto.request.UpdateTodoRequest;
import com.todo.entity.Todo;
import com.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

@Service
public class TodoCommandService {

    private final TodoRepository repository;

    public TodoCommandService(TodoRepository repository) {
        this.repository = repository;
    }

    public Todo create(CreateTodoRequest request) {
        Todo todo = new Todo();
        todo.setTitle(request.getTitle());
        todo.setCompleted(false);
        return repository.save(todo);
    }

    public Todo update(Long id, UpdateTodoRequest request) {
        Todo todo = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        todo.setTitle(request.getTitle());
        todo.setCompleted(request.isCompleted());

        return repository.save(todo);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}