import axios from 'axios';

const API_URL = 'http://localhost:8081';

export const fetchSurveys = async () => {
    try {
        const response = await axios.get(`${API_URL}/surveys`);
        return response.data;
    } catch (error) {
        console.error('Error fetching surveys:', error);
        throw error;
    }
};

export const getSurveyById = async (id) => {
    const response = await axios.get(`${API_URL}/surveys/${id}`);
    return response.data;
};

export const submitRatings = async (id, ratings) => {
    await axios.post(`${API_URL}/api/surveys/${id}/rate-all`, ratings);
};

export const createSurvey = async (title) => {
    try {
        const response = await axios.post(`${API_URL}/surveys`, {
            name: title
        });
        return response.data;
    } catch (error) {
        console.error('Error creating survey:', error);
        throw error;
    }
};

export const addQuestionsToSurvey = async (surveyId, questions) => {
    try {
        await axios.post(`${API_URL}/api/surveys/${surveyId}/questions`, questions);
    } catch (error) {
        console.error('Error adding questions:', error);
        throw error;
    }
};