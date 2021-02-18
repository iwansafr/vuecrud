<?php
include_once 'connection.php';

$result = ['error' => false];
$method = '';

if (!empty($_GET['method'])) {
  $method = $_GET['method'];
  if ($method == 'read') {
    $sql = $cn->query('SELECT * FROM users');
    $users = [];
    while ($row = $sql->fetch_assoc()) {
      $users[] = $row;
    }
    $result['users'] = $users;
  } else if ($method == 'create') {
    $name = @$_POST['name'];
    $email = @$_POST['email'];
    $phone = @$_POST['phone'];

    $sql = $cn->query("INSERT INTO users(name,email,phone) VALUES('$name','$email','$phone')");
    if ($sql) {
      $result['message'] = 'User Added Successfully';
    } else {
      $result['error'] = true;
      $result['message'] = 'Failed to Add User';
    }
  } else if ($method == 'update') {
    $id = $_POST['id'];
    $name = @$_POST['name'];
    $email = @$_POST['email'];
    $phone = @$_POST['phone'];

    $sql = $cn->query("UPDATE users set name = '$name',email = '$email', phone = '$phone' WHERE id = '$id'");
    if ($sql) {
      $result['message'] = 'User Updated Successfully';
    } else {
      $result['error'] = true;
      $result['message'] = 'Failed to Update User';
    }
  } else if ($method == 'delete') {
    $id = $_POST['id'];
    $sql = $cn->query("DELETE FROM users  WHERE id = '$id'");
    if ($sql) {
      $result['message'] = 'User Deleted Successfully';
    } else {
      $result['error'] = true;
      $result['message'] = 'Failed to Delete User';
    }
  }
}

$cn->close();
echo json_encode($result);
