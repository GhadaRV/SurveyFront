<template>
  <header class="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center shadow-xl z-10">
    <h1 class="text-2xl font-semibold tracking-tight">Survey App</h1>

    <div class="flex items-center space-x-4">
      <button 
        @click="toggleInterface" 
        :class="buttonClass"
        class="p-3 text-white rounded-full hover:opacity-80 transition duration-300 ease-in-out shadow-lg focus:outline-none">
        {{ buttonText }}
      </button>

      <button 
        v-if="isAdmin"
        @click="goToCreateSurvey"
        class="p-3 text-white rounded-full bg-purple-600 hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg focus:outline-none">
        Create Survey
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';


defineOptions({
  name: 'SurveyHeader'
});

const router = useRouter();
const route = useRoute(); 

const isAdmin = computed(() => route.path.startsWith('/admin'));

const buttonText = computed(() => {
  return isAdmin.value 
    ? 'Go to Team Member Interface' 
    : 'Go to Admin Interface';
});

const buttonClass = computed(() => {
  return isAdmin.value 
    ? 'bg-green-600 hover:bg-green-700' 
    : 'bg-blue-600 hover:bg-blue-700';   
});

const toggleInterface = () => {
  const newPath = isAdmin.value ? '/' : '/admin';
  router.push(newPath);
};

const goToCreateSurvey = () => {
  router.push('/admin/create-survey'); 
};
</script>

<style scoped>
header {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
</style>
