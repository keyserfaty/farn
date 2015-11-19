'use strict';

angular.module('activity.controller', [])
.controller('ActivityCtrl', ['api', '$scope', function (api, $scope) {
  api.places().getList()
  .then(function (places) {
    // TODO: should bring place name
    $scope.places = places;


    // TODO: non working yet
    $scope.addPlace = function (name, description, geotag, tag, featured) {
      let newPlace = {
        name: name,
        description: description,
        geotag: geotag,
        tag: tag,
        featured: false
      };

      // POST to '/'
      api.places().post(newPlace);
    };

    $scope.addLike = function (postID) {
      let 
        postsList = places.posts,
        postIndex = postList.indexOf(postsList.postID);

      if (postIndex !== -1) {
        postList[postIndex].likes.number++;
      }
      // should work
      postsList.put();
    };

  });

  $scope.posts = [
    {
      place: 'Mirador Laguna de los coipos',
      date: 'November 15, 2015',
      thumb: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
      fullimage: 'img/ionic.png',
      description: 'Hoy pasé por el mirador y vi que había basura en los alrededores.',
      likes: 12,
      comments: 12,
      type: 'assertive',
      tag: 'Aviso'
    },
    {
      place: 'Playa Río de la Plata',
      date: 'November 15, 2015',
      thumb: 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg',
      fullimage: 'img/ionic.png',
      description: 'Hermosa la playa!',
      likes: 12,
      comments: 12,
      type: 'balanced',
      tag: 'Contribución'
    },
        {
      place: 'Mirador al Río de la Plata',
      date: 'November 15, 2015',
      thumb: 'https://s3.amazonaws.com/uifaces/faces/twitter/peterme/128.jpg',
      fullimage: 'img/ionic.png',
      description: 'Hoy fuimos al mirador y estaba cerrado.',
      likes: 12,
      comments: 12,
      type: 'assertive',
      tag: 'Aviso'
    }
  ];
}]);