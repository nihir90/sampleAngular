app.controller('productsCtrl', function ($scope, $modal, $filter, Data,$location,$timeout) {
    $scope.product = {};
    Data.get('dashboard').then(function(data){
      $scope.curPage = 0;
      $scope.pageSize = 6;
        $scope.products = data.data;

  $scope.numberOfPages = function() {
				return Math.ceil($scope.products.length / $scope.pageSize);
			};

    });
    $scope.changeProductStatus = function(product){
        product.status = (product.status=="Active" ? "Inactive" : "Active");
        Data.put("dashboard/"+product.id,{status:product.status});
    };
    $scope.deleteProduct = function(product){
        if(confirm("Are you sure to remove the product")){
            Data.delete("dashboard/"+product.id).then(function(result){
                $scope.products = _.without($scope.products, _.findWhere($scope.products, {id:product.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/productEdit.html',
          controller: 'productEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.products.push(selectedObject);
                $scope.products = $filter('orderBy')($scope.products, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.description = selectedObject.description;
                p.price = selectedObject.price;
                p.stock = selectedObject.stock;
                p.packing = selectedObject.packing;
            }
        });
    };
    
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };

$scope.exportPdf = function(flag) {
 if(flag == true){
 
     //  $('#customers').tableExport({type:'pdf',escape:'false',htmlContent:'true',ignoreColumn: []});
var pdf = new jsPDF('p', 'pt', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    source = $('#customers')[0];
       // $('#customers td:nth-child(8)').remove();

    // we support special element handlers. Register them with jQuery-style 
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors 
    // (class, of compound) at this time.
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    //console.log(source);
  

    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
    source, // HTML string or DOM elem ref.
    margins.left, // x coord
   
    margins.top, { // y coord
        'width': margins.width, // max width of content on PDF
        'elementHandlers': specialElementHandlers
    },

    function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF 
        //          this allow the insertion of new lines after html
        pdf.save('Test.pdf');
    }, margins);

}
    };

$scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    };
$scope.pageSizeValue = function(pageNo) {
        $scope.pageSize = pageNo;
    };

    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };

    $scope.sort_by = function(predicate,count) {
       // $scope.sortorder=predicate;
if(count % 2)
{
    predicate = '-'+predicate;
 
}

        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };  

 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Name",predicate:"name",sortable:true},
                    {text:"Price",predicate:"price",sortable:true},
                    {text:"Stock",predicate:"stock",sortable:true},
                    {text:"Packing",predicate:"packing",reverse:true,sortable:true,dataType:"number"},
                    {text:"Description",predicate:"description",sortable:true},
                    {text:"Status",predicate:"status",sortable:true},
                    {text:"Action",predicate:"",sortable:false}
                ];

});
angular.module('myApp').filter('pagination', function()
{
  
 return function(input, start)
 {

  start = +start;
 
if (typeof input !== 'undefined') {
  return input.slice(start);
}else{
 return [];
}
//  
 };

});

app.filter('startFrom', function() {

    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});


app.controller('productEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.product = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Edit Product' : 'Add Product';
        $scope.buttonText = (item.id > 0) ? 'Update Product' : 'Add New Product';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.product);
        }
        $scope.saveProduct = function (product) {
            product.uid = $scope.uid;
            if(product.id > 0){
                Data.put('dashboard/'+product.id, product).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(product);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                product.status = 'Active';
                Data.post('dashboard', product).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(product);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});
