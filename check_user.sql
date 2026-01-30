SELECT 
    u.id,
    u.email,
    u.full_name,
    u.status,
    (SELECT COUNT(*) FROM transactions WHERE user_id = u.id AND deleted_at IS NULL) as tx_count,
    (SELECT COUNT(*) FROM categories WHERE user_id = u.id AND deleted_at IS NULL) as cat_count,
    (SELECT COUNT(*) FROM products WHERE user_id = u.id AND deleted_at IS NULL) as prod_count,
    (SELECT COUNT(*) FROM channels WHERE user_id = u.id AND deleted_at IS NULL) as chan_count
FROM users u
WHERE u.id = 'e0bce7e4-a9a2-4c0e-9841-e11cea1cff57';
