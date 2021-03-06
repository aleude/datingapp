let arr = [
    {
      username: 'jane',
      matches: [ 'alex1999', 'ulrikke', 'janni' ],
      likes: [ 'bob-builder', 'alex1999', 'jose', 'ulrikke', 'janni' ],
      dislikes: [],
      likedBy: [
        'john',      'boss2000',
        'helle',     'olegåriskole',
        'willy',     'egonolsen',
        'caro24',    'ulrikke',
        'alex1999',  'lisbeth',
        'texaslove', 'lone',
        'guffe',     'rra',
        'julie',     'jes',
        'janni'
      ],
      dislikedBy: [ 'jose', 'jonas' ]
    },
    {
      username: 'john',
      matches: [ 'willy', 'lisbeth', 'egonolsen', 'alex1999' ],
      likes: [
        'jane',
        'willy',
        'lisbeth',
        'egonolsen',
        'memo',
        'boss2000',
        'bob-builder',
        'alex1999'
      ],
      dislikes: [],
      likedBy: [
        'helle',     'willy',
        'egonolsen', 'caro24',
        'ulrikke',   'alex1999',
        'lisbeth',   'texaslove',
        'lone',      'jonas',
        'guffe',     'julie',
        'jes'
      ],
      dislikedBy: [ 'olegåriskole' ]
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
    },
    {
      username: 'boss2000',
      matches: [],
      likes: [ 'jane' ],
      dislikes: [],
      likedBy: [
        'jose',      'helle',
        'willy',     'egonolsen',
        'caro24',    'ulrikke',
        'alex1999',  'lisbeth',
        'texaslove', 'lone',
        'jonas',     'guffe',
        'john',      'julie'
      ],
      dislikedBy: [ 'olegåriskole' ]
    },
    {
      username: 'jose',
      matches: [],
      likes: [ 'boss2000' ],
      dislikes: [ 'bob-builder', 'jane' ],
      likedBy: [
        'helle',     'olegåriskole',
        'willy',     'egonolsen',
        'caro24',    'ulrikke',
        'alex1999',  'lisbeth',
        'texaslove', 'lone',
        'jane',      'guffe',
        'julie'
      ],
      dislikedBy: [ 'jonas', 'rra' ]
    },
    {
      username: 'helle',
      matches: [],
      likes: [ 'jane', 'jose', 'boss2000', 'john' ],
      dislikes: [ 'bob-builder' ],
      likedBy: [
        'olegåriskole',
        'caro24',
        'ulrikke',
        'alex1999',
        'lisbeth',
        'texaslove',
        'lone',
        'julie'
      ],
      dislikedBy: [ 'willy', 'egonolsen', 'wolfi', 'jonas', 'guffe', 'rra' ]
    },
    {
      username: 'olegåriskole',
      matches: [],
      likes: [ 'jose', 'bob-builder', 'helle', 'jane' ],
      dislikes: [ 'john', 'boss2000' ],
      likedBy: [
        'willy',     'egonolsen',
        'caro24',    'ulrikke',
        'alex1999',  'lisbeth',
        'texaslove', 'wolfi',
        'lone',      'guffe',
        'rra',       'julie'
      ],
      dislikedBy: [ 'jonas' ]
    },
    {
      username: 'willy',
      matches: [ 'john' ],
      likes: [
        'john',
        'olegåriskole',
        'boss2000',
        'jane',
        'bob-builder',
        'jose'
      ],
      dislikes: [ 'helle' ],
      likedBy: [
        'caro24',    'ulrikke',
        'alex1999',  'lisbeth',
        'texaslove', 'lone',
        'john',      'guffe',
        'julie'
      ],
      dislikedBy: [ 'egonolsen', 'jonas', 'rra' ]
    },
    {
      username: 'egonolsen',
      matches: [ 'john' ],
      likes: [ 'john', 'boss2000', 'olegåriskole', 'jose', 'jane' ],
      dislikes: [ 'willy', 'helle', 'bob-builder' ],
      likedBy: [
        'caro24',    'ulrikke',
        'alex1999',  'lisbeth',
        'texaslove', 'lone',
        'rra',       'john',
        'julie'
      ],
      dislikedBy: [ 'jonas', 'guffe' ]
    },
    {
      username: 'caro24',
      matches: [],
      likes: [
        'willy',
        'john',
        'boss2000',
        'olegåriskole',
        'egonolsen',
        'jose',
        'helle',
        'jane',
        'bob-builder'
      ],
      dislikes: [],
      likedBy: [ 'ulrikke', 'alex1999', 'lisbeth', 'texaslove', 'lone', 'julie' ],
      dislikedBy: [ 'wolfi', 'jonas', 'guffe' ]
    },
    {
      username: 'ulrikke',
      matches: [ 'jane' ],
      likes: [
        'john',         'caro24',
        'boss2000',     'willy',
        'bob-builder',  'jane',
        'olegåriskole', 'egonolsen',
        'helle',        'jose'
      ],
      dislikes: [],
      likedBy: [ 'alex1999', 'lisbeth', 'texaslove', 'lone', 'jane', 'julie' ],
      dislikedBy: [ 'wolfi', 'jonas', 'guffe' ]
    },
    {
      username: 'alex1999',
      matches: [ 'jane', 'john' ],
      likes: [
        'egonolsen',   'john',
        'helle',       'willy',
        'ulrikke',     'caro24',
        'jose',        'jane',
        'boss2000',    'olegåriskole',
        'bob-builder'
      ],
      dislikes: [],
      likedBy: [
        'lisbeth', 'texaslove',
        'lone',    'jane',
        'jonas',   'guffe',
        'john',    'julie'
      ],
      dislikedBy: []
    },
    {
      username: 'lisbeth',
      matches: [ 'john' ],
      likes: [
        'bob-builder',  'jane',
        'john',         'alex1999',
        'egonolsen',    'helle',
        'boss2000',     'jose',
        'willy',        'ulrikke',
        'olegåriskole', 'caro24'
      ],
      dislikes: [],
      likedBy: [ 'texaslove', 'wolfi', 'lone', 'john', 'julie' ],
      dislikedBy: [ 'jonas', 'guffe', 'rra' ]
    },
    {
      username: 'texaslove',
      matches: [],
      likes: [
        'ulrikke',     'lisbeth',
        'jose',        'jane',
        'bob-builder', 'john',
        'caro24',      'boss2000',
        'helle',       'egonolsen',
        'alex1999',    'olegåriskole',
        'willy'
      ],
      dislikes: [],
      likedBy: [ 'lone', 'julie' ],
      dislikedBy: [ 'jonas', 'guffe', 'rra' ]
    },
    {
      username: 'wolfi',
      matches: [],
      likes: [ 'lisbeth', 'olegåriskole' ],
      dislikes: [ 'ulrikke', 'helle', 'caro24' ],
      likedBy: [
        'lone',   'rra',
        'yarsan', 'jonas',
        'guffe',  'julie',
        'jes'
      ],
      dislikedBy: []
    },
    {
      username: 'lone',
      matches: [],
      likes: [
        'boss2000', 'bob-builder',
        'alex1999', 'texaslove',
        'caro24',   'ulrikke',
        'john',     'willy',
        'jose',     'olegåriskole',
        'helle',    'egonolsen',
        'wolfi',    'lisbeth',
        'jane'
      ],
      dislikes: [],
      likedBy: [ 'guffe', 'rra', 'julie' ],
      dislikedBy: [ 'jonas' ]
    },
    {
      username: 'rra',
      matches: [ 'jonas', 'yarsan' ],
      likes: [
        'wolfi',
        'jonas',
        'olegåriskole',
        'jane',
        'yarsan',
        'lone',
        'egonolsen'
      ],
      dislikes: [ 'willy', 'jose', 'bob-builder', 'lisbeth', 'helle', 'texaslove' ],
      likedBy: [ 'yarsan', 'jonas', 'julie' ],
      dislikedBy: []
    },
    {
      username: 'yarsan',
      matches: [ 'rra' ],
      likes: [ 'wolfi', 'rra' ],
      dislikes: [],
      likedBy: [ 'jonas', 'guffe', 'rra', 'julie' ],
      dislikedBy: []
    },
    {
      username: 'jonas',
      matches: [ 'rra' ],
      likes: [ 'alex1999', 'rra', 'boss2000', 'john', 'yarsan', 'wolfi' ],
      dislikes: [
        'caro24',      'olegåriskole',
        'jane',        'jose',
        'willy',       'lone',
        'egonolsen',   'ulrikke',
        'lisbeth',     'texaslove',
        'bob-builder', 'helle'
      ],
      likedBy: [ 'guffe', 'rra', 'soren', 'julie', 'jes' ],
      dislikedBy: []
    },
    {
      username: 'guffe',
      matches: [],
      likes: [
        'jonas',    'yarsan',
        'alex1999', 'willy',
        'lone',     'john',
        'boss2000', 'olegåriskole',
        'jose',     'wolfi',
        'jane',     'bob-builder'
      ],
      dislikes: [
        'ulrikke',
        'texaslove',
        'egonolsen',
        'lisbeth',
        'helle',
        'caro24'
      ],
      likedBy: [ 'julie', 'jes' ],
      dislikedBy: []
    },
    {
      username: 'memo',
      matches: [],
      likes: [],
      dislikes: [],
      likedBy: [ 'john', 'julie', 'jes' ],
      dislikedBy: []
    },
    {
      username: 'sanne',
      matches: [],
      likes: [],
      dislikes: [],
      likedBy: [ 'julie' ],
      dislikedBy: []
    },
    {
      username: 'mulle',
      matches: [],
      likes: [],
      dislikes: [],
      likedBy: [ 'julie' ],
      dislikedBy: []
    },
    {
      username: 'soren',
      matches: [],
      likes: [ 'jonas' ],
      dislikes: [],
      likedBy: [ 'julie' ],
      dislikedBy: []
    },
    {
      username: 'julie',
      matches: [],
      likes: [
        'ulrikke',     'helle',
        'texaslove',   'memo',
        'jonas',       'egonolsen',
        'guffe',       'boss2000',
        'caro24',      'yarsan',
        'jose',        'olegåriskole',
        'sanne',       'john',
        'bob-builder', 'wolfi',
        'jane',        'lone',
        'rra',         'lisbeth',
        'alex1999',    'mulle',
        'willy',       'soren'
      ],
      dislikes: [],
      likedBy: [],
      dislikedBy: []
    },
    {
      username: 'jes',
      matches: [],
      likes: [ 'john', 'wolfi', 'memo', 'jonas', 'guffe', 'jane' ],
      dislikes: [],
      likedBy: [],
      dislikedBy: []
    },
    {
      username: 'janni',
      matches: [ 'jane' ],
      likes: [ 'jane' ],
      dislikes: [],
      likedBy: [ 'jane' ],
      dislikedBy: []
    }
];

module.exports = arr;
