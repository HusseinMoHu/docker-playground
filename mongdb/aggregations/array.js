db.friends.find().pretty()

// Group friends by age, and merge the hobbies for the same age
db.friends.aggregate([
  { $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } } }
]).pretty()

// unwind stage
// unwind a friend-document to multi-document by his hobbies-array
// convert hobbies-array to be string, every string in a new document
db.friends.aggregate([
  { $unwind: "$hobbies" },
]).pretty()

// unwind + group
// $push allows duplicate values
db.friends.aggregate([
  { $unwind: "$hobbies" },
  { $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } } }
]).pretty()

// unwind + group
// $addToSet removes duplicate values
db.friends.aggregate([
  { $unwind: "$hobbies" },
  { $group: { _id: { age: "$age" }, allHobbies: { $addToSet: "$hobbies" } } }
]).pretty()

// project-stage to slice an array by first exam
db.friends.aggregate([
  { $project: { _id: 0, name:1, examScore: { $slice: ["$examScores", 1] } } }
]).pretty()

// project-stage to slice an array by last two exam
db.friends.aggregate([
  { $project: { _id: 0, name:1, examScore: { $slice: ["$examScores", -2] } } }
]).pretty()

// array length
db.friends.aggregate([
  { $project: { _id: 0, name: 1, numExams: { $size: "$examScores" } } }
]).pretty()

// array filter - examScore > 60 --> Result array
db.friends.aggregate([
  { $project: {
    _id: 0,
    name: 1,
    scores: {
      $filter: { 
        input: "$examScores",
        as: "examScore",
        cond: { $gt: ["$$examScore.score", 60] }
      }
    }
  }
}
]).pretty()

// array filter - examScore > 60 --> Result individual value
db.friends.aggregate([
  { $project: {
    _id: 0,
    name: 1,
    scores: {
      $filter: { 
        input: "$examScores.score",
        as: "examScore",
        cond: { $gt: ["$$examScore", 60] }
      }
    }
  }
}
]).pretty()

// array filter - max examScore --> Result array
db.friends.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      maxScore: {
        $filter: {
          input: "$examScores",
          as: "examScore",
          cond: { $eq: ["$$examScore.score", { $max: "$examScores.score" }] }
        }
      }
  }
}
]).pretty()

// array filter - max examScore --> Result individual value
db.friends.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      maxScore: { $max: "$examScores.score" }
  }
}
]).pretty()



