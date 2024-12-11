import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Board } from '@/types';
import axios from 'axios';

export const useBoardStore = defineStore('board', () => {
  const boards = ref<Board[]>([]);
  const currentBoard = ref<Board | null>(null);

  const fetchBoards = async (page: number = 0) => {
    try {
      const response = await axios.get(`/api/boards?page=${page}`);
      boards.value = response.data.content;
      return response.data;
    } catch (error) {
      console.error('Failed to fetch boards:', error);
      return null;
    }
  };

  const fetchBoard = async (id: string) => {
    try {
      const response = await axios.get(`/api/boards/${id}`);
      currentBoard.value = response.data;
      return response.data;
    } catch (error) {
      console.error('Failed to fetch board:', error);
      return null;
    }
  };

  const createBoard = async (data: { title: string; content: string }) => {
    try {
      const response = await axios.post('/api/boards', data);
      return response.data;
    } catch (error) {
      console.error('Failed to create board:', error);
      return null;
    }
  };

  const updateBoard = async (id: string, data: { title: string; content: string }) => {
    try {
      const response = await axios.put(`/api/boards/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update board:', error);
      return null;
    }
  };

  const deleteBoard = async (id: string) => {
    try {
      await axios.delete(`/api/boards/${id}`);
      return true;
    } catch (error) {
      console.error('Failed to delete board:', error);
      return false;
    }
  };

  return {
    boards,
    currentBoard,
    fetchBoards,
    fetchBoard,
    createBoard,
    updateBoard,
    deleteBoard
  };
}); 