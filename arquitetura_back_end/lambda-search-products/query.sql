SELECT 
    p.name AS product_name, 
    s.name AS supermarket_name, 
    s.address, 
    ph.price, 
    ph.date,
    (6371 * acos( 
        cos(radians(-19.8094012)) * cos(radians(s.latitude)) * 
        cos(radians(s.longitude) - radians(-43.93990549999999)) + 
        sin(radians(-19.8094012)) * sin(radians(s.latitude))
    )) AS distance
FROM 
    supermarkets AS s
INNER JOIN 
    price_history AS ph ON s.cnpj = ph.supermarket_id
INNER JOIN 
    products AS p ON ph.product_id = p.code
WHERE 
    p.name ILIKE '%abacate%'
  AND
    (6371 * acos( 
        cos(radians(-19.8094012)) * cos(radians(s.latitude)) * 
        cos(radians(s.longitude) - radians(-43.93990549999999)) + 
        sin(radians(-19.8094012)) * sin(radians(s.latitude))
    )) < 1000;