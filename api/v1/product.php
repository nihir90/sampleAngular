<?php 

$app->get('/dashboard', function() { 
    global $db;
    $rows = $db->select("products","id,sku,name,description,price,mrp,stock,image,packing,status",array());
    echoResponse(200, $rows);
});

$app->post('/dashboard', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('name');
    global $db;
         
    $rows = $db->insert("products", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Product added successfully.";
    echoResponse(200, $rows);
});

$app->put('/dashboard/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
   // unset($data['uid']);
    $rows = $db->update("products", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Product information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/dashboard/:id', function($id) { 
    global $db;
    $rows = $db->delete("products", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Product removed successfully.";
    echoResponse(200, $rows);
});


?>
