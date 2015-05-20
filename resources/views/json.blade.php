<?php

header('Content-Type: application/json');

echo json_encode($json,384); //384 = JSON_UNESCAPED_UNICODE(256) + JSON_PRETTY_PRINT (128)

?>