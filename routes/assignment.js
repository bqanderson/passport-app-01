var router = require('express').Router();

var Assignment = require('../models/assignment');

router.post('/createAssignment', function(request, response){
  console.log('Creating assignment');
  var data = request.body;

  var createAssignment = new Assignment({
    assignmentNumber: data.assignmentNumber,
    studentName: data.studentName,
    score: data.score,
    dateCompleted: new Date()
  });

  createAssignment.save(function(err){
    if(err){
      console.log('Save err', err);
    };
  })

  response.sendStatus(200);
});

router.get('/getAssignments/id/:id?', function(request, response){
  if(request.params.id){
    Assignment.findById(request.params.id, function(err, assignments){
      if(err){
        console.log(err);
        response.sendStatus(500);
      } else {
        response.send(assignments)
      }
    })
  } else {
    Assignment.find({}, function(err, assignments){
      if(err){
        console.log(err);
        response.sendStatus(500);
      } else {
        response.send(assignments)
      }
    })
  }

})

router.get('/getAssignments/name/:name?', function(request, response){
  if(request.params.name){

    Assignment.find({studentName: request.params.name}, function(err, assignments){
      if(err){
        console.log(err);
        response.sendStatus(500);
      } else {
        response.send(assignments)
      }
    })
  } else {
    Assignment.find({}, function(err, assignments){
      if(err){
        console.log('In name', err);
        response.sendStatus(500);
      } else {
        response.send(assignments)
      }
    })
  }

})

router.delete('/deleteAssignment/:id', function(request, response){
  var id = request.params.id;

  Assignment.findById(id, function(err, assignment){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {

      assignment.remove(function(err){
        if(err){
          console.log(err);
        }
      })

      console.log('User deleted');
      response.sendStatus(200);
    }
  })
});

router.put('/updateAssignment/:id', function(request, response){
  var id = request.params.id;
  var data = request.body;

  Assignment.findById(id, function(err, assignment){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var studentName = data.studentName;
      var assignmentNumber = data.assignmentNumber;
      var score = data.score;
      if(studentName){
        assignment.studentName = studentName;
      }
      if(assignmentNumber){
        assignment.assignmentNumber = assignmentNumber;
      }
      if(score){
        assignment.score = score;
      }
      console.log('Updating assignment', assignment);
      assignment.save(function(err){
        if(err){
          console.log(err);
        }
      })
      console.log('Assignment updated');
      response.sendStatus(200);
    }
  })
});


module.exports = router;
