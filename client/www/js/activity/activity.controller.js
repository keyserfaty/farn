'use strict';

angular.module('activity.controller', [])
.controller('ActivityCtrl', ['api', '$scope', function (api, $scope) {
  // GET to '/'
  api.places().getList()
  .then(function (places) {
    $scope.places = places;
    
    let posts = [];
    angular.forEach(places, function (place) {
      posts.concat(place.posts);  
    })
    // won't work. foreach is async
    $scope.posts = posts;

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

  $scope.addPost = function (placeID, user, thumb, fullimage, description) {
    api.place(placeID).get()
    .then(function (place) {
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
      
    })
  };

  $scope.showPlace = function (placeID) {
    api.place(placeID).get()
    .then(function (place) {
      $scope.name = place.properties.title;
      $scope.description = place.properties.description;
      $scope.images = place.images[0];
    });
  };


  api.place().get()
  .then(function (place) {

    /* 'place' refers to the place where the get is being made
      will be used to make a PUT to that path
    */

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