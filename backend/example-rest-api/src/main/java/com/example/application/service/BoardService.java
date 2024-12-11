package com.example.application.service;

import com.example.application.dto.BoardDto;
import com.example.application.dto.CreateBoardRequest;
import com.example.application.dto.UpdateBoardRequest;
import com.example.domain.entity.Board;
import com.example.domain.entity.User;
import com.example.domain.repository.BoardRepository;
import com.example.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<BoardDto> getAllBoards(Pageable pageable) {
        return boardRepository.findAllByOrderByCreatedAtDesc(pageable)
                .map(this::convertToDto);
    }

    @Transactional(readOnly = true)
    public BoardDto getBoard(UUID id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found"));
        board.setViewCount(board.getViewCount() + 1);
        return convertToDto(boardRepository.save(board));
    }

    @Transactional
    public BoardDto createBoard(CreateBoardRequest request, UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Board board = new Board();
        board.setTitle(request.getTitle());
        board.setContent(request.getContent());
        board.setUser(user);
        board.setViewCount(0);

        return convertToDto(boardRepository.save(board));
    }

    @Transactional
    public BoardDto updateBoard(UUID id, UpdateBoardRequest request, UUID userId) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found"));

        if (!board.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to update this board");
        }

        board.setTitle(request.getTitle());
        board.setContent(request.getContent());

        return convertToDto(boardRepository.save(board));
    }

    @Transactional
    public void deleteBoard(UUID id, UUID userId) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found"));

        if (!board.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this board");
        }

        boardRepository.delete(board);
    }

    private BoardDto convertToDto(Board board) {
        BoardDto dto = new BoardDto();
        dto.setId(board.getId());
        dto.setTitle(board.getTitle());
        dto.setContent(board.getContent());
        dto.setAuthorUsername(board.getUser().getUsername());
        dto.setViewCount(board.getViewCount());
        dto.setCreatedAt(board.getCreatedAt());
        return dto;
    }
} 