import { createRouter, createWebHistory } from 'vue-router'
import RateSurvey from '../components/RateSurvey.vue';
import TeamMemberPage from '../views/TeamMemberPage.vue';
import AdminPage from '../views/AdminPage.vue';
import CreateSurvey from '../components/CreateSurvey.vue'

import SurveyResults from '../components/SurveyResults.vue';

const routes = [
    { path: '/', component: TeamMemberPage },
    { path: '/surveys/:id', component: RateSurvey },
    { path: '/admin', component: AdminPage },
    { path: '/admin/create-survey', component: CreateSurvey },

    { path: "/admin/surveys/:id/results", name: "SurveyResults", component: SurveyResults },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
