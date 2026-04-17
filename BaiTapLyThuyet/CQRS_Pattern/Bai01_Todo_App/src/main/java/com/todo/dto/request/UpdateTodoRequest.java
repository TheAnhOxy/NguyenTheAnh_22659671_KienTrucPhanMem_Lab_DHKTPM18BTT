package com.todo.dto.request;

import lombok.Data;

@Data
public class UpdateTodoRequest {
    private String title;
    private boolean completed;


}