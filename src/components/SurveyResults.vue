<template>
  <div class="container mx-auto p-4">
    <h1 class="mt-4 text-3xl font-bold text-center mb-8">{{ survey.name }}</h1>
    <div
      v-for="(question, index) in survey.questions"
      :key="question.id"
      class="mb-12 bg-white p-4 shadow rounded-lg"
    >
      <h2 class="text-lg font-semibold text-gray-800 mb-2">
        Question {{ index + 1 }}: {{ question.questionText }}
      </h2>
      <canvas
        :id="'chart-' + question.id"
        class="w-full h-48 mx-auto"
      ></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "SurveyResults",
  data() {
    return {
      survey: {
        name: "",
        questions: [],
      },
    };
  },
  methods: {
    async fetchSurvey() {
      try {
        const surveyId = this.$route.params.id;
        const response = await fetch(
          `http://localhost:8081/api/surveys/${surveyId}/results`
        );
        this.survey = await response.json();
        this.$nextTick(() => {
          this.drawCharts();
        });
      } catch (error) {
        console.error("Error fetching survey data:", error);
      }
    },
   drawCharts() {
  this.survey.questions.forEach((question) => {
    const canvas = document.getElementById(`chart-${question.id}`);
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const ratings = question.ratings.map((r) => r.rating);
      const ratingCounts = Array(5).fill(0);

      ratings.forEach((rating) => {
        if (rating >= 1 && rating <= 5) {
          ratingCounts[rating - 1]++;
        }
      });

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "1 (Strongly Disagree)",
            "2",
            "3",
            "4",
            "5 (Strongly Agree)",
          ],
          datasets: [
            {
              label: "Responses",
              data: ratingCounts,
              backgroundColor: [
                "#FFCDD2",
                "#F8BBD0",
                "#E1BEE7",
                "#D1C4E9",
                "#C5CAE9",
              ],
              borderColor: "#3f51b5",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,  
                min: 0,      
                max: Math.max(...ratingCounts) || 1,  
              },
            },
          },
        },
      });
    }
  });
}

  },
  async mounted() {
    await this.fetchSurvey();
  },
};
</script>

<style>
.container {
  max-width: 800px;
}

canvas {
  max-height: 200px;
}

.bg-white {
  background-color: #ffffff;
}

.shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.5rem;
}
</style>
