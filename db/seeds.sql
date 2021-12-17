INSERT INTO department (department_name)
VALUES ("Customer Service Dept."),
       ("SEO Dept."),
       ("Sales Dept."),
       ("Development Dept");

INSERT INTO roles (role_title salary department_id)
VALUES ("Customer Service Dept.", "1200", department_id),
       ("SEO Dept.", "43000", department_id),
       ("Sales Dept.", "22321", department_id),
       ("Development Dept","990000", department_id);

INSERT INTO employee (first_name last_name role_id manager_id)
VALUES ("Elliot", "Smith", role_id, "111"),
       ("Amira", "Afzal", role_id, "2222"),
       ("Christoper", "Lee", role_id, "44444"),
       ("Verónica", "Rodriguez", role_id, "6666"),
       ("Igor", "Ivanov", role_id, "77777");
       
