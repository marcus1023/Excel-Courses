update events
set studentsconfirmed = studentsconfirmed || $2
where id = $1
