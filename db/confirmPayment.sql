UPDATE users
SET confirmed = $2
WHERE id=$1;
