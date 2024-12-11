<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2>Register</h2>
      <el-form :model="form" @submit.prevent="handleSubmit">
        <el-form-item label="Email">
          <el-input v-model="form.email" type="email" required />
        </el-form-item>
        <el-form-item label="Username">
          <el-input v-model="form.username" required />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" type="password" required />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading">
            Register
          </el-button>
        </el-form-item>
      </el-form>
      <div class="login-link">
        Already have an account? <router-link to="/login">Login</router-link>
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
  username: '',
  password: ''
});

const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  try {
    const success = await authStore.register(form.value);
    if (success) {
      ElMessage.success('Registration successful');
      router.push('/login');
    } else {
      ElMessage.error('Registration failed');
    }
  } catch (error) {
    ElMessage.error('An error occurred');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.register-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.login-link {
  margin-top: 16px;
  text-align: center;
}
</style> 