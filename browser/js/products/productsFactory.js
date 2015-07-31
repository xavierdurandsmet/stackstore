app.factory('ProductsFactory', function($http) {
  return {
    getProducts: function() {
      return $http.get('/api/products/')
        .then(function(res) {
          return res.data;
        })
    },
    getProduct: function(id) {
      return $http.get('/api/products/' + id)
        .then(function(res) {
          return res.data;
        })
    },
    getInstructorProducts: function(instructorId) {
      return $http.get('/api/products/instructorProducts/' + instructorId)
        .then(function(res) {
          return res.data;
        })
    }
  }
})