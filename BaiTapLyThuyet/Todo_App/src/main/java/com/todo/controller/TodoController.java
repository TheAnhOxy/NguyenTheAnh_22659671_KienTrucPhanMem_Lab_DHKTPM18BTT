package com.todo.controller;

import com.todo.dto.request.CreateTodoRequest;
import com.todo.dto.request.UpdateTodoRequest;
import com.todo.dto.response.TodoResponse;
import com.todo.entity.Todo;
import com.todo.service.command.TodoCommandService;
import com.todo.service.query.TodoQueryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {

    private final TodoCommandService commandService;
    private final TodoQueryService queryService;

    public TodoController(TodoCommandService c, TodoQueryService q) {
        this.commandService = c;
        this.queryService = q;
    }

    // COMMAND

    @PostMapping
    public Todo create(@RequestBody CreateTodoRequest request) {
        return commandService.create(request);
    }

    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id,
                       @RequestBody UpdateTodoRequest request) {
        return commandService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        commandService.delete(id);
    }

    // QUERY

    @GetMapping
    public List<TodoResponse> getAll() {
        return queryService.getAll();
    }

    @GetMapping("/{id}")
    public TodoResponse getById(@PathVariable Long id) {
        return queryService.getById(id);
    }
}
