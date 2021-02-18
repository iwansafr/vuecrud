<?php
$cn = new mysqli('localhost', 'root', '', 'vuecrud');

if ($cn->connect_error) {
  die('connection failed! ' . $cn->connect_error);
}
