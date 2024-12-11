<template>
  <div class="not-found">
    <el-result
      icon="warning"
      title="404"
      sub-title="Sorry, the page you visited does not exist."
    >
      <template #extra>
        <el-button type="primary" @click="router.push('/')">Back Home</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
}
</style> 