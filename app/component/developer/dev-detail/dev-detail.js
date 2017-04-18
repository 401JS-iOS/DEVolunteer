require('./_dev-detail.scss');

module.exports = {
  template: require('./dev-detail.html'),
  controller: ['$log', '$q', 'devService','userService', 'Cloudinary', DevDetailController],
  controllerAs: 'devDetailCtrl',

  bindings: {
    dev: '<',
  },
};

function DevDetailController($log, $q, devService, userService, Cloudinary){

  $log.debug('running galleryUpCtrl');
  this.token = userService.token;
  console.log('token', this.token);



  this.addDevRating = function(rating){
    console.log('in the add dev ratings');
    console.log('rating', rating);
    devService.rateDev(this.dev, rating)
    //updateDev goes to a PUT route. for existing dev profiles.
    // .then( () => {
    //   console.log('in the rate a dev stuff');
    //
    // });
    // ratings.push(rating)
    // console.log('ratings', ratings);
  }









//end of controller
}
