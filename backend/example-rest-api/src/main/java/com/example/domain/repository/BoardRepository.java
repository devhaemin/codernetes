package com.example.domain.repository;

import com.example.domain.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BoardRepository extends JpaRepository<Board, UUID> {
    Page<Board> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Board> findByUserIdOrderByCreatedAtDesc(UUID userId, Pageable pageable);
} 