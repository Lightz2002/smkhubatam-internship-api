SELECT * FROM role_menus_menu rmm;

SELECT u.Id FROM user u
LEFT JOIN role_menus_menu rmm ON u.Role = rmm.roleId
WHERE rmm.roleId = u.Role;

SELECT * FROM menu m;

SELECT * FROM expense_categories ec;

SELECT * FROM user u;

SELECT * FROM role r;

SELECT * FROM user u;
SELECT * FROM school_class s;
SELECT * FROM location l;

SELECT * FROM location
WHERE Id = '4fcc7408-a623-4584-9572-02a5bde7eb55';

SELECT * FROM journal j;
SELECT * FROM internship i;
SELECT * FROM  status s;

# 563dfcdf-6108-4121-8673-1c69b45b65c1 admin
# d63b40e5-3288-4bc9-9ff7-e0eeb6ac5736 student

-- Menu
-- 0d72e4ef-1342-4af0-bda9-ddf470b518b4 Student
-- 43c7045e-a8a1-4732-9e06-8f07f5a74c5a Absence
-- 5262938a-c309-42d0-8278-90290aed0807 Location
-- 8ff8e3d8-e990-4429-9574-e4a32db9fa4d Journal
-- 930dc3c4-efbd-4499-8b30-2fb03826ba19 Evaluation
-- f83580d5-df55-45d1-9f29-0d65e627b357 Internship

SELECT * FROM users u
WHERE u.username LIKE '%kenidy%';

SELECT * FROM expense_allocations ec
WHERE ec.user_id = '98d6f467-c91a-4fa1-9a0a-9ea2ff3b11b5';

SELECT * FROM major m;
SELECT * FROM school_class sc;
SELECT * FROM internship i;

SELECT * FROM  journal j;

SELECT * FROM  status s;

