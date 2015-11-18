'use strict';

angular.module('activity.controller', [])
.controller('ActivityCtrl', ['api', '$scope', function (api, $scope) {
  // GET to '/'
  api.places().getList()
  .then(function (places) {
    $scope.places = places;

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

  });

  // GET to '/place/:id'
  // 'id' will be read from path where the request is being made
  api.place().get()
  .then(function (place) {
    $scope.addPost = function (user, thumb, fullimage, description) {
      /* 'place' refers to the place where the get is being made
        will be used to make a PUT to that path
      */
      let currentPlace = place.posts;

      let newPost = {
        user: false,
        thumb: false,
        fullimage: false,
        description: description
      };

      currentPlace.push(newPost);

      // PUT to '/place/:id'
      place.put()
    };

    $scope.addLike = function (postID) {
      let 
        postsList = place.posts,
        postIndex = postList.indexOf(postsList.postID);

      if (postIndex !== -1) {
        postList[postIndex].likes.number++;
      }
      // should work
      postsList.put();
    };

    $scope.addComment = function (postID, comment) {
      let 
        postsList = place.posts,
        postIndex = postList.indexOf(postsList.postID);

      if (postIndex !== -1) {
        postList[postIndex].comments.push(comment);
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