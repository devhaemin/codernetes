<template>
  <div class="board-detail">
    <div class="board-actions" v-if="board">
      <h1>{{ board.title }}</h1>
      <div class="action-buttons" v-if="isAuthor">
        <el-button type="primary" @click="handleEdit">Edit</el-button>
        <el-button type="danger" @click="handleDelete">Delete</el-button>
      </div>
    </div>

    <el-card v-if="board" class="board-content">
      <template #header>
        <div class="board-meta">
          <span>Author: {{ board.authorUsername }}</span>
          <span>Views: {{ board.viewCount }}</span>
          <span>Created: {{ new Date(board.createdAt).toLocaleString() }}</span>
        </div>
      </template>
      <div v-if="isEditing">
        <el-form :model="editForm" @submit.prevent="handleUpdate">
          <el-form-item label="Title">
            <el-input v-model="editForm.title" />
          </el-form-item>
          <el-form-item label="Content">
            <el-input v-model="editForm.content" type="textarea" rows="6" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">Save</el-button>
            <el-button @click="isEditing = false">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else class="content">
        {{ board.content }}
      </div>
    </el-card>

    <el-empty v-else description="Board not found" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBoardStore } from '@/stores/board';
import { useAuthStore } from '@/stores/auth';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Board } from '@/types';

const route = useRoute();
const router = useRouter();
const boardStore = useBoardStore();
const authStore = useAuthStore();

const board = computed(() => boardStore.currentBoard);
const isEditing = ref(false);
const editForm = ref({
  title: '',
  content: ''
});

const isAuthor = computed(() => {
  return board.value?.authorUsername === authStore.username;
});

const fetchBoardData = async () => {
  const boardId = route.params.id as string;
  await boardStore.fetchBoard(boardId);
  if (board.value) {
    editForm.value = {
      title: board.value.title,
      content: board.value.content
    };
  }
};

const handleEdit = () => {
  isEditing.value = true;
};

const handleUpdate = async () => {
  if (!board.value) return;
  
  try {
    await boardStore.updateBoard(board.value.id, editForm.value);
    isEditing.value = false;
    ElMessage.success('Board updated successfully');
    await fetchBoardData();
  } catch (error) {
    ElMessage.error('Failed to update board');
  }
};

const handleDelete = async () => {
  if (!board.value) return;

  try {
    await ElMessageBox.confirm(
      'Are you sure you want to delete this board?',
      'Warning',
      {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    );

    await boardStore.deleteBoard(board.value.id);
    ElMessage.success('Board deleted successfully');
    router.push('/boards');
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Failed to delete board');
    }
  }
};

onMounted(fetchBoardData);
</script>

<style scoped>
.board-detail {
  max-width: 800px;
  margin: 0 auto;
}

.board-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.board-meta {
  display: flex;
  gap: 20px;
  color: #666;
}

.board-content {
  margin-bottom: 20px;
}

.content {
  white-space: pre-wrap;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 10px;
}
</style> 