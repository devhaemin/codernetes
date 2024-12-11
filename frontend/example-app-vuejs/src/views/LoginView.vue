<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2>Login</h2>
      <el-form :model="form" @submit.prevent="handleSubmit">
        <el-form-item label="Email">
          <el-input v-model="form.email" type="email" required />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" type="password" required />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading">
            Login
          </el-button>
        </el-form-item>
      </el-form>
      <div class="register-link">
        Don't have an account? <router-link to="/register">Register</router-link>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ElMessage } from 'element-plus';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  email: '',
  password: ''
});

const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  try {
    const success = await authStore.login(form.value);
    if (success) {
      ElMessage.success('Login successful');
      router.push('/boards');
    } else {
      ElMessage.error('Login failed');
    }
  } catch (error) {
    ElMessage.error('An error occurred');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.register-link {
  margin-top: 16px;
  text-align: center;
}
</style> 