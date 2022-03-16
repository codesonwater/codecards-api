const { connectDb } = require('./dbConnect')

exports.createUser = (req, res) => {
  // first, let's do some validation... (email, password)
  if (!req.body || !req.body.email || !req.body.password) {
    // invalid request
    res.status(400).send({
      success: false,
      message: 'Invalid request',
    })
    return
  }
  const newUser = {
    email: req.body.email.toLowerCase(),
    password: req.body.password,
    asAdmin: false,
    userRole: 5,
  };

  const db = connectDb();
  db.collection("users").add(newUser)
    //TODO create a JWT and send back token
    .then((doc) => {
      const user = { //this will become the payload for our JWT
        id: doc.id,
        email: newUser.email,
        isAdmin: false,
        userRole: 5,
      }
      res.status(201).send({
      success: true,
      message: 'Account created',
      token: user, //add this token later
      })
    })
    .catch(err => res.status(500).send({
      success: false,
      message: err.message,
      error: err
  }))
}

exports.loginUser = (req, res) => {
  // first, let's do some validation... (email, password)
  if (!req.body || !req.body.email || !req.body.password) {
    // invalid request
    res.status(400).send({
      success: false,
      message: 'Invalid request',
    })
    return
  }
  const db = connectDb()
  db.collection('users')
  .where('email', '==', req.body.email.toLowerCase())
  .where('password','==', req.body.password)
  .get()
  .then(snapshot => {
    if(snapshot.empty){
      res.status(401).send({
        success: false,
        message: 'Invalid email or password',
      }) //leave this as username OR password bc hackers shouldn't know which one
      return
    }
    // good login
    const users = snapshot.docs.map(doc => {
      let user = doc.data()
      user.id = doc.id
      user.password = undefined
      return user
    })
    res.send({
      success: true,
      message: 'Login successful',
      token: users[0]
  })
  })
  .catch(err => res.status(500).send({
    success: false,
    message: err.message,
    error: err
}))
}

exports.getUsers = (req, res) => { //TODO Protect this route with JWT
  const db = connectDb()
  db.collection('users').get()
  .then(snapshot =>{
    const users = snapshot.docs.map(doc => {
      let user = doc.data()
      user.id = doc.id
      user.password = undefined
      return user
    })
    res.send({
      success: true,
      message: 'User returned',
      users  // this is equivalent to user: users
    })

  })
  .catch(err => res.status(500).send({
    success: false,
    message: err.message,
    error: err
  }))
}