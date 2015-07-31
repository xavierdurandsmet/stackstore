app.config(function($stateProvider) {
	$stateProvider.state('products', {
		url: '/products',
		controller: 'ProductsController',
		templateUrl: 'js/products/products.html'
	});

});

app.controller('ProductsController', function($scope, $state, ProductsFactory, InstructorFactory, $http) {
	$scope.cats = ["Python", "Java", "JavaScript", "Ruby", "Objective-C"];
	$scope.changed = function(category) {
		$scope.category = category;
	}
	ProductsFactory.getProducts().then(function(products) {
		$scope.products = products;
	})

	InstructorFactory.getInstructors().then(function(instr) {
		$scope.instructors = instr;
	})

	$scope.choose = function(ins) {
		$scope.insIds = ins;
	}

	$scope.getUser = function(id) {
		$http.get('api/users/' + id).then(function(user) {
			$scope.name = user.firstName + user.lastName;
		})
		return $scope.name;
	}

	$scope.viewProduct = function(id) {
		console.log(id);
		$state.go('oneProduct', {
			id: id
		});
	}

	$scope.insIds = "ALL";
	$scope.category = "ALL";
});

//state and controller for oneProduct page
app.config(function($stateProvider) {
	$stateProvider.state('oneProduct', {
		url: '/products/:id',
		controller: 'OneProductController',
		templateUrl: 'js/products/oneProduct.html'
	});
});

app.controller('OneProductController', function($scope, ProductsFactory, $stateParams) {
	ProductsFactory.getProduct($stateParams.id).then(function(product) {
		$scope.product = product;
		$scope.time = {
			hours: Math.floor(product.timeAvailable / 60),
			minutes: product.timeAvailable % 60
		}
	})

	$scope.addToCart = function() {
		//add the product to the cart
	}
})