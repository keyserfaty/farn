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
      user: 'Hola',
      date: 'November 15, 2015',
      thumb: 'img/ionic.png',
      fullimage: 'img/ionic.png',
      description: 'description',
      likes: 12,
      comments: 12
    },
    {
      user: '2do post',
      date: 'November 15, 2015',
      thumb: 'img/ionic.png',
      fullimage: 'img/ionic.png',
      description: 'description',
      likes: 12,
      comments: 12
    },
        {
      user: '2do post',
      date: 'November 15, 2015',
      thumb: 'img/ionic.png',
      fullimage: 'img/ionic.png',
      description: 'description',
      likes: 12,
      comments: 12
    }
  ];
}]);