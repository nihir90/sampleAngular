<!DOCTYPE html>
<html ng-app="myApp">
<body ng-cloak="">
  <style type="text/css">
    ul>li, a{cursor: pointer;}
    </style>
  
  <title>Product Manager Web Application</title>
  <meta name="Description" content="Product Manager Web Application created with AngularJS and PHP">
  <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />
 <link rel="stylesheet" href="css/bootstrap.min1.css" type="text/css" />
  <link rel="stylesheet" href="css/custom1.css" type="text/css" />
  <link rel="stylesheet" href="css/font-awesome.min.css" type="text/css" />
  <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
  <div class="blog-masthead">
      <div class="container">
        <nav class="blog-nav">
          <a class="blog-nav-item active" href="#">Inventory</a>
          <a class="blog-nav-item pull-right" href="http://www.angularcode.com/product-inventory-management-using-angularjs-mysql-and-php-restful-api">Tutorial</a>
          <a class="blog-nav-item pull-right" href="http://www.angularcode.com/download-link/?url=https://app.box.com/s/pqr0wo3osvoahyh7qtsa">Download</a>
        </nav>
      </div>
    </div>

<div class="container">
    <div class="page-content">
      <div ng-view="" id="ng-view"></div>
    </div>
</div>

<!-- Libraries -->
<script src="js/angular.min.js"></script>
<script src="js/ui-bootstrap-tpls-0.11.2.min.js"></script>
<script src="js/angular-route.min.js"></script>
<script src="js/angular-animate.min.js"></script>
  <script src="js/toaster.js"></script>
<!-- AngularJS custom codes -->
<script src="app/app.js"></script>
<script src="app/data.js"></script>
<script src="app/directives.js"></script>
  <script src="app/authCtrl.js"></script>
<script src="app/productsCtrl.js"></script>

<!-- Some Bootstrap Helper Libraries -->

<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/underscore.min.js"></script>
<script src="js/jspdf.debug.js"></script>

<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="js/ie10-viewport-bug-workaround.js"></script>
</body>
</html>
