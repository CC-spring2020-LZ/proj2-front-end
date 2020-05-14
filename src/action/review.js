export const START_REVIEW = 'START_REVIEW';
export const MAKE_REVIEW = 'MAKE_REVIEW';

export function initReviewArray(restaurants){
    return {
        type: START_REVIEW,
        restaurants: restaurants
    }
}