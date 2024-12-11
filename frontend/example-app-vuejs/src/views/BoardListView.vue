<template>
  <div class="board-list">
    <div class="board-header">
      <h1>Boards</h1>
      <el-button type="primary" @click="router.push('/boards/create')">
        Create Board
      </el-button>
    </div>

    <el-table :data="boardStore.boards" v-loading="loading">
      <el-table-column prop="title" label="Title">
        <template #default="{ row }">
          <router-link :to="`/boards/${row.id}`">{{ row.title }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="authorUsername" label="Author" />
      <el-table-column prop="viewCount" label="Views" width="100" />
      <el-table-column prop="createdAt" label="Created At" width="180">
        <template #default="{ row }">
          {{ new Date(row.createdAt).toLocaleString() }}
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="10"
        :total="totalItems"
        layout="prev, pager, next"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBoardStore } from '@/stores/board';
import { ElMessage } from 'element-plus';

const router = useRouter();
const boardStore = useBoardStore();

const loading = ref(false);
const currentPage = ref(1);
const totalItems = ref(0);

const fetchBoards = async (page: number) => {
  loading.value = true;
  try {
    const response = await boardStore.fetchBoards(page - 1);
    if (response) {
      totalItems.value = response.totalElements;
    }
  } catch (error) {
    ElMessage.error('Failed to fetch boards');
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (page: number) => {
  fetchBoards(page);
};

onMounted(() => {
  fetchBoards(1);
});
</script>

<style scoped>
.board-list {
  padding: 20px;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style> 