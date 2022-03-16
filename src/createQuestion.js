const { connectDb } = require('./dbConnect')

exports.createQuestion = (req, res) => {
    if (!req.body || !req.body.question || !req.body.answer) {
      res.status(400).send({
        success: false,
        message: "Invalid request; requires both a question & answer",
      });
      return;
    }
    const newQuestion = {
      question: req.body.question,
      answer: req.body.answer,
      isFavorite: false,
      topic: req.body.topic,
      topicSlug: req.body.topicSlug
    };
    if(req.body.options) {
      newQuestion[options] = req.body.options;
    }
  
    const db = connectDb();
    db.collection("userQuestions")
      .add(newQuestion)
      //TODO create a JWT and send back token
      .then((doc) => {
        const newQuestion = {
          id: doc.id,
          question: req.body.question,
          options: req.body.options,
          answer: req.body.answer,
          isFavorite: false,
          topic: req.body.topic,
          topicSlug: req.body.topicSlug
        };
        res.status(201).send({
          success: true,
          message: "Question added successfully",
  
        });
      })
      .catch((err) =>
        res.status(500).send({
          success: false,
          message: err.message,
          error: err,
        })
      );
  };