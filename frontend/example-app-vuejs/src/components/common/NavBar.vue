<template>
  <el-menu mode="horizontal" router>
    <el-menu-item index="/boards">
      <el-icon><Document /></el-icon>
      Boards
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="/profile">
      <el-dropdown trigger="click">
        <span class="user-menu">
          {{ authStore.username }}
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">
              Logout
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { Document, ArrowDown } from '@element-plus/icons-vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}
</style> 