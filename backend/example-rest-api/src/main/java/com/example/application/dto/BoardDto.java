package com.example.application.dto;

import lombok.Data;
import java.time.ZonedDateTime;
import java.util.UUID;

@Data
public class BoardDto {
    private UUID id;
    private String title;
    private String content;
    private String authorUsername;
    private Integer viewCount;
    private ZonedDateTime createdAt;
}

@Data
public class CreateBoardRequest {
    private String title;
    private String content;
}

@Data
public class UpdateBoardRequest {
    private String title;
    private String content;
} 