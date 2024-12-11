<template>
  <div class="board-create">
    <h1>Create New Board</h1>
    <el-card>
      <el-form :model="form" @submit.prevent="handleSubmit">
        <el-form-item label="Title" required>
          <el-input v-model="form.title" placeholder="Enter title" />
        </el-form-item>
        <el-form-item label="Content" required>
          <el-input
            v-model="form.content"
            type="textarea"
            rows="10"
            placeholder="Enter content"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading">
            Create
          </el-button>
          <el-button @click="router.push('/boards')">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBoardStore } from '@/stores/board';
import { ElMessage } from 'element-plus';

const router = useRouter();
const boardStore = useBoardStore();

const form = ref({
  title: '',
  content: ''
});

const loading = ref(false);

const handleSubmit = async () => {
  if (!form.value.title.trim() || !form.value.content.trim()) {
    ElMessage.warning('Please fill in all required fields');
    return;
  }

  loading.value = true;
  try {
    const result = await boardStore.createBoard(form.value);
    if (result) {
      ElMessage.success('Board created successfully');
      router.push(`/boards/${result.id}`);
    } else {
      throw new Error('Failed to create board');
    }
  } catch (error) {
    ElMessage.error('Failed to create board');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.board-create {
  max-width: 800px;
  margin: 0 auto;
}
</style> 