<template>
  <el-config-provider>
    <div class="app">
      <el-container v-if="authStore.isAuthenticated()">
        <el-header>
          <nav-bar />
        </el-header>
        <el-main>
          <router-view />
          <tutorial-popover v-if="tutorialStore.isActive" />
        </el-main>
      </el-container>
      <router-view v-else />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useTutorialStore } from '@/stores/tutorial';
import NavBar from '@/components/common/NavBar.vue';
import TutorialPopover from '@/components/tutorial/TutorialPopover.vue';

const authStore = useAuthStore();
const tutorialStore = useTutorialStore();
</script>

<style>
.app {
  min-height: 100vh;
}

.el-header {
  padding: 0;
  height: auto;
}

.el-main {
  padding: 20px;
  background-color: #f5f7fa;
}
</style> 