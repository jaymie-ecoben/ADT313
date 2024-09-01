<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hands-on Activity</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background-color: #fff;
        }
        th, td {
            padding: 12px;
            border: 1px solid #ddd;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        tr:hover {
            background-color: #f1f1f1;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            background-color: #fff;
            margin: 5px 0;
            padding: 10px;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <h1>Hands-on Activity</h1>

    <?php
        $table = array(
            "Header" => array(
                "ID",
                "First Name",
                "Middle Name",
                "Last Name",
                "Section",
                "Course",
                "Year Level"
            ),
            "Body" => array(
                array(
                    "ID" => 1,
                    "First Name" => "Jaymie",
                    "Middle Name" => "B.",
                    "Last Name" => "Ecoben",
                    "Section" => "B",
                    "Course" => "Information Technology",
                    "Year Level" => "3"
                ),
                array(
                    "ID" => 2,
                    "First Name" => "First_Name",
                    "Middle Name" => "Middle_Name",
                    "Last Name" => "Last_Name",
                    "Section" => "Section_Info",
                    "Course" => "Course_Info",
                    "Year Level" => "Year_Level"
                ),
                array(
                    "ID" => 3,
                    "First Name" => "First_Name",
                    "Middle Name" => "Middle_Name",
                    "Last Name" => "Last_Name",
                    "Section" => "Section_Info",
                    "Course" => "Course_Info",
                    "Year Level" => "Year_Level"
                ),
                array(
                    "ID" => 4,
                    "First Name" => "First_Name",
                    "Middle Name" => "Middle_Name",
                    "Last Name" => "Last_Name",
                    "Section" => "Section_Info",
                    "Course" => "Course_Info",
                    "Year Level" => "Year_Level"
                ),
                array(
                    "ID" => 5,
                    "First Name" => "First_Name",
                    "Middle Name" => "Middle_Name",
                    "Last Name" => "Last_Name",
                    "Section" => "Section_Info",
                    "Course" => "Course_Info",
                    "Year Level" => "Year_Level"
                ),
                array(
                    "ID" => 6,
                    "First Name" => "First_Name",
                    "Middle Name" => "Middle_Name",
                    "Last Name" => "Last_Name",
                    "Section" => "Section_Info",
                    "Course" => "Course_Info",
                    "Year Level" => "Year_Level"
                ),
                array(
                    "ID" => 7,
                    "First Name" => "First_Name",
                    "Middle Name" => "Middle_Name",
                    "Last Name" => "Last_Name",
                    "Section" => "Section_Info",
                    "Course" => "Course_Info",
                    "Year Level" => "Year_Level"
                ),
                array(
                    "ID" => 8,
                    "First Name" => "First_Name",
                    "Middle Name" => "Middle_Name",
                    "Last Name" => "Last_Name",
                    "Section" => "Section_Info",
                    "Course" => "Course_Info",
                    "Year Level" => "Year_Level"
                ),
                array(
                    "ID" => 9,
                    "First Name" => "First_Name",
                    "Middle Name" => "Middle_Name",
                    "Last Name" => "Last_Name",
                    "Section" => "Section_Info",
                    "Course" => "Course_Info",
                    "Year Level" => "Year_Level"
                ),
                array(
                    "ID" => 10,
                    "First Name" => "First_Name",
                    "Middle Name" => "Middle_Name",
                    "Last Name" => "Last_Name",
                    "Section" => "Section_Info",
                    "Course" => "Course_Info",
                    "Year Level" => "Year_Level"
                ),
            )
        );
        function findStudentById($table, $id) {
            foreach ($table["Body"] as $student) {
                if ($student["ID"] == $id) {
                    return $student;
                }
            }
            return null; 
        }

        // Sample
        $studentIdToFind = 1;
        $student = findStudentById($table, $studentIdToFind);
    ?>

    <table>
        <thead>
            <tr>
                <?php foreach ($table["Header"] as $header): ?>
                    <th><?php echo $header; ?></th>
                <?php endforeach; ?>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($table["Body"] as $row): ?>
                <tr>
                    <?php foreach ($table["Header"] as $header): ?>
                        <td><?php echo $row[$header]; ?></td>
                    <?php endforeach; ?>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <?php if ($student): ?>
        <h2>Student Found:</h2>
        <ul>
            <?php foreach ($student as $key => $value): ?>
                <li><?php echo "$key: $value"; ?></li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <h2>Student not found.</h2>
    <?php endif; ?>

</body>
</html>
