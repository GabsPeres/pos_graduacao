export default async function upsertProduct(client, data) {
    const { companyName, cnpj, stateRegistration, address, products, additionalInformation } = data;

    // Inserir ou atualizar supermercado
    const supermarketQuery = `
        INSERT INTO supermarkets (company_name, cnpj, state_registration, address_street, address_number, address_neighborhood, address_zip_code, address_city, address_state, address_lat, address_lng)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (cnpj) DO UPDATE
        SET company_name = EXCLUDED.company_name,
            state_registration = EXCLUDED.state_registration,
            address_street = EXCLUDED.address_street,
            address_number = EXCLUDED.address_number,
            address_neighborhood = EXCLUDED.address_neighborhood,
            address_zip_code = EXCLUDED.address_zip_code,
            address_city = EXCLUDED.address_city,
            address_state = EXCLUDED.address_state,
            address_lat = EXCLUDED.address_lat,
            address_lng = EXCLUDED.address_lng
        RETURNING id;
    `;

    const supermarketValues = [
        companyName,
        cnpj,
        stateRegistration,
        address.street,
        address.number,
        address.neighborhood,
        address.zipCode,
        address.city,
        address.state,
        address.lat,
        address.lng
    ];

    const res = await client.query(supermarketQuery, supermarketValues);
    const supermarketId = res.rows[0].id;

    for (const product of products) {
        // Inserir ou atualizar produto
        const productQuery = `
            INSERT INTO products (code, name, unit, supermarket_id)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (code, supermarket_id) DO UPDATE
            SET name = EXCLUDED.name,
                unit = EXCLUDED.unit,
                last_updated = now()
            RETURNING id;
        `;

        const productValues = [
            product.code,
            product.product,
            product.unit,
            supermarketId
        ];

        const productRes = await client.query(productQuery, productValues);
        const productId = productRes.rows[0].id;

        // Inserir preço do produto na tabela product_prices
        const priceQuery = `
            INSERT INTO product_prices (product_id, price, date, code)
            VALUES ($1, $2, now(), $3);
        `;

        const priceValues = [
            productId,
            product.price,
            product.code
        ];

        await client.query(priceQuery, priceValues);
    }

    // Inserir informações adicionais
    const additionalInfoQuery = `
        INSERT INTO additional_information (supermarket_id, total_items, total_value, value_paid, payment_method, access_key, other_information, date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;

    const additionalInfoValues = [
        supermarketId,
        additionalInformation.totalItems,
        additionalInformation.totalValue,
        additionalInformation.valuePaid,
        additionalInformation.paymentMethod,
        additionalInformation.accessKey,
        additionalInformation.otherInformation,
        additionalInformation.date
    ];

    await client.query(additionalInfoQuery, additionalInfoValues);
}