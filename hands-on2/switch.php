<h1> Switch </h1>
<?php
    $role = "Student";
    switch ($role){
        
        case 'student'
            echo "You are a student, you are not allowed to access...";
            break;

        case 'Instructor'
            echo "You are an instructor, you have limited access to...";
            break;

        case 'Admin'
            echo "You are an admin, you have full access to...";
            break;     
    }
?>