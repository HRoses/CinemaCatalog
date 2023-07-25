class ApiFeatures {

    constructor(query, requestQuery) {
        this.query = query;
        this.requestQuery = requestQuery;
    }

    // important to return `this` object, so can you chain the objects with the methods, example chain filer with sort methods. 
    filter() {
        // ex: req.query = { duration: { '$gte': '170' } }
        let queryStr = JSON.stringify(this.requestQuery);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,
            (match) => {
                return `$${match}`
            }); // replace all occurances of gte... global
        const queryFixed = JSON.parse(queryStr);
        this.query = this.query.find(queryFixed);

        return this;
    }

    sort() {
        // mongoose sort can only be used on query object
        if (this.requestQuery.sort) {
            // if req query [object] has a `sort` property(key)
            this.query = this.query.sort(this.requestQuery.sort);
        } else {
            //default sort
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields() {
        if (this.requestQuery.fields) {
            const fields = this.requestQuery.fields.split(',').join(' ');
            this.query = this.query.select(fields);
            // `select` from mongoose query
        } else {
            this.query.select('-__v');
            // do not include this __v (used by mongodb internally)
        }

        return this;
    }

    paginate() {
        const page = this.requestQuery.page * 1 || 1; // user specifies page
        const limit = this.requestQuery.limit * 1 || 10; // user specifies limit
        // Page1: 1-10, Page2: 11-20, Page3: 21-30
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        // `skip` from mongoose query
        /* RESOLVE LATER */
        // if (this.requestQuery.page) {
        //     const moviesCount = await Movie.countDocuments();
        //     if (skip >= moviesCount) {
        //         throw new Error('This page is not found!');
        //     }
        // }

        return this;
    }


}


module.exports = ApiFeatures; 