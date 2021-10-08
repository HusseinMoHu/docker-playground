// bucket stage
db.persons.aggregate([
    {
      $bucket: {
        groupBy: "$dob.age",
        boundaries: [18, 30, 40, 50, 60, 120], // 18-29, 30-39, 40-49, 50-59, 60-139
        default: "other", // out of above boundaries
        output: {
          numPersons: { $sum: 1 },
          averageAge: { $avg: "$dob.age" },
        }
      }
    }
]).pretty();

db.persons.aggregate([
  {
    $bucket: {
      groupBy: "$dob.age",
      boundaries: [18, 35, 40], // 18-34, 35-39
      default: "other", // out of 18-34, 35-39
      output: {
        numPersons: { $sum: 1 },
        averageAge: { $avg: "$dob.age" },
      }
    }
  }
]).pretty();

// bucketAuto stage
db.persons.aggregate([
  {
    $bucketAuto: {
      groupBy: '$dob.age',
      buckets: 10, // number of buckets
      output: {
        numPersons: { $sum: 1 },
        averageAge: { $avg: '$dob.age' }
      }
    }
  }
]).pretty();

