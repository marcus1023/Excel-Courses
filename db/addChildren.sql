update users
set children = children || $1
where id = $2
