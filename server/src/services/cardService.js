import { Card } from "../models/card.js";


export const createCardService = async (cardData) => {
  try {
    const newCard = new Card(cardData);
    const createdCard = await newCard.save();
    return createdCard;
  } catch (error) {
    console.error('Error creating card:', error.message);
    throw error;
  }
};
export async function getCardByIdService(cardId) {
  try {
    const card = await Card.find({taskId:cardId});
    return card;
  } catch (error) {
    throw new Error(`Error fetching card by ID: ${error.message}`);
  }
}
