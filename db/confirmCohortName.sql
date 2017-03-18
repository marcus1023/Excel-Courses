update events
set studentnames = studentnames || $1
where id = $2
