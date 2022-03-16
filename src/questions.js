const { connectDb } = require("./dbConnect");

exports.getQuestions = (req, res) => {
  //TODO: protetc this route w JWT
  const db = connectDb();
  db.collection("questions")
    .get()
    .then((snapshot) => {
      const questions = snapshot.docs.map((doc) => {
        let question = doc.data();
        question.id = doc.id;
        return question;
      });
      res.send({
        success: true,
        message: "Retrieved Questions Successfully",
        questions,
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

exports.getQuestionById = (req, res) => {
  const db = connectDb();
  const { id } = req.params;
  db.collection("questions")
    .doc(id)
    .get()
    .then((doc) => {
      let question = doc.data();
      res.status(200).send(question);
    })
    .catch((err) => res.status(500).send(err));
};

exports.getTopicBySlug = (req, res) => {
  const db = connectDb();
  let query = db.collection("questions");
  const { topicSlug } = req.params;

  if (topicSlug) {
    query = query.where("topicSlug", "==", topicSlug);
  }
  query
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        res.status(401).send({
          success: false,
          message: "Invalid request",
        });
        return topicSlug;
      }
      const questions = snapshot.docs.map((doc) => {
        let question = doc.data();
        question.id = doc.id;
        return question;
      });
      res.send({
        success: true,
        message: "Retrieved Questions Successfully",
        questions,
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
