import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface TutorialStep {
  key: string;
  title: string;
  content: string;
  target?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

export const useTutorialStore = defineStore('tutorial', () => {
  const currentStep = ref<number>(0);
  const isActive = ref<boolean>(false);
  const completedTutorials = ref<Set<string>>(new Set());

  const tutorialSteps: TutorialStep[] = [
    {
      key: 'board-list',
      title: 'Board List',
      content: 'Here you can see all the boards created by users.',
      target: '.board-list',
      placement: 'top'
    },
    {
      key: 'create-board',
      title: 'Create Board',
      content: 'Click here to create a new board.',
      target: '.create-board-btn',
      placement: 'left'
    },
    {
      key: 'board-actions',
      title: 'Board Actions',
      content: 'You can edit or delete your own boards here.',
      target: '.action-buttons',
      placement: 'bottom'
    }
  ];

  const startTutorial = () => {
    currentStep.value = 0;
    isActive.value = true;
  };

  const nextStep = () => {
    if (currentStep.value < tutorialSteps.length - 1) {
      currentStep.value++;
    } else {
      completeTutorial();
    }
  };

  const prevStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--;
    }
  };

  const completeTutorial = () => {
    isActive.value = false;
    completedTutorials.value.add('main-tutorial');
  };

  return {
    currentStep,
    isActive,
    completedTutorials,
    tutorialSteps,
    startTutorial,
    nextStep,
    prevStep,
    completeTutorial
  };
}); 