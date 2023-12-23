import { createCardService, getCardByIdService } from "../services/cardService.js";


export const createCard = async(req, res,next) => {
  const { taskId, checkList,time } = req.body;
   try {
    const item=req.files['file']?req.files['file']?.map((obj,i) =>(
      {
        file:obj.path,
        time:Array.isArray(time)?time[i]:time
      }
    )
    ):null
     const cardData = {
       taskId,
       checkList:JSON.parse(checkList),
       attachments:item
       
     };

     const createdCard = await createCardService(cardData);
     res.status(201).json(createdCard);
   } catch (error) {
    console.error('Error creating card:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
   }
     
}

export async function getCardById(req, res) {
  try {
    const { cardId } = req.params;
    const card = await getCardByIdService(cardId);
    if (card.length===0) {
      return res.status(404).json({ error: 'Card not found' });
    } 
    const transformedCardList = card.map((cardItem, index) => {
      return {
        title: `Checklist Block ${index + 1}`, 
        tasks: cardItem.checkList[0]?.checklist.map((task) => ({
          name: task.name,
          completed: true, 
        })) || [],
        newTask: '', // Assuming this field is not stored in the database
      };
    });
    
      res.send(transformedCardList);
    
      
  } catch (error) {
    console.error('Error getting card by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 