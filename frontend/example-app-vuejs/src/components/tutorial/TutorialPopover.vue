<template>
  <el-popover
    v-model:visible="tutorialStore.isActive"
    :placement="currentStep.placement || 'bottom'"
    :width="300"
    trigger="manual"
    popper-class="tutorial-popover"
  >
    <template #reference>
      <div :class="currentStep.target?.substring(1)"></div>
    </template>
    
    <div class="tutorial-content">
      <h3>{{ currentStep.title }}</h3>
      <p>{{ currentStep.content }}</p>
      <div class="tutorial-actions">
        <el-button
          size="small"
          @click="tutorialStore.prevStep"
          :disabled="tutorialStore.currentStep === 0"
        >
          Previous
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="tutorialStore.nextStep"
        >
          {{ isLastStep ? 'Finish' : 'Next' }}
        </el-button>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTutorialStore } from '@/stores/tutorial';

const tutorialStore = useTutorialStore();

const currentStep = computed(() => 
  tutorialStore.tutorialSteps[tutorialStore.currentStep]
);

const isLastStep = computed(() => 
  tutorialStore.currentStep === tutorialStore.tutorialSteps.length - 1
);
</script>

<style>
.tutorial-popover {
  padding: 16px;
}

.tutorial-content h3 {
  margin-top: 0;
  margin-bottom: 8px;
}

.tutorial-content p {
  margin-bottom: 16px;
}

.tutorial-actions {
  display: flex;
  justify-content: space-between;
}
</style> 