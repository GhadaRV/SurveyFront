<template>
  <tr class="border-b hover:bg-gray-50">
    <td class="py-2 px-4 text-gray-800">{{ survey.name }}</td>
    <td class="py-2 px-4 text-gray-600">{{ survey.questions.length }}</td>
    <td class="py-2 px-4">
      <button
        v-if="isAdmin"
        @click="goToShowResults"
        class="py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600">
        Show Results
      </button>
      <button
        v-else
        @click="goToRateSurvey"
        class="py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600">
        Rate Survey
      </button>
    </td>
  </tr>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

defineOptions({
  name: 'SurveyItem'
});

const router = useRouter();
const route = useRoute();

const props = defineProps({
  survey: {
    type: Object,
    required: true
  }
});

const isAdmin = route.path.startsWith('/admin');

const goToRateSurvey = () => {
  router.push({ path: `/surveys/${props.survey.id}` });
};

const goToShowResults = () => {
  router.push({ path: `/admin/surveys/${props.survey.id}/results` });
};
</script>
