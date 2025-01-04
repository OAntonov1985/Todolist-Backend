function createAPIFeatures(query, queryString) {
    const features = {};

    // Filtering
    features.filter = function () {
        const queryObj = { ...queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        query = query.find(JSON.parse(queryStr));
        return features;
    };

    // Sorting
    features.sort = function () {
        if (queryString.sort) {
            const sortBy = queryString.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }
        return features;
    };

    // Limiting fields
    features.limitFields = function () {
        if (queryString.fields) {
            const fields = queryString.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }
        return features;
    };

    // Pagination
    features.paginate = function () {
        const page = queryString.page * 1 || 1;
        const limit = queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);
        return features;
    };

    // Return the modified query
    features.getQuery = function () {
        return query;
    };

    return features;
}

module.exports = createAPIFeatures;