// Group
db.persons.aggregate([
  { $match: { gender: "female" } },
  { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
  { $sort: { totalPersons: -1 } }
]).pretty();

// Project
db.persons.aggregate([{
  $project: {
    _id: 0,
    gender: 1,
    fullName: { $concat: ["$name.first", " ", "$name.last"] } }
}]).pretty();

db.persons.aggregate([{
  $project: {
    _id: 0,
    gender: 1,
    fullName: { $concat: [{ $toUpper: "$name.first" }, " ", { $toUpper: "$name.last" }] } }
}]).pretty();

db.persons.aggregate([
  {
    $project: {
      _id: 0,
      gender: 1,
      fullName: {
        $concat: [
          { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
          {
            $substrCP: [
              '$name.first',
              1,
              { $subtract: [{ $strLenCP: '$name.first' }, 1] }
            ]
          },
          ' ',
          { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
          {
            $substrCP: [
              '$name.last',
              1,
              { $subtract: [{ $strLenCP: '$name.last' }, 1] }
            ]
          }
        ]
      }
    }
  }
]).pretty();

db.persons.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1,
      birthDate: { $convert: { input: '$dob.date', to: 'date' } },
      age: "$dob.age",
      location: {
        type: 'Point',
        coordinates: [
          {
            $convert: {
              input: '$location.coordinates.longitude',
              to: 'double',
              onError: 0.0,
              onNull: 0.0
            }
          },
          {
            $convert: {
              input: '$location.coordinates.latitude',
              to: 'double',
              onError: 0.0,
              onNull: 0.0
            }
          }
        ]
      }
    }
  },
  {
    $project: {
      gender: 1,
      email: 1,
      location: 1,
      birthDate: 1,
      age: 1,
      fullName: {
        $concat: [
          { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
          {
            $substrCP: [
              '$name.first',
              1,
              { $subtract: [{ $strLenCP: '$name.first' }, 1] }
            ]
          },
          ' ',
          { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
          {
            $substrCP: [
              '$name.last',
              1,
              { $subtract: [{ $strLenCP: '$name.last' }, 1] }
            ]
          }
        ]
      }
    }
  }
]).pretty();

db.persons.aggregate([
  {
    $project: {
      _id: 0,
      birthDate: { $convert: { input: "$dob.date", to: "date" } },
      age: "$dob.age",
    }
  }
]).pretty()

db.persons.aggregate([
  {
    $project: {
      _id: 0,
      birthDate: { $toDate: "$dob.date"},
      age: "$dob.age",
    }
  }
]).pretty()

db.persons.aggregate([
  {
    $project: { birthDate: { $convert: { input: "$dob.date", to: "date" } } }
  },
  { $group: { _id: { birthYear: { $isoWeekYear: "$birthDate" } }, numPersons: { $sum: 1 } } },
  { $sort: { numPersons: -1 } }
]).pretty()

// older 10 persons
db.persons.aggregate([
  { $project: { _id: 0, name: "$name.first", birthDate: { $toDate: "$dob.date" } } },
  { $sort: { birthDate: 1 } },
  { $limit: 10 },
]).pretty()

// older 10 men
db.persons.aggregate([
  { $match: { gender: "male" } },
  { $project: { _id: 0, name: "$name.first", birthDate: { $toDate: "$dob.date" } } },
  { $sort: { birthDate: 1 } },
  { $limit: 10 },
]).pretty()

// second older 10 persons
db.persons.aggregate([
  { $project: { _id: 0, name: "$name.first", birthDate: { $toDate: "$dob.date" } } },
  { $sort: { birthDate: 1 } },
  { $skip: 10 },
  { $limit: 10 }
]).pretty()