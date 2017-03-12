update events
set students = students || $1
where id = $2
