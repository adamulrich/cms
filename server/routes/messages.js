var express = require('express');
var router = express.Router();
module.exports = router; 

const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/messages');
const { ObjectId } = require('mongodb');
let messages = [];

router.get('/', (req, res, next) => {
    //call the Message model find() method to get all messages in the collection
    Message.find()
    .populate("sender")
    .then(messages => {
        this.messages = messages;
        // console.log(messages);
        res.status(200).json({
            message: "messages fetched",
            messages: this.messages
        })
    })
        .catch(err => {
            res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        });
}
);


router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");

    console.log(req.body.sender);
    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        
        sender: new ObjectId(req.body.sender),
        });

    message.save()
        .then(async createdMessage => {
            const newMessage = await createdMessage.populate("sender");
            console.log(newMessage);
            res.status(201).json({
                message: 'Message added successfully',
                message: newMessage
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            message.id = maxMessageId,
            message.subject= req.body.subject,
            message.msgText= req.body.msgText,
            message.sender= req.body.sender,
            

            Message.updateOne({ id: req.params.id }, message)
                .then(result => {
                    res.status(204).json({
                        message: 'Message updated successfully'
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Message not found.',
                error: { message: 'Message not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
      .then(message => {
        Message.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Message deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Message not found.',
          error: { message: 'Message not found'}
        });
      });
  });