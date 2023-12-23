import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  taskId: {
    type: String,
  },
  attachments:[
    {
      file:{
        type:String
      },
      time:{
        type:String
      }
    }
    
  ],
  checkList:[
    {
      checklist:[
        {
          name:{
            type:String
          }
        }
      ]
    }
  ]
});

export const Card = mongoose.model("Card", CardSchema);
