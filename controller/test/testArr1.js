let arr = [
    {
      username: 'jane',
      matches: [ 'alex1999', 'ulrikke', 'janni' ],
      likes: [ 'bob-builder'],
      dislikes: [],
      likedBy: [],
      dislikedBy: []
    },
    {
      username: 'bob-builder',
      matches: [],
      likes: [],
      dislikes: [],
      likedBy: [
        'olegåriskole', 'willy',
        'caro24',       'ulrikke',
        'alex1999',     'lisbeth',
        'texaslove',    'lone',
        'jane',         'guffe',
        'john',         'julie'
      ],
      dislikedBy: [ 'jose', 'helle', 'egonolsen', 'jonas', 'rra' ]
    }
];

module.exports = arr;
