package com.todo.service.query;

import com.todo.dto.response.TodoResponse;
import com.todo.entity.Todo;
import com.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoQueryService {

    private final TodoRepository repository;

    public TodoQueryService(TodoRepository repository) {
        this.repository = repository;
    }

    public List<TodoResponse> getAll() {
        return repository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public TodoResponse getById(Long id) {
        Todo todo = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        return toResponse(todo);
    }

    private TodoResponse toResponse(Todo todo) {
        return new TodoResponse(
                todo.getId(),
                todo.getTitle(),
                todo.isCompleted()
        );
    }
}
