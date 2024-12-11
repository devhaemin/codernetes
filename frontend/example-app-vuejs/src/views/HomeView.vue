<template>
  <div class="home">
    <el-card class="welcome-card">
      <h1>Welcome to Example Board App</h1>
      <p>A simple board application with the following features:</p>
      <ul>
        <li>Create and manage boards</li>
        <li>Comment on boards</li>
        <li>Like and share functionality</li>
        <li>Interactive tutorials</li>
      </ul>
      
      <div class="action-buttons">
        <el-button
          v-if="!tutorialCompleted"
          type="primary"
          @click="startTutorial"
        >
          Start Tutorial
        </el-button>
        <el-button type="success" @click="router.push('/boards')">
          Go to Boards
        </el-button>
      </div>
    </el-card>

    <tutorial-popover v-if="tutorialStore.isActive" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTutorialStore } from '@/stores/tutorial';
import TutorialPopover from '@/components/tutorial/TutorialPopover.vue';

const router = useRouter();
const tutorialStore = useTutorialStore();

const tutorialCompleted = computed(() => 
  tutorialStore.completedTutorials.has('main-tutorial')
);

const startTutorial = () => {
  tutorialStore.startTutorial();
  router.push('/boards');
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  padding: 20px;
}

.welcome-card {
  max-width: 600px;
  width: 100%;
}

.welcome-card h1 {
  margin-bottom: 20px;
}

.welcome-card ul {
  margin-bottom: 30px;
}

.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}
</style> 