package com.example.presentation.controller;

import com.example.application.dto.BoardDto;
import com.example.application.dto.CreateBoardRequest;
import com.example.application.dto.UpdateBoardRequest;
import com.example.application.service.BoardService;
import com.example.infrastructure.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping
    public ResponseEntity<Page<BoardDto>> getAllBoards(Pageable pageable) {
        return ResponseEntity.ok(boardService.getAllBoards(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardDto> getBoard(@PathVariable UUID id) {
        return ResponseEntity.ok(boardService.getBoard(id));
    }

    @PostMapping
    public ResponseEntity<BoardDto> createBoard(
            @RequestBody CreateBoardRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(boardService.createBoard(request, userPrincipal.getId()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BoardDto> updateBoard(
            @PathVariable UUID id,
            @RequestBody UpdateBoardRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(boardService.updateBoard(id, request, userPrincipal.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBoard(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        boardService.deleteBoard(id, userPrincipal.getId());
        return ResponseEntity.ok().build();
    }
} 