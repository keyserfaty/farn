'use strict';

angular.module('modal.controller', [])

.controller('ModalMarkerCtrl', ['api', '$scope', '$ionicModal',
  function (api, $scope, $ionicModal) {

    $ionicModal.fromTemplateUrl('../../../templates/modalmarker.html', {
        scope: $scope,
        animation: 'slide-in-up'
      })
      .then(function (modal) {
        $scope.modal = modal;
      });

    $scope.openModal = function (placeID) {
      api.place(placeID)
        .get()
        .then(function (place) {
          // TODO: should bring placeID from map html
          $scope.name = place.properties.title;
          $scope.description = place.properties.description;
          $scope.images = place.images[0];
          $scope.button = 'Add new post on this place';
          // brings modal
          $scope.modal.show();
        });
    };

    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
      // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      // Execute action
    });
}])

.controller('ModalPostCtrl', ['$scope', '$ionicModal',
  function ($scope, $ionicModal) {

    // $ionicModal.fromTemplateUrl('../../../templates/modalpost.html', {
    //   scope: $scope,
    //   animation: 'slide-in-up'
    // }).then(function (modal) {
    //   $scope.modal = modal;
    // });

    // $scope.addPost = function (description, tag) {
    //   api.place(placeID).get()
    //   .then(function (place) {
    //     let currentPlace = place.posts;

    //     let newPost = {
    //       description: description,
    //       tag: tag,
    //       user: false,
    //       thumb: false,
    //       fullimage: false,
    //       likes: 0,
    //       comments: [],
    //       featured: false
    //     };

    //     currentPlace.push(newPost);

    //     // PUT to '/place/:id'
    //     place.put()

    //   })
    // };

    // $scope.openPostModal = function() {
    //   $scope.title = 'Add new post to this place';
    //   $scope.button = 'Save post';
    //   $scope.action = 'Content';
    //   $scope.showList = function () { return true; }
    //   $scope.items = ['Alerta', 'Actividad', 'Comentario', 'Cosa'];

    //   $scope.modal.show();
    // };

    $scope.closeModal = function () {
      $scope._modal.hide();
    };

    // //Cleanup the modal when we're done with it!
    // $scope.$on('$destroy', function() {
    //   $scope.modal.remove();
    // });

    // // Execute action on hide modal
    // $scope.$on('modal.hidden', function() {
    //   // Execute action
    // });

    // // Execute action on remove modal
    // $scope.$on('modal.removed', function() {
    //   // Execute action
    // });
}])

.controller('ModalCommentCtrl', ['$scope', '$ionicModal',
  function ($scope, $ionicModal) {

    $ionicModal.fromTemplateUrl('../../../templates/modalpost.html', {
        scope: $scope,
        animation: 'slide-in-up'
      })
      .then(function (modal) {
        $scope.modal = modal;
      });

    $scope.addComment = function (comment, postID) {
      // TODO: postID should come from view
      let
        postsList = place.posts,
        postIndex = postList.indexOf(postsList.postID);

      if (postIndex !== -1) {
        postList[postIndex].comments.push(comment);
      }
      // should work
      postsList.put();
    };

    $scope.openModal = function () {
      $scope.title = 'Add new comment';
      $scope.button = 'Save comment';
      $scope.action = 'Comment';
      $scope.showList = function () {
        return false;
      }
      $scope.modal.show();
    };

    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
      // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      // Execute action
    });
}]);
