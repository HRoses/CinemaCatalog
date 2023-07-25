class ApiFeatures {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // important to return `this` object, so can you chain the objects with the methods, example chain filer with sort methods. 
    filter(){
        // ex: req.query = { duration: { '$gte': '170' } }
        let queryStr = JSON.stringify(this.queryString);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,
            (match) => {
                return `$${match}`
            }); // replace all occurances of gte... global
        const queryFixed = JSON.parse(queryStr);
        this.query = this.query.find(queryFixed); 
        
        return this; 
    }

    sort(){

    }
}


module.exports = ApiFeatures; 